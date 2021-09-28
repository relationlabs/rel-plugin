import { useState, useEffect} from 'react'
import ContractsUtils from '../utils/contractsUtils.js';
import { PrivateKey } from '../constants/index.js';
import { ethers } from "ethers";

export default function useAccount(){

  // 初始化
  useEffect(() => {
    // ContractsUtils.mainJ();
    // testEthersProvider();
  }, [])
  
  const testEthersProvider = async () => {
    // let blockNumber = await ethersProvider.getBlockNumber();
    // let balance0 = await ethersProvider.getBalance("ethers.eth");
    // let balance1 = ethers.utils.formatEther(balance0)
    // console.log("blockNumber:" + blockNumber);
    // console.log("balance0:" + balance0);
    // console.log("balance1:" + balance1);
    // console.log(ethersProvider._network.ensAddress);

    // let lbcWallet = ContractsUtils.getRandomWallet();
    // let lbcWallet = ContractsUtils.getPrivateKeyWallet(PrivateKey);
    // console.log(lbcWallet);

    // ContractsUtils.sendMessage();
    // ContractsUtils.contactWithMyFriend();
  }

  return {
    
  };
}
