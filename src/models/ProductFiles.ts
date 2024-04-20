import { User } from '../payload-types';
import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { Access, CollectionConfig } from 'payload/types';

const addUser: BeforeChangeHook = ({ req, data }) => {
  const user = req.user as User | null;
  return {
    ...data,
    user: user?.id,
  };
};

const yourOwnOrPurchasedProducts: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (!user) return false;
  if (user.role === 'admin') return true;

  // Get all products that the user owns
  const { docs: ownProducts } = await req.payload.find({
    collection: 'products',
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFilesIds = ownProducts
    .map((product) => product.product_files)
    .flat();

  // Get all products that the user has ordered
  const { docs: orderedProducts } = await req.payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const orderedProductFilesIds = orderedProducts
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === 'string') {
          return req.payload.logger.error(
            'Search depth not sufficient to find purchased file IDs'
          );
        }

        return typeof product.product_files === 'string'
          ? product.product_files
          : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFilesIds, ...orderedProductFilesIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: 'product_files',
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
  },
  hooks: {
    beforeChange: [addUser],
  },
  access: {
    read: yourOwnOrPurchasedProducts,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  upload: {
    staticURL: '/product_files',
    staticDir: 'product_files',
    mimeTypes: [
      'application/postscript',
      'images/*',
      'text/*',
      'video/*',
      'audio/*',
      'application/*',
    ],
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
  ],
};
