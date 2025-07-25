# Skin Cart Aura Shop - Backend Setup

## Project Structure

```
backend/
├── config/
│   └── cloudinary.js          # Cloudinary configuration
├── controllers/
│   ├── productController.js   # Product-related logic
│   ├── userController.js      # User authentication & profile
│   ├── cartController.js      # Shopping cart operations
│   ├── orderController.js     # Order management
│   └── adminController.js     # Admin panel operations
├── middleware/
│   ├── auth.js               # Authentication middleware
│   └── errorHandler.js       # Error handling
├── models/
│   ├── Product.js            # Product schema
│   ├── User.js               # User schema
│   ├── Cart.js               # Cart schema
│   └── Order.js              # Order schema
├── routes/
│   ├── productRoutes.js      # Product API routes
│   ├── userRoutes.js         # User API routes
│   ├── cartRoutes.js         # Cart API routes
│   ├── orderRoutes.js        # Order API routes
│   ├── adminRoutes.js        # Admin API routes
│   ├── uploadRoutes.js       # File upload routes
│   └── paymentRoutes.js      # Payment gateway routes
├── package.json
├── server.js                 # Main server file
└── .env.example             # Environment variables template
```

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env

# Update the .env file with your credentials:
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skin-cart-db
JWT_SECRET=your-super-secret-jwt-key-here
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
PHONEPE_MERCHANT_ID=your-phonepe-merchant-id
PHONEPE_SALT_KEY=your-phonepe-salt-key
```

### 3. Database Setup

Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Products

- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/related/:id` - Get related products
- `GET /api/products/search` - Search products
- `GET /api/products/featured` - Get featured products

### Admin Panel

- `POST /api/admin/login` - Admin login
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status

### Users

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Cart

- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart

### Orders

- `POST /api/orders/create` - Create new order
- `GET /api/orders/:userId` - Get user orders
- `GET /api/orders/track/:orderId` - Track order

### Payment

- `POST /api/payment/create` - Create PhonePe payment
- `POST /api/payment/verify` - Verify payment status

## Features Implemented

### ✅ Product Management

- CRUD operations for products
- Image upload with Cloudinary
- Category and skin type filtering
- Search functionality
- Bundle pricing calculation
- Related products algorithm

### ✅ User Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access (user/admin)
- Email verification (ready)
- Password reset (ready)

### ✅ Shopping Cart

- Add/remove/update cart items
- Persistent cart storage
- Promo code support (ready)
- Real-time price calculation

### ✅ Order Management

- Order creation and tracking
- Status updates
- Payment integration (PhonePe ready)
- Order history

### ✅ Admin Panel

- Product management interface
- Order management
- User management
- Dashboard analytics (ready)

### ✅ Security Features

- CORS configuration
- Rate limiting
- Input validation
- Error handling
- JWT token authentication

## Database Schema

### Product Schema (Updated)

```javascript
{
  name: String,
  price: Number,
  originalPrice: Number,
  category: Enum,
  skinType: Enum,
  images: [{ url, public_id, alt }],
  description: String,
  features: [String],
  bundlePricing: Object,
  tags: [String],
  badge: String,
  isActive: Boolean,
  createdBy: ObjectId
}
```

**Removed Fields:**

- ~~rating~~
- ~~reviews~~
- ~~inStock~~

## Next Steps

1. **Start the backend server**
2. **Set up the admin panel frontend** (separate Next.js app)
3. **Integrate PhonePe payment gateway**
4. **Add data seeding scripts**
5. **Set up email notifications**
6. **Deploy to production**

## Admin Panel

The admin panel is a separate Next.js application located in the `/admin` folder. It provides:

- Product CRUD operations
- Order management
- User management
- Analytics dashboard
- Image upload interface

## Payment Integration

PhonePe payment gateway integration is prepared with:

- Payment creation endpoints
- Payment verification
- Webhook handling
- Order status updates

## Development Notes

- All passwords are hashed using bcrypt
- Images are stored in Cloudinary
- JWT tokens expire in 30 days
- Rate limiting: 100 requests per 15 minutes
- File upload limit: 5MB per image
- Search supports fuzzy matching
- Products support multiple images
- Bundle pricing is auto-calculated

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment variables for all secrets
3. Set up HTTPS
4. Configure proper CORS origins
5. Set up monitoring and logging
6. Use PM2 or similar for process management
