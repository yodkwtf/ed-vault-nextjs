# EdVault - A Next.js Online Marketplace for Educators

EdVault is a Next.js online marketplace for educators to sell their educational resources. It is a full-stack web application that allows educators to create an account, upload their resources, and sell them to other educators. The application is built using Next.js, a React framework, shadcn-ui and Tailwind CSS for styling. The backend is built using Node.js and Express.js, powered by TRPC tech stack and the database is MongoDB.

## Todos

- [ ] Resolve all `TODO` comments in the code
- [ ] Resolve all `Change` comments in the code
- [ ] Add branding to the application

- [ ] Order total is cartTotal + transactionFee. However, if we remove items from cart to make it empty, the transactionFee should be removed as well. This is not happening right now. Fix this. (Track using `cartTotal` and `transactionFee` variables.)
- [ ] Same item can be added multiple times in the cart. This should not be allowed. If the same item is added again, show a message that item is already in the cart. Since these are digital assets, we don't need to add quantity. Just show a message that item is already in the cart.
