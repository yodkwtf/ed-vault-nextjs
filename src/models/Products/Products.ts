import {
  AfterChangeHook,
  BeforeChangeHook,
} from 'payload/dist/collections/config/types';
import { PRODUCT_CATEGORIES } from '../../config';
import { Access, CollectionConfig } from 'payload/types';
import { Product, User } from '../../payload-types';
import { stripe } from '../../lib/stripe';

const addUser: BeforeChangeHook<Product> = async ({ data, req }) => {
  const user = req.user;

  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  const fullUser = await req.payload.findByID({
    collection: 'users',
    id: req.user.id,
  });

  if (fullUser && typeof fullUser === 'object') {
    const { products } = fullUser;

    const allIds = [
      ...(products?.map((product) =>
        typeof product === 'object' ? product.id : product
      ) || []),
    ];

    const createdProductIds = allIds.filter(
      (id, index) => allIds.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductIds, doc.id];

    await req.payload.update({
      collection: 'users',
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === 'admin') return true;

    const userProductIds = (user.products || []).reduce<Array<string>>(
      (acc, product) => {
        if (!product) return acc;

        if (typeof product === 'string') {
          acc.push(product);
        } else {
          acc.push(product.id);
        }

        return acc;
      },
      []
    );

    return {
      id: {
        in: userProductIds,
      },
    };
  };

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === 'create') {
          const data = args.data as Product;
          const createdProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: 'inr',
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updated: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          };

          return updated;
        } else if (args.operation === 'update') {
          const data = args.data as Product;

          const updatedProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          });

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          };

          return updated;
        }
      },
    ],
    afterChange: [syncUser],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price (in Rs.)',
      min: 0,
      max: 1_00_000,
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },

    {
      name: 'product_files',
      label: 'Product File(s)',
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: false,
      required: true,
    },
    {
      name: 'approvedForSale',
      label: 'Product Status',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      type: 'select',
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending Verification',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },

    {
      name: 'images',
      type: 'array',
      label: 'Product Images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
