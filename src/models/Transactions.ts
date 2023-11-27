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
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    thirdPartyTransactionId: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum:TransactionStatus,
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
