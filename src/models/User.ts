import { CollectionConfig } from 'payload/types';

// Change: Named `models` instead of `collections`
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'role',
      required: true,
      // admin: {
      //   // Change: Added admin based visibility instead of just false
      //   condition: ({ req }) => req.user.role === 'admin',
      // },
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
    },
  ],
};
