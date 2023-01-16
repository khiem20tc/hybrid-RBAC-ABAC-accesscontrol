import Web3 from "web3";
import { blockchain } from "../constant";

// import { BLOCKCHAIN_CONFIG, BLOCKCHAIN_AGD, BLOCKCHAIN_MBC } from "../constant/blockchain";

const { RPC } = blockchain;

const WEB3 = new Web3(
  new Web3.providers.HttpProvider(RPC)
);

const createMessage = async(params=[]) => {
  
  const message = WEB3.utils.soliditySha3(
    ...params
  );

  return message;

};

const createSignature = async ({privatekey, message}) => {

  const signature = await WEB3.eth.accounts.sign(
    message,
    privatekey, 
  );

  return signature;

}; 

const recoverSigner = async(message, signature) => {
  
  const signer = await WEB3.eth.accounts.recover(
    message,
    signature, 
  );
              
  return signer;
    
};

export default {
  createMessage,
  createSignature,
  recoverSigner
};