import { AssetSlotModel } from "../model";

const isExistAssetSlot = async (info) => {
  const data = await AssetSlotModel.exists(info);
  return data;
};

const createAssetSlot= async (info, opts = {}) => {
  const data = await AssetSlotModel.create(info, opts);
  return data;
};

const insertManyAssetSlot = async (info, opts = {}) => {
  const data = await AssetSlotModel.insertMany(info, opts);
  return data;
};
  
const removeAssetSlot = async (query) => {
  const data = await AssetSlotModel.deleteOne(query);
  return data;
};
  
const getDetailAssetSlot = async (query, projection = {"_id": 0, "__v": 0}) => {
  const data = await AssetSlotModel.findOne(query, projection).lean();
  return data;
};
  
const getListAssetSlot = async (query, projection = {"_id": 0, "__v": 0}) => {
  const data = await AssetSlotModel.find(query, projection).sort({"_id": -1}).lean();
  return data;
};
  
const updateAssetSlot = async (filter, update, options={}) => {
  const data = await AssetSlotModel.updateMany(filter, update, options);
  return data;
};

export default {
  isExistAssetSlot,
  createAssetSlot,
  insertManyAssetSlot,
  removeAssetSlot,
  getDetailAssetSlot,
  getListAssetSlot,
  updateAssetSlot
};