import exp from "constants";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      Select: false,
    },
  },
});

export const userModel = mongoose.model("user", UserSchema);

/*Create*/
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());

/* READ */
export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) => userModel.findById({ id });

/*UPDATE*/
export const updateUserByID = (id: string, values: Record<string, any>) =>
  userModel.findByIdAndUpdate({ id, values });

/*DELETE*/
export const deleteUserByID = (id: string) =>
  userModel.findOneAndDelete({ _id: id });
