import { catchError } from "../middleware";
import { accessKey, apiError, accessControl } from "../helper";

const genKey = catchError(async(req,res,next) => {
  try {
    const { userId, assetId } = req.body;

    const key = await accessKey.createKey(userId, assetId);

    return res.json(key);

  } catch (error) { 
    throw error;
  }
});

const verifyKey = catchError(async(req,res,next) => {
  try {
    const { key } = req.params;

    const isValid = await accessKey.verifyKey(key);

    return res.json(isValid);

  } catch (error) { 
    throw error;
  }
});

const getPermission = catchError(async(req,res,next) => {
  try {
    const { userId, owner, key } = req.body;

    const permission = await accessControl.readPermission({userId, owner, key });

    return res.json(permission);

  } catch (error) { 
    throw error;
  }
});

export default {
  genKey,
  verifyKey,
  getPermission
};