run yarn install 
# Thrindle assessment App Setup Guide

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

## Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```


Replace <repository-url> with the URL of the public repository you want to clone.

## Install Dependencies

Use Yarn to install the project dependencies:

```bash
yarn install
```

This command will read the package.json file and install all the necessary packages.

## Configure Environment Variables

Copy the .env.example file to a new file named .env:

```bash
cp .env.example .env
```

## Run the Application

Start the Express.js application with the following command:

```bash
yarn run dev
```

Visit http://localhost:4000 in your web browser to see the running application.


# Logging In Instructions Using Swagger UI

1. **Access Swagger UI:**
   - Open your web browser and navigate to the Swagger UI documentation at `/docs`. For example, if your application is running locally, the URL would be `http://localhost:3000/docs`.

2. **Explore Endpoints:**
   - In the Swagger UI interface, you'll see a list of available endpoints. Locate the `POST /api/user/signup` endpoint for user registration and the `POST /api/auth/login` endpoint for user login.

3. **Sign Up (if not already registered):**
   - If you don't have an account, start by signing up:
     - Click on the `POST /api/user/signup` endpoint.
     - Click on the "Try it out" button.
     - Provide the required information such as `username`, `email`, and `password`.
     - Click on the "Execute" button to create a new user.

4. **Log In:**
   - After signing up, navigate to the `POST /api/auth/login` endpoint:
     - Click on the `POST /api/auth/login` endpoint.
     - Click on the "Try it out" button.
     - Enter the `username` and `password` that you used during signup.
     - Click on the "Execute" button.

5. **Retrieve Access Token:**
   - If the login is successful, you'll see a `200 OK` response in the Swagger UI.
   - Look for the `200` response under the "Responses" section.
   - In the response body, you should see an `accessToken`. This token is your access token.

6. **Copy Access Token:**
   - Copy the value of the `accessToken`. This token will be used to authenticate and authorize your subsequent requests to protected endpoints.

Now you have successfully logged in using Swagger UI, obtained the access token, and are ready to make authenticated requests to your API. Ensure to include the access token in the `Authorization` header for protected endpoints.


# Transaction Flow Instructions

## Step 1: Initialize Transaction

### Endpoint:
- **POST /api/transactions/initiate**

### Instructions:
1. **Access Swagger UI:**
   - Open your web browser and navigate to the Swagger UI documentation at `/docs`.

2. **Find Initialize Transaction Endpoint:**
   - In Swagger UI, locate the `POST /api/transactions/initiate` endpoint.

3. **Try It Out:**
   - Click on the `POST /api/transactions/initiate` endpoint.
   - Click on the "Try it out" button.

4. **Provide Required Data:**
   - Input the necessary information required to initialize the transaction, as specified in the Swagger documentation.
   - Click on the "Execute" button.

5. **Capture Response:**
   - Review the response, which should include a payment gateway URL and other relevant data.
   - Note down the payment gateway URL.

## Step 2: Complete Payment on Payment Gateway

1. **Redirect to Payment Gateway:**
   - Open a new browser window or tab and navigate to the payment gateway URL obtained in Step 1.

2. **Complete Payment:**
   - Follow the payment gateway's instructions to complete the transaction.

## Step 3: Webhook Confirmation (Payment Gateway Callback)

### Endpoint:
- **POST /api/webhooks/confirm**

### Instructions:
1. **Wait for Payment Gateway Callback:**
   - After completing the payment on the payment gateway, wait for the payment gateway to call the webhook.

2. **Webhook Confirmation:**
   - Once the webhook is triggered, it will send a POST request to `/api/webhooks/confirm`.

3. **Update Transaction Status:**
   - The server will update the status of the transaction in the database based on the webhook data.

## Step 4: View User's Transactions

### Endpoint:
- **GET /api/transactions**

### Instructions:
1. **Access Swagger UI:**
   - Open your web browser and navigate to the Swagger UI documentation at `/docs`.

2. **Find List User's Transactions Endpoint:**
   - In Swagger UI, locate the `GET /api/transactions` endpoint.

3. **Try It Out:**
   - Click on the `GET /api/transactions` endpoint.
   - Click on the "Try it out" button.

4. **Retrieve User's Transactions:**
   - Input any required parameters, such as user ID or other filters, as specified in the Swagger documentation.
   - Click on the "Execute" button to retrieve a list of the user's transactions.

Now you have successfully completed the transaction flow, from initializing the transaction to confirming the payment through the webhook, and finally, viewing the user's transactions.

# Transaction Flow Instructions with Authentication

## Step 1: Initialize Transaction

### Endpoint:
- **POST /api/transactions/initiate**

### Instructions:
1. **Access Swagger UI:**
   - Open your web browser and navigate to the Swagger UI documentation at `/docs`.

2. **Authenticate:**
   - Click on the "Authorize" button on the top right.
   - Enter your JWT access token in the "Value" field, prefixed with "Bearer ".
   - Click on the "Authorize" button.

3. **Find Initialize Transaction Endpoint:**
   - In Swagger UI, locate the `POST /api/transactions/initiate` endpoint.

4. **Try It Out:**
   - Click on the `POST /api/transactions/initiate` endpoint.
   - Click on the "Try it out" button.

5. **Provide Required Data:**
   - Input the necessary information required to initialize the transaction, as specified in the Swagger documentation.
   - Click on the "Execute" button.

6. **Capture Response:**
   - Review the response, which should include a payment gateway URL and other relevant data.
   - Note down the payment gateway URL.

## Step 2: Complete Payment on Payment Gateway

1. **Redirect to Payment Gateway:**
   - Open a new browser window or tab and navigate to the payment gateway URL obtained in Step 1.

2. **Complete Payment:**
   - Follow the payment gateway's instructions to complete the transaction.

## Step 3: Webhook Confirmation (Payment Gateway Callback)

### Endpoint:
- **POST /api/webhooks/confirm**

### Instructions:
1. **Wait for Payment Gateway Callback:**
   - After completing the payment on the payment gateway, wait for the payment gateway to call the webhook.

2. **Webhook Confirmation:**
   - Once the webhook is triggered, it will send a POST request to `/api/webhooks/confirm`.

3. **Update Transaction Status:**
   - The server will update the status of the transaction in the database based on the webhook data.

## Step 4: View User's Transactions

### Endpoint:
- **GET /api/transactions**

### Instructions:
1. **Access Swagger UI:**
   - Open your web browser and navigate to the Swagger UI documentation at `/docs`.

2. **Authenticate:**
   - Click on the "Authorize" button on the top right.
   - Enter your JWT access token in the "Value" field, prefixed with "Bearer ".
   - Click on the "Authorize" button.

3. **Find List User's Transactions Endpoint:**
   - In Swagger UI, locate the `GET /api/transactions` endpoint.

4. **Try It Out:**
   - Click on the `GET /api/transactions` endpoint.
   - Click on the "Try it out" button.

5. **Retrieve User's Transactions:**
   - Input any required parameters, such as user ID or other filters, as specified in the Swagger documentation.
   - Click on the "Execute" button to retrieve a list of the user's transactions.

Now you have successfully completed the transaction flow, with authentication, from initializing the transaction to confirming the payment through the webhook, and finally, viewing the user's transactions.
