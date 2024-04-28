# EdVault - A Next.js Online Marketplace for Educators

EdVault is a Next.js online marketplace for educators to sell their educational resources. It is a full-stack web application that allows educators to create an account, upload their resources, and sell them to other educators. The application is built using Next.js, a React framework, shadcn-ui and Tailwind CSS for styling. The backend is built using Node.js and Express.js, powered by TRPC tech stack and the database is MongoDB.

## Todos

- [ ] Resolve all `TODO` comments in the code
- [ ] Resolve all `Change` comments in the code
- [ ] Add branding to the application

- [ ] Order total is cartTotal + transactionFee. However, if we remove items from cart to make it empty, the transactionFee should be removed as well. This is not happening right now. Fix this. (Track using `cartTotal` and `transactionFee` variables.)
- [ ] Same item can be added multiple times in the cart. This should not be allowed. If the same item is added again, show a message that item is already in the cart. Since these are digital assets, we don't need to add quantity. Just show a message that item is already in the cart.

- [ ] Create a dummy user for people to test the app without creating an account (maybe show it in the nav but definitely in the signin and signup pages)
- [ ] Finish the `/products` page
- [ ] Create the footer section
- [ ] Create nav for small screens
- [ ] Check nav going berzerk on 404 page

- [ ] Resend only sends verification email to an email you created your account with on resend. Figure out a way to send it to any email.

- [ ] Create helper function to get orderTotal, final total, category and image url

- [ ] Check why stripe webhook isn't working and payment is not getting completed
- [ ] Deploy on vercel
- [ ] Update the app url in metadata
- [ ] Update the app url in stripe webhook

- [ ] Add domain for images in nextConfig.js

  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      domains: ['localhost', 'res.cloudinary.com'],
    },
  };

  module.exports = nextConfig;
  ```
