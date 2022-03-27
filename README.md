# Storefront Backend Project
Storefront Backend Project

# REQUIREMENTS

## Content 
    .Decription
        -file structure 
        -set up 
        -run project 
        -structure of request 

    .Technologies
    .Tools 
    .Resources 
    .Auther

 ## Description 

    Create a RESTful API to be accessible to the frontend developer. writing test, secured user information with encryption, and provide tokens for integration into the frontend.

 ## How To Run The Project
        
        port: 3000

        user routes:
          app.get('/users', verifyAuthToken, index);
          app.get('/users/:id', verifyAuthToken, show);
          app.post('/users/add', create);
          app.post('/users/login',userLogin);
          app.put('/users/:id',  verifyAuthToken, update);
          app.delete('/users/:id', verifyAuthToken, destroy);

        product routes:
            app.get('/products', index);
            app.post('/products/add', verifyAuthToken, create);
            app.get('/products/:id', show);
            app.put('/products/:id', verifyAuthToken, update);
            app.delete('/products/:id', verifyAuthToken, destroy);

        order routes: 
             app.get('/orders', verifyAuthToken, index);
             app.get('/users/:user_id/orders/:order_id', verifyAuthToken,  show);
             app.post('/users/:user_id/orders', verifyAuthToken,  create);
             app.get('/users/:user_id/orders', verifyAuthToken,  userOrders);
             app.put('/users/:user_id/orders/:order_id', verifyAuthToken,  update);
             app.delete('/users/:user_id/orders/:order_id', verifyAuthToken,  destroy);
             app.post('/orders/:order_id/products', verifyAuthToken,  addProduct);
             app.get('/orders/:order_id/products', verifyAuthToken,  showOrderProducts); 

        dashboard routes:
             app.get('/top_products', topProducts);     

    -set up
        install an ide for running node (recommended vs code) and browser (chrome)
        .Description 

    Create a RESTful API to be accessible to the frontend developer. writing test, secured user information with encryption, and provide tokens for integration into the frontend.

    -How to run the project
        
        port: 3000

    - ENV File Details:
        POSTGRES_HOST=127.0.0.1
        POSTGRES_DB=store
        POSTGRES_TEST_DB= store_test
        POSTGRES_USER=soha
        POSTGRES_PASSWORD=soha
        ENV=dev
        BCRYPT_PASSWORD=dasiy-and-duke
        SALT_ROUNDS=10
        TOKEN_SECRET=alohomora123!


## Setup
        install an ide for running node (recommended vs code) and browser (chrome)

        install node v16.13.2 and npm 8.1.2 and postgres for database

        install as Development Dependencies [npm i --save-dev package@version ex: npm i --save-dev typescript@4.5.4]
               "@types/body-parser": "^1.19.2",
                "@types/cors": "^2.8.12",
                "@types/express": "^4.17.9",
                "@types/jasmine": "^3.6.3",
                "@types/jsonwebtoken": "^8.5.8",
                "@types/pg": "^7.14.7",
                "@types/supertest": "^2.0.11",
                "@typescript-eslint/eslint-plugin": "^5.14.0",
                "@typescript-eslint/parser": "^5.14.0",
                "eslint": "^8.10.0",
                "eslint-config-prettier": "^8.5.0",
                "eslint-plugin-prettier": "^4.0.0",
                "jasmine": "^4.0.2",
                "jasmine-spec-reporter": "^7.0.0",
                "jasmine-ts": "^0.3.0",
                "prettier": "^2.5.1",
                "ts-node": "^9.1.1",
                "tsc-watch": "^4.2.9"

        install as Dependencies [npm i package@version ex: npm i - express@4.17.2]
                "@types/bcrypt": "^5.0.0",
                "bcrypt": "^5.0.1",
                "body-parser": "^1.19.0",
                "cors": "^2.8.5",
                "db-migrate": "^0.11.13",
                "db-migrate-pg": "^1.2.2",
                "dotenv": "^16.0.0",
                "express": "^4.17.1",
                "express-validator": "^6.14.0",
                "jsonwebtoken": "^8.5.1",
                "pg": "^8.5.1",
                "supertest": "^6.2.2",
                "typescript": "^4.1.3"
                    config scripts for (prettier, eslint, jasmine)

   ## Run The Project

        create database = "store" and user = "soha" & password ="soha" with postgres as in .env file 
        

   ### Database: 
                port: 5432
                create user: CREATE USER soha WITH PASSWORD 'soha';

                create database: CREATE DATABASE  store;
                                 CREATE DATABASE  store_test;
                Grant for dev database
              \c store
             GRANT ALL PRIVILEGES ON DATABASE store TO soha;
             Grant for test database
             \c store_test
             GRANT ALL PRIVILEGES ON DATABASE store_test TO soha;

                
                

        if you don't have db-migrate install it [npm i db-migrate , npm i db-migrate db-migrate-pg]!!! 

        after doing the above open the terminal and run:
            1-npm run prettier --> improve and fix the error of the style of code
            2-npm run test --> build and test the code and drop the tables if needed
            3- npm run watch --> run the project

  ### DATABASE SECHEMA AND RELATIONSHIPS:

      db-migrate create users-table --sql-file

      DROP TABLE users CASCADE; 

      CREATE TABLE users ( "id" SERIAL PRIMARY KEY,
      "first_name" VARCHAR(150),
      "last_name" VARCHAR(150),
      "password" text
       );


       db-migrate create products-table --sql-file  

       DROP TABLE products CASCADE;


       CREATE TABLE products ( id SERIAL PRIMARY KEY,
       name VARCHAR(150),
       price numeric(18,3),
       category VARCHAR(100)
       );

        db-migrate create orders-table --sql-file  


        DROP TABLE orders CASCADE;


        CREATE TABLE orders (id SERIAL PRIMARY KEY,
        status VARCHAR(150),
        user_id integer references users(id) ON DELETE CASCADE
        );

        To create the many to many relationship agragate table:

        db-migrate create order_products-table --sql-file

        Drop TABLE order_products;

        CREATE TABLE order_products (id serial primary key, 
        quantity integer,
        order_id integer REFERENCES orders(id) ON DELETE CASCADE,
        product_id integer REFERENCES products(id) ON DELETE CASCADE
        ) ; 


    
### Technologies 
    nodejs 
    typescript 
    express 
    jasmine
    postgres

### Tools 
    vs code 
    google chrome

### Resources 
    udacity 
    community slack and toturs 
    npmjs.com
    google
## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
# storefront
