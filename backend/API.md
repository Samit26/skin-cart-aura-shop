# Backend API Documentation

This document provides a comprehensive overview of all the API endpoints available in the backend of the application.

## Authentication

### `POST /api/auth/send-otp`

-   **Description:** Sends an OTP to the user's mobile number for authentication.
-   **Request Body:**
    ```json
    {
        "mobile": "9999999999"
    }
    ```
-   **Response:**
    ```json
    {
        "success": true,
        "message": "OTP sent successfully"
    }
    ```

### `POST /api/auth/verify-otp`

-   **Description:** Verifies the OTP sent to the user's mobile number and logs them in.
-   **Request Body:**
    ```json
    {
        "mobile": "9999999999",
        "otp": "123456"
    }
    ```
-   **Response:**
    ```json
    {
        "success": true,
        "token": "JWT_TOKEN",
        "user": {
            "_id": "USER_ID",
            "mobile": "9999999999"
        }
    }
    ```

## Cart

### `GET /api/cart`

-   **Description:** Retrieves the user's shopping cart.
-   **Authentication:** Required (Clerk)
-   **Response:**
    ```json
    {
        "success": true,
        "data": {
            "_id": "CART_ID",
            "user": "USER_ID",
            "items": [],
            "totalAmount": 0,
            "finalAmount": 0
        }
    }
    ```

### `POST /api/cart/add`

-   **Description:** Adds an item to the user's shopping cart.
-   **Authentication:** Required (Clerk)
-   **Request Body:**
    ```json
    {
        "productId": "PRODUCT_ID",
        "selectedBrand": "Apple",
        "selectedModel": "iPhone 13",
        "selectedBundle": "single",
        "quantity": 1
    }
    ```
-   **Response:** The updated cart object.

### `PUT /api/cart/update/:itemId`

-   **Description:** Updates the quantity or other details of an item in the cart.
-   **Authentication:** Required (Clerk)
-   **Request Body:**
    ```json
    {
        "quantity": 2
    }
    ```
-   **Response:** The updated cart object.

### `DELETE /api/cart/remove/:itemId`

-   **Description:** Removes an item from the user's shopping cart.
-   **Authentication:** Required (Clerk)
-   **Response:** The updated cart object.

### `DELETE /api/cart/clear`

-   **Description:** Clears all items from the user's shopping cart.
-   **Authentication:** Required (Clerk)
-   **Response:** A success message.

### `POST /api/cart/promo/apply`

-   **Description:** Applies a promotional code to the user's cart.
-   **Authentication:** Required (Clerk)
-   **Request Body:**
    ```json
    {
        "code": "PROMO_CODE"
    }
    ```
-   **Response:** The updated cart object with the discount applied.

### `DELETE /api/cart/promo/remove`

-   **Description:** Removes a promotional code from the user's cart.
-   **Authentication:** Required (Clerk)
-   **Response:** The updated cart object.

## Products

### `GET /api/products`

-   **Description:** Retrieves a list of all products.
-   **Query Parameters:** `limit`, `page`, `category`, `sortBy`
-   **Response:** A paginated list of products.

### `GET /api/products/featured`

-   **Description:** Retrieves a list of featured products.
-   **Response:** A list of featured products.

### `GET /api/products/categories`

-   **Description:** Retrieves a list of all product categories.
-   **Response:** A list of categories.

### `GET /api/products/skin-types`

-   **Description:** Retrieves a list of all skin types.
-   **Response:** A list of skin types.

### `GET /api/products/search`

-   **Description:** Searches for products based on a query.
-   **Query Parameters:** `q`
-   **Response:** A list of products that match the search query.

### `GET /api/products/category/:category`

-   **Description:** Retrieves a list of products in a specific category.
-   **Response:** A list of products.

### `GET /api/products/related/:id`

-   **Description:** Retrieves a list of products related to a specific product.
-   **Response:** A list of related products.

### `GET /api/products/:id`

-   **Description:** Retrieves the details of a specific product.
-   **Response:** The product object.

## Users

### `POST /api/users/register`

-   **Description:** Registers a new user.
-   **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "PASSWORD"
    }
    ```
-   **Response:** A JWT token and the user object.

### `POST /api/users/login`

-   **Description:** Logs in a user.
-   **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "password": "PASSWORD"
    }
    ```
-   **Response:** A JWT token and the user object.

### `GET /api/users/profile`

-   **Description:** Retrieves the user's profile information.
-   **Authentication:** Required (JWT)
-   **Response:** The user object.

### `PUT /api/users/profile`

-   **Description:** Updates the user's profile information.
-   **Authentication:** Required (JWT)
-   **Request Body:**
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
    ```
-   **Response:** The updated user object.

### `GET /api/users/addresses`

-   **Description:** Retrieves a list of the user's addresses.
-   **Authentication:** Required (JWT)
-   **Response:** A list of address objects.

### `POST /api/users/addresses`

-   **Description:** Adds a new address for the user.
-   **Authentication:** Required (JWT)
-   **Request Body:**
    ```json
    {
        "addressLine1": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "postalCode": "12345",
        "country": "USA"
    }
    ```
-   **Response:** The newly created address object.

### `PUT /api/users/addresses/:id`

-   **Description:** Updates an existing address for the user.
-   **Authentication:** Required (JWT)
-   **Response:** The updated address object.

### `DELETE /api/users/addresses/:id`

-   **Description:** Deletes an address for the user.
-   **Authentication:** Required (JWT)
-   **Response:** A success message.

### `POST /api/users/wishlist/:productId`

-   **Description:** Adds a product to the user's wishlist.
-   **Authentication:** Required (JWT)
-   **Response:** The updated user object.

### `DELETE /api/users/wishlist/:productId`

-   **Description:** Removes a product from the user's wishlist.
-   **Authentication:** Required (JWT)
-   **Response:** The updated user object.

### `GET /api/users/wishlist`

-   **Description:** Retrieves the user's wishlist.
-   **Authentication:** Required (JWT)
-   **Response:** A list of products in the user's wishlist.

## Orders

### `POST /api/orders/create`

-   **Description:** Creates a new order.
-   **Authentication:** Required (JWT)
-   **Request Body:**
    ```json
    {
        "addressId": "ADDRESS_ID",
        "paymentMethod": "COD"
    }
    ```
-   **Response:** The newly created order object.

### `GET /api/orders/my-orders`

-   **Description:** Retrieves a list of the user's orders.
-   **Authentication:** Required (JWT)
-   **Response:** A list of order objects.

### `GET /api/orders/:id`

-   **Description:** Retrieves the details of a specific order.
-   **Authentication:** Required (JWT)
-   **Response:** The order object.

### `GET /api/orders/track/:orderId`

-   **Description:** Tracks the status of a specific order.
-   **Authentication:** Required (JWT)
-   **Response:** The tracking information for the order.

### `PUT /api/orders/:id/cancel`

-   **Description:** Cancels a specific order.
-   **Authentication:** Required (JWT)
-   **Response:** The updated order object.

### `PUT /api/orders/:id/status`

-   **Description:** Updates the status of a specific order (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Request Body:**
    ```json
    {
        "status": "Shipped"
    }
    ```
-   **Response:** The updated order object.

## Payments

### `GET /api/payments/methods`

-   **Description:** Retrieves a list of available payment methods.
-   **Response:** A list of payment methods.

### `POST /api/payments/initiate`

-   **Description:** Initiates a payment for an order.
-   **Authentication:** Required (JWT)
-   **Request Body:**
    ```json
    {
        "orderId": "ORDER_ID"
    }
    ```
-   **Response:** The payment details.

### `GET /api/payments/status/:transactionId`

-   **Description:** Checks the status of a payment.
-   **Authentication:** Required (JWT)
-   **Response:** The payment status.

### `POST /api/payments/callback`

-   **Description:** Handles the payment callback from the payment gateway.
-   **Response:** A success message.

## Devices

### `GET /api/devices/brands`

-   **Description:** Retrieves a list of all available device brands.
-   **Response:** A list of brands.

### `GET /api/devices/models/:brandName`

-   **Description:** Retrieves a list of models for a specific brand.
-   **Response:** A list of models.

## Uploads

### `POST /api/upload/products`

-   **Description:** Uploads product images (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Request:** `multipart/form-data` with `images` field.
-   **Response:** A list of uploaded image objects.

### `POST /api/upload/single`

-   **Description:** Uploads a single image (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Request:** `multipart/form-data` with `image` field.
-   **Response:** The uploaded image object.

## Admin

### `POST /api/admin/login`

-   **Description:** Logs in an admin user.
-   **Request Body:**
    ```json
    {
        "email": "admin@example.com",
        "password": "PASSWORD"
    }
    ```
-   **Response:** A JWT token and the admin user object.

### `GET /api/admin/verify`

-   **Description:** Verifies an admin token.
-   **Authentication:** Required (JWT, Admin)
-   **Response:** The admin user object.

### `GET /api/admin/dashboard/stats`

-   **Description:** Retrieves dashboard statistics (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Response:** Dashboard statistics.

### `GET /api/admin/users`

-   **Description:** Retrieves a list of all users (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Response:** A list of user objects.

### `GET /api/admin/orders`

-   **Description:** Retrieves a list of all orders (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Response:** A list of order objects.

### `GET /api/admin/products`

-   **Description:** Retrieves a list of all products (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Response:** A list of product objects.

### `POST /api/admin/products`

-   **Description:** Creates a new product (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Request:** `multipart/form-data` with product details and images.
-   **Response:** The newly created product object.

### `PUT /api/admin/products/:id`

-   **Description:** Updates an existing product (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Request Body:** Product details to update.
-   **Response:** The updated product object.

### `DELETE /api/admin/products/:id`

-   **Description:** Deletes a product (Admin only).
-   **Authentication:** Required (JWT, Admin)
-   **Response:** A success message.

## User Sync

### `POST /api/user-sync/webhooks/clerk`

-   **Description:** Synchronizes user data from Clerk via webhooks.
-   **Response:** A success message.

### `POST /api/user-sync/sync-clerk`

-   **Description:** Synchronizes the current user's data from Clerk.
-   **Authentication:** Required (Clerk)
-   **Response:** The updated user object.

### `PUT /api/user-sync/profile`

-   **Description:** Updates the user's profile information.
-   **Authentication:** Required (Clerk)
-   **Request Body:** Profile details to update.
-   **Response:** The updated user object.

### `POST /api/user-sync/addresses`

-   **Description:** Adds a new address for the user.
-   **Authentication:** Required (Clerk)
-   **Request Body:** Address details.
-   **Response:** The newly created address object.

### `PUT /api/user-sync/addresses/:addressId`

-   **Description:** Updates an existing address for the user.
-   **Authentication:** Required (Clerk)
-   **Response:** The updated address object.

### `DELETE /api/user-sync/addresses/:addressId`

-   **Description:** Deletes an address for the user.
-   **Authentication:** Required (Clerk)
-   **Response:** A success message.
