import { NextFunction, Request, Response } from "express";
import {
  GetTransactionHistoryInput,
  InitiateTransactionInput,
} from "../validation/transaction.schema";
import { NotFoundError } from "../errors";
import UserModel from "../models/User";
import paystackService from "../lib/paystack";
import { generateTransactionReference, successResponse } from "../utils";
import TransactionModel from "../models/Transactions";
import mongoose from "mongoose";

export const initiateTransaction = async (
  req: Request<{}, {}, InitiateTransactionInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user;
  // console.log(userId);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const user = await UserModel.findById(userId);
    const { amount, description } = req.body;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const transactionReference = generateTransactionReference(10);
    const transaction = new TransactionModel({
      amount,
      description,
      transactionReference,
      user: userId,
    });

    const response = await paystackService.initiateTransaction({
      amount,
      email: user.email,
      reference: transactionReference,
    });

    transaction.transactionReference = response.reference;
    await transaction.save({
      session,
    });
    await session.commitTransaction();
    session.endSession();
    return res.send(
      successResponse("Transaction initiated successfully", response)
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const verifyTranaction = () => {};

export const getTransactionHistory = async (
  req: Request<GetTransactionHistoryInput["query"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;

    const { status } = req.query;
    console.log(status);

    const queryPayload: {
      user: string;
      status?: string;
    } = {
      user: userId as string,
    };

    if (status) {
      queryPayload.status = status as string;
    }

    console.log(queryPayload);

    const transactions = await TransactionModel.find(queryPayload);
    return res.send(
      successResponse("Transactions fetched successfully", transactions)
    );
  } catch (error) {
    next(error);
  }
};
