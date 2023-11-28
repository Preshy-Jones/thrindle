import express from "express";
import validateResource from "../middlewares/validateResource";
import {
  getTransactionHistory,
  initiateTransaction,
} from "../controllers/transactionsController";
import { InitiateTransactionSchema, getTransactionHistorySchema } from "../validation/transaction.schema";
import ensureAuthenticated from "../middlewares/auth";

const router = express.Router();



/**
 * @openapi
 * '/api/transactions/initiate':
 *  post:
 *     tags:
 *     - Transactions
 *     summary: Initiate a transaction
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/InitiateTransactionInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/InitiateTransactionResponse'

 */
router.post(
  "/initiate",
  [validateResource(InitiateTransactionSchema), ensureAuthenticated],
  initiateTransaction
);



/**
   * @openapi
   * '/api/transactions':
   *  get:
   *    tags:
   *    - Transactions
   *    summary: Get Transaction history
   *    parameters:
   *      - name: status
   *        in: query
   *        required: false
   *    responses:
   *      200:
   *        description: Gets user's transaction log
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/GetTransactionHistoryResponse'
   *      403:
   *        description: Forbidden
   * 
   */
router.get(
  "/",
  [validateResource(getTransactionHistorySchema), ensureAuthenticated],
  getTransactionHistory
);
export default router;
