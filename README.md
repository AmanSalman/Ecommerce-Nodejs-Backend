# eCommerce Backend
## Description
This is the backend for the eCommerce web application built with Node.js and Express. It handles user authentication, product management, order processing, and more.
## Features
- User authentication (registration, login, JWT token generation)
- CRUD operations for products
- File uploads (images) with Cloudinary
- Order processing and management
- Integration with Stripe for payments
- Input validation using Joi
## Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing product and user data
- **Mongoose**: ODM library for MongoDB
- **JWT**: For user authentication
- **Cloudinary**: For image uploads
- **Stripe**: For payment processing

## Dependencies
Here are the main dependencies used in this project:

```json
{
  "bcrypt": "^5.1.1",           // Password hashing
  "cloudinary": "^2.2.0",       // Image hosting and manipulation
  "cors": "^2.8.5",             // Cross-origin resource sharing
  "dotenv": "^16.4.5",          // Environment variable management
  "express": "^4.19.2",         // Web framework
  "joi": "^17.13.3",            // Schema validation
  "jsonwebtoken": "^9.0.2",     // JWT creation and verification
  "mongoose": "^8.3.2",         // MongoDB ODM
  "multer": "^1.4.5-lts.1",     // Middleware for file uploads
  "nanoid": "^5.0.7",           // Unique ID generation
  "nodemailer": "^6.9.13",      // Email sending
  "pdfkit": "^0.15.0",          // PDF generation
  "slugify": "^1.6.6",          // Create slugs from strings
  "stripe": "^16.1.0",          // Payment processing
  "xlsx": "^0.18.5"             // Excel file handling
}
```
## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AmanSalman/EcommerceBackend.git
   cd EcommerceBackend
2. Install dependencies:
   ```bash
    npm install
3. Set up environment variables:
Create a .env file in the root directory and add your configuration:
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url
STRIPE_SECRET_KEY=your_stripe_secret_key
```
4. Start the server:
    ```bash
    npm run dev
    ```
5. The server should be running on http://localhost:5000 (or your specified port).

## API Documentation
For detailed API documentation, please refer to the Postman collection: [API Documentation](https://documenter.getpostman.com/view/30950345/2sA3JM8haX).
