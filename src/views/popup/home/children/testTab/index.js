import React, {useEffect} from 'react'
import { Button, Spin } from 'antd';
import { BigNumber } from "ethers";
import { LoadingOutlined } from '@ant-design/icons';
import { Ed25519KeyIdentity } from "@dfinity/identity";
import ContractsUtils from '../../../../../common/utils/contractsUtils.js';
import { relationship } from '../../../../../common/utils/declarations/relationship/index';

function TestTab(props) {
  const dfinityKey = window.localStorage.getItem("dfinityKey");
  const ethAddress = ContractsUtils.getLocalStorageWallet()?.address;

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
    <div style={{width:'100%', height: '230px', overflow: 'hidden', overflowY:'scroll'}}>
     <div style={{textAlign:'left'}}>
        <p style={{fontWeight:'bold'}}>Eth Address:</p>
        <p>{ethAddress}</p>
      </div>
      <div style={{textAlign:'left'}}>
        <p style={{fontWeight:'bold', textAlign:'left'}}>Identity Principal:</p>
        <p>{dfinityKey}</p>
      </div>
      <div className="testList" style={{textAlign:'left'}}>
        <p style={{fontWeight:'bold'}}>开发者模式:</p>
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
    </div>
  )
}

export default TestTab
