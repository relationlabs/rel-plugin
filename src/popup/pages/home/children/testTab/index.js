import React, {useEffect} from 'react'
import { Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ContractsUtils from '../../../../../utils/contractsUtils.js';

function TestTab(props) {

  return (
    <div style={{width:'100%', textAlign:'center'}}>
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
