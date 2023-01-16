import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";
//import CONSTANTS from "../constants/constants";

const Key = new Schema(
  {
    id: { type: String, default: uuidV4, unique: true, index: true }, //APIKey is uuidv4
    userId: { type: String, required: true },
    assetId: { type: String, required: true },
    expiredTime: { type: Number, default: parseInt(Date.now()/1000) + 2592000 }, //valid in 30 days
  },
  {
    timestamps: true,
  }
);

export default model(
  "Key Model",
  Key,
  "key"
);