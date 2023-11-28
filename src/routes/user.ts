import express from "express";
import { loginHandler } from "../controllers/authController";

import validateResource from "../middlewares/validateResource";
import { LoginSchema } from "../validation/auth.schema";
import { SignUpSchema } from "../validation/user.schema";
import {
  getLoggedInUserHandler,
  signupHandler,
} from "../controllers/userController";
import ensureAuthenticated from "../middlewares/auth";

const router = express.Router();

 /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
router.post("/signup", validateResource(SignUpSchema), signupHandler);

// Get logged in user
router.get("/me", ensureAuthenticated, getLoggedInUserHandler);

export default router;
