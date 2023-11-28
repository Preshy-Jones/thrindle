import mongoose from "mongoose";
import { UserDocument } from "./User";
import { TransactionStatus } from "../types/transaction";

export interface TransactionInput {
  user: UserDocument["_id"];
  amount: number;
  description: string;
}

export interface TransactionDocument
  extends TransactionInput,
    mongoose.Document {
  status: TransactionStatus;
  thirdPartyTransactionId: number;
  transactionReference: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    thirdPartyTransactionId: {
      type: Number,
    },
    transactionReference: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: TransactionStatus,
      required: true,
      default: TransactionStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model<TransactionDocument>(
  "Transaction",
  transactionSchema
);

export default TransactionModel;
