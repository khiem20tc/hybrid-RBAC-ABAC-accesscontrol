import { Schema, model } from "mongoose";
import { v4 as uuidV4 } from "uuid";
//import CONSTANTS from "../constants/constants";

const AssetSlot = new Schema(
  {
    id: { type: String, default: uuidV4, unique: true, index: true },
    owner: { type: String, require: true },
    name: { type: String, require: true },
    image: {type: String, require: true },
    nftId: { type: String, require: true },
    nftAddress: { type: String, require: true },
    metadata: { type: Object, require: true },
    amounts: { type: Number, require: true },
    tokenType: { type: Number, enum: [0,1,2,3,4]}, //Native Coin, Wrapper1 - ERC20, Wrapper2 - ERC20, ERC1155, ERC721
    status: { type: Number, enum: [0,1,2], default: 0 }, //Empty, ForSale, NotForSale
    ownerSigKey: { type: String },
    date: { type: Number, default: Date.now },

  },
  {
    timestamps: true,
  }
);

// MarketNFT.index({ collectionAddr: 1, tokenId: 1 }); 
// MarketNFT.index({ status: 1 }); 
// MarketNFT.index({ networkId: 1 }); 
// MarketNFT.index({ labelId: 1 }); 
// MarketNFT.index({ status: 1, totalLikes: -1 }); 
// MarketNFT.index({ status: 1, totalBids: -1 }); 

export default model(
  "Asset Slot Model",
  AssetSlot,
  "assetslot"
);