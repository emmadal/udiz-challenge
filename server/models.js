import mongoose from "mongoose";

// Here we define the schema of all entities

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
});

const roofSchema = new mongoose.Schema({
  ref: { type: String, required: true },
  amount: { type: Number, required: true },
  length: { type: String, required: true },
  width: { type: String, required: true },
  performance: [String],
});

export const User = mongoose.model("User", userSchema);
export const Roof = mongoose.model("Roof", roofSchema);
