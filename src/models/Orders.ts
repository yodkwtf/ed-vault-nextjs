import { Access, CollectionConfig } from 'payload/types';

const yourOwnOrders: Access = async ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === 'admin') return true;

  return {
    user: {
      equals: user.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your Orders',
    description: 'A summary of all your orders on EdVault.',
  },
  access: {
    read: yourOwnOrders,
    create: ({ req }) => req.user.role === 'admin',
    update: ({ req }) => req.user.role === 'admin',
    delete: ({ req }) => req.user.role === 'admin',
  },

  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: ({ req }) => req.user?.role === 'admin',
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      required: true,
      hasMany: true,
    },
  ],
  timestamps: true,
};
