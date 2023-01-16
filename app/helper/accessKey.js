import {KeyModel} from "../model";

const createKey = async(userId, assetId) => {
  let key = {
    userId,
    assetId
  }; 

  key = await KeyModel.create(key);

  return key;
};

const verifyKey = async(key) => {
  const verify = await KeyModel.findOne({id: key}).lean();

  if (verify && verify._id) {
    return true;
  }

  return false;
};

export default {
  createKey,
  verifyKey
};