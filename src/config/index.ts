const joi = require("joi");
require("dotenv").config();

const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().default("development"),
    MONGO_URI: joi.string().required().description("MongoDB URI is required"),
    JWT_SECRET: joi
      .string()
      .required()
      .description("JWT secret key is required"),
    JWT_EXPIRES_IN: joi
      .string()
      .required()
      .description("JWT expiration time is required"),
    PAYSTACK_BASE_URL: joi
      .string()
      .required()
      .description("Paystack base url is required"),
    PAYSTACK_PUBLIC_KEY: joi
      .string()
      .required()
      .description("Paystack public key is required"),
    PAYSTACK_SECRET_KEY: joi
      .string()
      .required()
      .description("Paystack secret key is required"),
  })
  .unknown()
  .required();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: {
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
    isTest: process.env.NODE_ENV === "test",
  },
  mongo: {
    host: envVars.MONGO_URI,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
  },
  paystack: {
    baseUrl: envVars.PAYSTACK_BASE_URL,
    publicKey: envVars.PAYSTACK_PUBLIC_KEY,
    secretKey: envVars.PAYSTACK_SECRET_KEY,
  },
};

export default config;
