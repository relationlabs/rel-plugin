import React, {useEffect} from 'react'
import { Button, Spin, message } from 'antd';
import { BigNumber } from "ethers";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import ContractsUtils from '../../../../../common/utils/contractsUtils.js';
import { createActor, canisterId } from '../../../../../common/utils/declarations/relationship/index';
import { createFriendActor } from '../../../../../common/utils/declarations/friendHandle/index';
import FleekUtils from '../../../../../common/utils/fleekUtils';
import { AuthClient } from '@dfinity/auth-client';

let relationship;
let friend;
let identity;

function TestTab(props) {
  const Chain = window.localStorage.getItem("Chain");
  const dfinityKey = window.localStorage.getItem("dfinityKey");
  const ethAddress = Chain == 'Ethereum' ? ContractsUtils.getLocalStorageWallet()?.address : '';

  //通过ETH创建Dfinity身份
  const ethCreateIC = async () => {
    const address = ContractsUtils.getLocalStorageWallet()?.address
    var wallet = ContractsUtils.getLocalStorageWallet(); 
    let flatSig = await wallet.signMessage(ContractsUtils.getUserName(address) ?? 'IC contracts');
    const array = flatSig
      .replace("0x", "")
      .match(/.{4}/g)
      .map((hexNoPrefix) => BigNumber.from("0x" + hexNoPrefix).toNumber());
    const uint8Array = Uint8Array.from(array);
    const identity = Ed25519KeyIdentity.generate(uint8Array);

    console.log("------------ identity ---------");
    console.log(identity);
    console.log(identity.getPrincipal().toText());

    relationship = createActor(canisterId, {
      agentOptions: {
        host: 'https://ic0.app',
        identity,
      },
    });
    relationship.createProfile('momo').then(res => 
      console.log("ethCreateIC-通过ETH创建Dfinity身份: ", res)
    );
  }

  //通过IC创建Dfinity身份
  const icCreateIC = async() => {
    const authClient = await AuthClient.create();
    identity = await authClient.getIdentity();
    console.log("------------ identity ---------");
    console.log(identity);
    console.log(identity.getPrincipal().toText());
    relationship = await createActor(canisterId, {
      agentOptions: {
        host: 'https://ic0.app',
        identity,
      },
    });
    let friendCanister = await relationship.getCanister(identity.getPrincipal());
    console.log('getCanister', friendCanister);
    if (!friendCanister || (Array.isArray(friendCanister) && friendCanister.length === 0)) {
      friendCanister = await relationship.createProfile('momo');
      console.log('createProfile momo: ', friendCanister);
    }
    if (friendCanister) {
      if (Array.isArray(friendCanister)) friendCanister = friendCanister[0];
      const friendCanisterId = friendCanister.toText();
      console.log('friendCanisterId', friendCanisterId);
      friend = await createFriendActor(friendCanisterId, {
        agentOptions: {
          host: 'https://ic0.app',
          identity,
        },
      });
      let res = await friend.createFriend({
        userName: 'nono',
        addr: '1234',
      });
      console.log('create Friend', res);
    }
  }

  //读取朋友关系(Dfinity)
  const getDfinityFriends = async () => {
    if (friend) {
      const res = await friend.getFriends();
      console.log('getFriends', res);
    }
  }

  //测试Fleek Storage JS库
  const handleFleek = async() => {
    await FleekUtils.saveDataToIpfs('zhengbinbin1');
    message.success('数据已上传fleek');
  }

  //测试bg和popup给content发送消息
  const bgToPopup = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true,
    }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { cmd: 'test', value: '这是一段来自popup的消息' }, (response) => {
        console.log('来自content的回复:', response);
      });
    });
  }

  //测试bg与popup的相互调用
  const popupToBg = () => {
    const bg = chrome.extension.getBackgroundPage();
    if (typeof bg.testf === 'function') bg.testf();
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
          onClick={handleFleek}>测试Fleek
        </Button>
        <Button 
          type="primary"
          style={{display:'block', margin:'5px'}}
          onClick={FleekUtils.listFiles}>获取Fleek上文件列表
        </Button>
        <Button 
          type="primary"
          style={{display:'block', margin:'5px'}}
          onClick={ContractsUtils.updateUserInfo()}>修改用户信息
        </Button>
        <Button
          type="primary"
          style={{display:'block', margin:'5px'}} 
          onClick={popupToBg}>测试bg与popup的相互调用
        </Button>
        <Button
          type="primary"
          style={{display:'block', margin:'5px'}} 
          onClick={bgToPopup}>测试bg和popup给content发送消息
        </Button>
        <Button 
          type="primary" 
          style={{display:'block', margin:'5px'}} 
          onClick={ethCreateIC}>ethCreateIC
        </Button>
        <Button 
          type="primary" 
          style={{display:'block', margin:'5px'}} 
          onClick={icCreateIC}>创建用户添加好友(Dfinity)
        </Button>
        <Button 
          type="primary" 
          style={{display:'block', margin:'5px'}} 
          onClick={getDfinityFriends}>读取用户好友(Dfinity)
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
