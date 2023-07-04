import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unqiue: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Invalid email address",
    ],
  },
  fullName: {
    type: String,
    require: [true, "Full name is required"],
    minLength: [4, "Min length is 4"],
    maxLength: [30, "Max length is 4"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
