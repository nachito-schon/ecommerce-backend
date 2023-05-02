# Ecommerce Backend

A REST API, built on **Express/Node**, for managing an e-commerce product database. It allows CRUD operations on a MongoDB database.

## Product

Each item has the following structure:
```json
{
  "_id" : "Unique id of the product"
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product"
}
```

## Endpoints

### GET /products

Returns the full list of products as an array of product objects.

### GET /products/:id

Returns the product with the specified ':id'.

### POST /products/create

Creates a new product in the database. Then redirects to the created product endpoint.

#### Request body:
```json
{
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product (float, greater than 0)"
}
```

### POST /products/:id/update

Updates the product with the specified ':id' in the database. Then redirects to the updated product endpoint.

#### Request body:
```json
{
  "name": "Product name",
  "description": "Product description",
  "image_url": "Public URL of the product's image",
  "price": "Price of the product (float, greater than 0)"
}
```

### POST /products/:id/delete

Deletes the product with the specified ':id' in the database.

#### Request body:
```json
{
  "id": "Product id"
}
```

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

You can make an HTTP request to the api from the console by using **curl**. Enter one of following commands, depending on the request method, replacing the "[body]" and "[URL]":

### GET
```bash
$> curl -X GET -H "Content-Type: application/json" [URL]
```
### POST
```bash
$> curl -X POST -H "Content-Type: application/json" -d [body] [URL]
```

