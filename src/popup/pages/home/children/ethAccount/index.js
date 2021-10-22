import React, {useState, useEffect} from 'react'
import './eth.styl'
import { Button } from 'antd'
import ethIcon from '../../../../../content/images/ethereum_icon.png'
import { LeftOutlined, PlusCircleOutlined } from '@ant-design/icons';

function EthAccount(props) {

  useEffect(() => {

  }, [])

  return (
    <div className="layout-eth">
      <div className="nav">
        <div className="nav-left">
          <LeftOutlined/>
          <div>Ethereum 账户管理</div>
        </div>
        <Button type="primary" shape="round" size="small">刷新</Button>
      </div>
      <div className="eth-list">
        <div className="eth-add">
          <div className="eth-add-left">
            <img src={ethIcon} alt="" width="48"/>
            <div className="">Ethereum</div>
          </div>
          <PlusCircleOutlined style={{fontSize:'20px'}}/>
        </div>
        <div className="">
          
        </div>
      </div>
    </div>
  )
}

export default EthAccount
