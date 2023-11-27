import { omit } from "lodash";
import UserModel, { UserDocument } from "../../models/User";
import { DocumentDefinition, FilterQuery } from "mongoose";
import { ConflictError } from "../../errors";

export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  const user = await UserModel.findOne({ email: input.email });
  if (user) {
    throw new ConflictError("Email is already registered");
  }

  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}
