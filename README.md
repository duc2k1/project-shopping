# Do-an-nodejs

## Install/Update dependencies/packages

```
npm install
```

## Run/start app/server

```
npm run start
```

## Features

- Auth: Register (password used bcrypt), login, forget password
- User: Update password, get all users, active user by name, get/delete/update by id
- Role: Create new role, get all roles
- Product: Get all products, create new product, get/delete product by id
- Category: Get all categories, create new category, delete category by id
- Cart: Get cart/get total count/update cart/delete cart by user id, add item cart
- Order: Get all orders, add order, get/delete/update order by user id
- Billing: Get all billings, add billing, get/delete/update billing by user id
- Promotion: Get all promotions, add promotion, get/delete/update promotion by product id
- Feedback: Get/delte/update feedback by user id and product id
- Pay: Pay by price (pay used PayPal)

## Database

- MongoDb

## Libaries

- bcryptjs
- dotenv
- express
- jsonwebtoken
- mongodb
- mongoose
- nodemailer
- nodemon
- paypal-rest-sdk
