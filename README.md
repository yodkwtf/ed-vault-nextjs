# EdVault - A Next.js Online Marketplace for Educators

EdVault is a full-stack online marketplace built with Next.js, designed for educators to share, sell, and purchase educational resources. Whether you're a teacher, instructor, or education professional, EdVault provides a platform to monetize your notes, solutions, books, and more.

The app is deployed on Railway at [ed-vault.up.railway.app](https://ed-vault.up.railway.app/).

![EdVault](/public/thumbnail.jpg)

## Features

- **User Authentication:** Secure sign-up and login functionality for educators.
- **Resource Management:** Upload, manage, and categorize educational resources easily.
- **Marketplace:** Browse and purchase educational resources from other educators.
- **Payment Integration:** Seamless transactions for buying and selling resources.
- **Responsive Design:** Fully responsive interface using Tailwind CSS for optimal performance on all devices.
- **Admin Dashboard:** Manage users, resources, and orders with an intuitive admin panel.

## Tech Stack

### Frontend

- **[Next.js](https://nextjs.org/):** React framework for server-side rendering and static site generation.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework for responsive design.
- **[shadcn-ui](https://shadcn.dev/):** A customizable component library for React.

### Backend

- **[Node.js](https://nodejs.org/):** JavaScript runtime for server-side scripting.
- **[Express.js](https://expressjs.com/):** Minimalist web framework for Node.js.
- **[tRPC](https://trpc.io/):** End-to-end typesafe APIs for building the backend.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database for storing user data, resources, and transactions.
- **[Payload CMS](https://payloadcms.com/):** Headless CMS for managing content and the admin dashboard.

## Getting Started

1. Clone the Repository:

   ```bash
   git clone https://github.com/yodkwtf/ed-vault-nextjs.git
   ```

2. Move into the Directory:

   ```bash
   cd ed-vault-nextjs
   ```

3. Install Dependencies:

   ```bash
   npm install
   ```

4. Set Environment Variables:

   Create a `.env.local` file in the root directory and add the following environment variables:

   ```bash
   PAYLOAD_SECRET=<your_secret>
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   MONGODB_URL=<mongomongodb+srv:your_mongodb_url>

   RESEND_API_KEY=<your_sendgrid_api_key>

   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
   ```

5. Run the Development Server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

EdVault is optimized for deployment on [Railway](https://railway.app/). Connect your repository and follow the setup instructions provided by Railway. Ensure your environment variables are set in the Railway dashboard.

## Contact

Feel free to reach out to me at the following:

- Email: [48durgesh.chaudhary@gmail.com](mailto:48durgesh.chaudhary@gmail.com)
- LinkedIn: [Durgesh Chaudhary](https://www.linkedin.com/in/durgesh-chaudhary/)
- Twitter: [@yodkwtf](https://twitter.com/yodkwtf)
