import Web3 from "web3";

import { blockchain } from "../constant";

// import { BLOCKCHAIN_CONFIG, BLOCKCHAIN_AGD, BLOCKCHAIN_MBC } from "../constant/blockchain";

const { RPC } = blockchain;

const WEB3 = new Web3(
  new Web3.providers.HttpProvider(RPC)
);

const convertBytes32 = (data) => {
  return WEB3.utils.padLeft(WEB3.utils.asciiToHex(data),64).toLowerCase();
};

const convertToHex = (data) => {
  return WEB3.utils.asciiToHex(data).toLowerCase();
};

const convertHexToBytes32 = (data) => {
  return WEB3.utils.padLeft(data,64).toLowerCase();
};

const addHexPrefix = (data) => {
  return "0x" + data;
};

const removeHexPrefix = (data) => {
  if (WEB3.utils.isHexStrict(data)) {
    return data.slice(2);
  } else {
    return data;
  }
};

export default {
  convertBytes32,
  convertToHex,
  convertHexToBytes32,
  addHexPrefix,
  removeHexPrefix
};