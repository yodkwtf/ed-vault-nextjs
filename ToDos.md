## Todos

- [ ] Resolve all `TODO` comments in the code
- [ ] Resolve all `Change` comments in the code
- [ ] Add branding to the application

- [ ] Order total is cartTotal + transactionFee. However, if we remove items from cart to make it empty, the transactionFee should be removed as well. This is not happening right now. Fix this. (Track using `cartTotal` and `transactionFee` variables.)
- [ ] Same item can be added multiple times in the cart. This should not be allowed. If the same item is added again, show a message that item is already in the cart. Since these are digital assets, we don't need to add quantity. Just show a message that item is already in the cart.

- [ ] Create a dummy user for people to test the app without creating an account (maybe show it in the nav but definitely in the signin and signup pages)
- [x] Finish the `/products` page
- [x] Create the footer section
- [x] Create nav for small screens
- [x] Check nav going berzerk on 404 page

- [ ] Resend only sends verification email to an email you created your account with on resend. Figure out a way to send it to any email.

- [ ] Create helper function to get orderTotal, final total, category and image url

- [x] Check why stripe webhook isn't working and payment is not getting completed
- [x] Deploy on vercel
- [x] Update the app url in metadata
- [x] Update the app url in stripe webhook

- [x] Add domain for images in nextConfig.js
