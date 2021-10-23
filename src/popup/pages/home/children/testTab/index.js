import React, {useEffect} from 'react'
import { Button, Spin } from 'antd';
import { BigNumber } from "ethers";
import { LoadingOutlined } from '@ant-design/icons';
import { Ed25519KeyIdentity } from "@dfinity/identity";
import ContractsUtils from '../../../../../utils/contractsUtils.js';
import { relationship } from '../../../../../utils/declarations/relationship/index';

function TestTab(props) {
  const handleAccountsChanged = async (arr) => {
    const address = ContractsUtils.getLocalStorageWallet()?.address
    var wallet = ContractsUtils.getLocalStorageWallet(); // ethers.utils.verifyMessage(message , signature);
    let flatSig = await wallet.signMessage(ContractsUtils.getUserName(address) ?? 'IC contracts');
    const array = flatSig
      .replace("0x", "")
      .match(/.{4}/g)
      .map((hexNoPrefix) => BigNumber.from("0x" + hexNoPrefix).toNumber());
    const uint8Array = Uint8Array.from(array);
    const id = Ed25519KeyIdentity.generate(uint8Array)
    const principal = id.getPrincipal();
    console.log(principal.toString());
    return principal;
  }
  return (
    <div style={{width:'100%', textAlign:'center'}}>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => {
          handleAccountsChanged().then((principal) => {
            console.log(principal);
            relationship.getUserName(principal).then((opt_entry) => {
              console.log('getUserName', opt_entry);
            });
          })
        }}>
          测试Dfinity合约
      </Button>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.getRelationAddress()}>获取当前用户的好友合约地址
      </Button>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.getUserInfo()}>获取当前用户基本信息
      </Button>
      <Button 
        type="primary"
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.addFriend()}>添加好友
      </Button>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.getFriendList()}>获取当前用户好友列表
      </Button>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.sendMessage()}>向好友发送消息
      </Button>
      <Button 
        type="primary" 
        style={{display:'block', margin:'5px'}} 
        onClick={() => ContractsUtils.listenMessage()}>监听自己收到的消息
      </Button>
    </div>
  )
}

export default TestTab
