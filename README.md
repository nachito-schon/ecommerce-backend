# Ecommerce Backend

A REST API, built on **Express/Node**, for managing an e-commerce product database. It allows CRUD operations on a MongoDB database.

## Product

Each item has the following structure:
```json
{
  "_id" : "Unique id of the product",
  "brand": {
    "name": "Brand name",
    "logo_url": "Public URL of the brand's logo"
  },
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product"
}
```

## Authentication

POST endpoints are protected with [JWT](https://jwt.io/) authentication. The libraries used to achieve this are [jasonwebtoken](https://github.com/auth0/node-jsonwebtoken) and [passport](https://www.passportjs.org/).

That way, a **POST /user/login** enpoint is exposed, to which an allowed user (which is "**admin**") and password ("**admin**" as well) must be passed as json in the body:

```json
{
  "user": "admin",
  "password": "admin"
}
```

The API will return, then, a JWT token, that must be passed in the Authorization header as a bearer token, that means in the form of "Bearer [JWT TOKEN]", to access the POST endpoints later on.

## Endpoints

### GET /products

Returns the full list of products as an array of product objects.

### GET /products/:id

Returns the product with the specified ':id'.

### POST /products/create

Creates a new product in the database. Then redirects to the created product endpoint.

A valid bearer token must be provided as the Authorization header in order to access this endpoint.

#### Request body:
```json
{
  "brand": {
    "name": "Brand name",
    "logo_url": "Public URL of the brand's logo"
  },
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product (double, greater than 0)"
}
```

"logo_url" can be omitted if the brand already exists in the database.

### POST /products/:id/update

Updates the product with the specified ':id' in the database. Then redirects to the updated product endpoint.

A valid bearer token must be provided as the Authorization header in order to access this endpoint.

#### Request body:
```json
{
  "brand": {
    "name": "Brand name",
    "logo_url": "Public URL of the brand's logo"
  },
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product (double, greater than 0)"
}
```

"logo_url" can be omitted if the brand already exists in the database.

### POST /products/:id/delete

Deletes the product with the specified ':id' in the database.

A valid bearer token must be provided as the Authorization header in order to access this endpoint.

#### Request body:
```json
{
  "id": "Product id"
}
```

### GET /brands

Returns the full list of all brands as an array of brand objects.

## Public version

The app is hosted on AWS as a **Lambda function**, and can be accessed with the following URL: https://f24mkjbvyqbpgvxlzus2sjisjy0oozje.lambda-url.sa-east-1.on.aws/

## Run locally

To run on your local environment, clone the repository and run the following commands:

```bash
$> cd ecommerce-backend
$> npm install
$> npm run start
```
The API will be accessible on http://localhost:5000.

You can specify a different port by changing it in the `.env` file.

## Making a request

You can make an HTTP request to the api from the console by using **curl**. Enter one of following commands, depending on the request method, replacing the "[JWT_TOKEN]", "[BODY]" and "[URL]":

### GET
```bash
$> curl -X GET -H "Content-Type: application/json" [URL]
```
### POST
```bash
$> curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer [JWT_TOKEN]" -d [BODY] [URL]
```

