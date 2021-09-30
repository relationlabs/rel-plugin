import React, {useState, useEffect} from 'react'
import './friendTab.styl'
import { Spin } from 'antd';
import { CopyOutlined, MessageOutlined, LoadingOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';
import ContractsUtils from '../../../../../utils/contractsUtils.js';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function FriendTab(props) {
  const [loading, setLoading] = useState(false);
  const [friendList, setFriendList] = useState([])

  useEffect(() => {
    getFriendList();
  }, [])

  const getFriendList = () => {
    setLoading(true);
    ContractsUtils.getFriendList().then((res) => {
      setLoading(false);
      setFriendList(res);
    })
  }

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 4)+"..."+addressStr.substr(addressStr.length-4);
  }

  return (
    <div className="friendList">
    <Spin indicator={antIcon} spinning={loading}>
      { friendList.length !== 0 &&
        friendList.map((item,index) => {
          return <div className="item" key={index}>
            <div className="item-left">
              <img 
                className="item-icon" 
                loading="lazy" 
                data-src={item.iconUrl} 
                src={item.iconUrl}>
              </img>
              <div className="item-info">
                <div className="">{item.name}</div>
                <div className="address">
                  <span>{formatAddress(item.identity)}</span>
                  <CopyOutlined />
                </div>
              </div>
            </div>
            <a 
              target="_black"
              className="message" 
              href="https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/game/binbin1/.weiguo"
              // href="https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/play"
              // https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/game/binbin1/.weiguo
              ><MessageOutlined /></a>
          </div>
        })
      }
      { friendList.length === 0 && <EmptyStatus/> }
      </Spin>
    </div>
  )
}

export default FriendTab
