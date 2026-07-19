import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  provider: "credentials" | "google";
  isBlocked: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;