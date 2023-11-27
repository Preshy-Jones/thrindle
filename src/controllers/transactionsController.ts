import { NextFunction, Request, Response } from "express";
import { InitiateTransactionInput } from "../validation/transaction.schema";
import { NotFoundError } from "../errors";
import UserModel from "../models/User";
import paystackService from "../lib/paystack";
import { successResponse } from "../utils";
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

    const transaction = new TransactionModel({
      amount,
      description,
    });

    const response = await paystackService.initiateTransaction({
      amount,
      email: user.email,
      reference: transaction._id,
    });

    transaction.transactionReference = response.reference;
    await transaction.save({
      session,
    });

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

export const getTransactionHistory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user;

    const transactions = TransactionModel.findOne({
      user: userId,
    });
  } catch (error) {
    next(error);
  }
};
