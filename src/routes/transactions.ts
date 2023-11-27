import express from "express";
import validateResource from "../middlewares/validateResource";
import {
  getTransactionHistory,
  initiateTransaction,
} from "../controllers/transactionsController";
import { InitiateTransactionSchema } from "../validation/transaction.schema";
import ensureAuthenticated from "../middlewares/auth";

const router = express.Router();

router.post(
  "/inititiate",
  [validateResource(InitiateTransactionSchema), ensureAuthenticated],
  initiateTransaction
);

router.get("/", getTransactionHistory);
export default router;
