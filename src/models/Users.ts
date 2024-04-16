import { CollectionConfig } from 'payload/types';

// Change: Named `models` instead of `collections`
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `
          <div>
            <p>Click the link below to verify your email address:</p>
            <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>
          </div>
        `;
      },
    },
  },
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
