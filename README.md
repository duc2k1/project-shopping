#do-an-nodejs
## Features
- Auth: Register (password used bcrypt), login, forget password
- User: 
 + Update password, get all users, active user by name, get/delete/update by id
- Role: create new role, get all roles
- Product: get all products, create new product, get/delete product by id
- Category: get all categories, create new category, delete category by id
- Cart: get cart/get total count/update cart/delete cart by user id, add item cart
- Order: get all orders, add order, get/delete/update order by user id
- Billing: get all billings, add billing, get/delete/update billing by user id
- Promotion: get all promotions, add promotion, get/delete/update promotion by product id
- Feedback: get/delte/update feedback by user id and product id
- Pay: pay by price (pay used PayPal)
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