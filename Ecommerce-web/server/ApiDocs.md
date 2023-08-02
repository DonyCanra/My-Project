# API Documentation

## Endpoints :

List of available endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/googleLogin`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`
- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /histories`
- `POST /histories`
- `POST /public/register`
- `POST /public/login`
- `POST /public/googleLogin`
- `GET /public/products`
- `GET /public/products/:id`
- `GET /public/transaction`
- `POST /public/transaction/:id`
- `DELETE /public/transaction/:id`
- `GET /public/histories`
- `POST /public/histories`

&nbsp;

## 1. POST /auth/register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string",
  "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must been unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Format email is wrong"
}
```

&nbsp;

## 2. POST /auth/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjg2NjI4MTUyfQ.vlOgw-nH4gRVZR4yPPGsBCTZbuwF1RdWKARpXySwSo8"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email or Password is not valid"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email or Password is not valid"
}
```

&nbsp;

## 3. POST /auth/googleLogin

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "integer",
  "phoneNumber": "string",
  "address": "string",
  "status": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 4. GET /categories

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Laptops",
        "createdAt": "2023-06-12T09:15:18.180Z",
        "updatedAt": "2023-06-12T09:15:18.180Z"
    },
    {
        "id": 2,
        "name": "Headsets",
        "createdAt": "2023-06-12T09:15:18.180Z",
        "updatedAt": "2023-06-12T09:15:18.180Z"
    },
    {
        "id": 3,
        "name": "Action figure",
        "createdAt": "2023-06-12T09:15:18.180Z",
        "updatedAt": "2023-06-12T09:15:18.180Z"
    }
  ...,
]
```

&nbsp;

## 5. POST /categories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

&nbsp;

## 6. PUT /categories/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 7. DELETE /categories/:id

Description:

- Delete categories by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Category 2 has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Category is not exist"
}
```

&nbsp;

## 8. GET /products

Description:

- Get all products from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "name": "HP 222A0UT#ABA",
        "description": "bebas",
        "price": 11300000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/41oZZcY0C1L._AC_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
    {
        "id": 3,
        "name": "ACER AN515-57-79TD",
        "description": "bebas",
        "price": 12000000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
    {
        "id": 4,
        "name": "Lenovo 5 pro",
        "description": "bebas",
        "price": 12000000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/61TjVU2HtZL._AC_SX679_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
  ...,
]
```

&nbsp;

## 9. POST /products

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Description is required"
}
OR
{
  "message": "Price is required"
}
OR
{
  "message": "Minimum price is 100.000"
}
```

&nbsp;

## 10. GET /products/:id

Description:

- Get product from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "ACER AN515-57-79TD",
    "description": "bebas",
    "price": 12000000,
    "stock": 10,
    "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2023-06-12T09:16:17.109Z",
    "updatedAt": "2023-06-12T09:16:17.109Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 11. PUT /products/:id

Description:

- Update product from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "ACER AN515-57-79TD",
    "description": "bebas",
    "price": 12000000,
    "stock": 10,
    "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2023-06-12T09:16:17.109Z",
    "updatedAt": "2023-06-12T09:16:17.109Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 12. PATCH /products/:id

Description:

- Modify product from database by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product 1 has been update"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 13. DELETE /products/:id

Description:

- Delete product by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Product 2 has been deleted"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized to this action"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 14. GET /histories

Description:

- Get all histories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "updateBy": "date"
  }
]
```

&nbsp;

## 15. POST /histories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "updateBy": "date"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "updateBy": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Description is required"
}
```

&nbsp;

## 16. POST /public/register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must been unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Format email is wrong"
}

```

&nbsp;

## 17. POST /public/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNjg2NjI4MTUyfQ.vlOgw-nH4gRVZR4yPPGsBCTZbuwF1RdWKARpXySwSo8"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email or Password is not valid"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Email or Password is not valid"
}
```

&nbsp;

## 18. POST /public/googleLogin

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Email must been unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Format email is wrong"
}
```

&nbsp;

## 19. GET /public/products

Description:

- Get all products from database

Request:

_Response (200 - OK)_

```json
[
    {
        "id": 2,
        "name": "HP 222A0UT#ABA",
        "description": "bebas",
        "price": 11300000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/41oZZcY0C1L._AC_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
    {
        "id": 3,
        "name": "ACER AN515-57-79TD",
        "description": "bebas",
        "price": 12000000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
    {
        "id": 4,
        "name": "Lenovo 5 pro",
        "description": "bebas",
        "price": 12000000,
        "stock": 10,
        "imgUrl": "https://m.media-amazon.com/images/I/61TjVU2HtZL._AC_SX679_.jpg",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2023-06-12T09:16:17.109Z",
        "updatedAt": "2023-06-12T09:16:17.109Z"
    },
  ...,
]
```

&nbsp;

## 20. GET /public/products/:id

Description:

- Get product from database by id

Request:

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 3,
    "name": "ACER AN515-57-79TD",
    "description": "bebas",
    "price": 12000000,
    "stock": 10,
    "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2023-06-12T09:16:17.109Z",
    "updatedAt": "2023-06-12T09:16:17.109Z"
  }
]
```

_Response (404 - Not Found)_

```json
{
  "message": "Product is not exist"
}
```

&nbsp;

## 21. GET /public/transactions

Description:

- Get all categories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
[
    {
        "id": 1,
        "CustomerId": 1,
        "ProductId": 1,
        "createdAt": "2023-07-01T16:02:20.919Z",
        "updatedAt": "2023-07-01T16:02:20.919Z",
        "Product": {
            "id": 1,
            "name": "MSI Stealth 15M 15.6 FHD 144Hz Ultra Thin and Light Gaming Laptop",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt sit enim earum odit, magnam rem molestiae ipsam dolores neque error! Expedita eligendi asperiores, laborum tempora recusandae nemo possimus ad! Nihil distinctio, eum sit impedit illum repellendus nam? Doloremque omnis ipsam beatae ullam a eius provident explicabo ex, commodi ad.",
            "price": 9000000,
            "stock": 10,
            "imgUrl": "https://m.media-amazon.com/images/I/51UQajnLVUL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
            "status": "Active",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-07-01T15:46:53.354Z",
            "updatedAt": "2023-07-01T15:46:53.354Z"
        },
        "Customer": {
            "id": 1,
            "email": "test@gmail.com",
            "password": "$2a$10$HY/2437Q.Jp2Gtqpie.nUOaBoG2YRN70mSm2.dl/uf0ZYH6C4N5Iq",
            "role": "customer",
            "createdAt": "2023-07-01T16:01:49.570Z",
            "updatedAt": "2023-07-01T16:01:49.570Z"
        }
    },
    {
        "id": 12,
        "CustomerId": 1,
        "ProductId": 3,
        "createdAt": "2023-07-02T10:21:06.548Z",
        "updatedAt": "2023-07-02T10:21:06.548Z",
        "Product": {
            "id": 3,
            "name": "ACER AN515-57-79TD",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt sit enim earum odit, magnam rem molestiae ipsam dolores neque error! Expedita eligendi asperiores, laborum tempora recusandae nemo possimus ad! Nihil distinctio, eum sit impedit illum repellendus nam? Doloremque omnis ipsam beatae ullam a eius provident explicabo ex, commodi ad.",
            "price": 12000000,
            "stock": 10,
            "imgUrl": "https://m.media-amazon.com/images/I/81lDOtJRTkL._AC_SX679_.jpg",
            "status": "Active",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-07-01T15:46:53.354Z",
            "updatedAt": "2023-07-01T15:46:53.354Z"
        },
        "Customer": {
            "id": 1,
            "email": "test@gmail.com",
            "password": "$2a$10$HY/2437Q.Jp2Gtqpie.nUOaBoG2YRN70mSm2.dl/uf0ZYH6C4N5Iq",
            "role": "customer",
            "createdAt": "2023-07-01T16:01:49.570Z",
            "updatedAt": "2023-07-01T16:01:49.570Z"
        }
    },
    {
        "id": 3,
        "CustomerId": 1,
        "ProductId": 4,
        "createdAt": "2023-07-01T16:02:34.671Z",
        "updatedAt": "2023-07-01T16:02:34.671Z",
        "Product": {
            "id": 4,
            "name": "Lenovo 5 pro",
            "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius deserunt sit enim earum odit, magnam rem molestiae ipsam dolores neque error! Expedita eligendi asperiores, laborum tempora recusandae nemo possimus ad! Nihil distinctio, eum sit impedit illum repellendus nam? Doloremque omnis ipsam beatae ullam a eius provident explicabo ex, commodi ad.",
            "price": 12000000,
            "stock": 10,
            "imgUrl": "https://m.media-amazon.com/images/I/61TjVU2HtZL._AC_SX679_.jpg",
            "status": "Active",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2023-07-01T15:46:53.354Z",
            "updatedAt": "2023-07-01T15:46:53.354Z"
        },
        "Customer": {
            "id": 1,
            "email": "test@gmail.com",
            "password": "$2a$10$HY/2437Q.Jp2Gtqpie.nUOaBoG2YRN70mSm2.dl/uf0ZYH6C4N5Iq",
            "role": "customer",
            "createdAt": "2023-07-01T16:01:49.570Z",
            "updatedAt": "2023-07-01T16:01:49.570Z"
        }
    },
]
  ...,
]
```

&nbsp;

## 22. POST /public/transactions/:productId

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- users:

```json
{
  "CustomerId": "integer"
}
```

- body:

```json
{
  "ProductId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "CustomerId": "integer",
  "ProductId": "integer"
}
```

&nbsp;

## 23. DELETE /public/transaction/:id

Description:

- Delete transaction by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Bookmark 2 has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Bookmark is not exist"
}
```

## 24. GET /public/histories

Description:

- Get all histories from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "updateBy": "date"
  }
]
```

&nbsp;

## 25. POST /public/histories

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "updateBy": "date"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "updateBy": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "Description is required"
}
```

&nbsp;

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
