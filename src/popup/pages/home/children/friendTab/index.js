import React, {useState, useEffect} from 'react'
import './friendTab.styl'
import { Spin, Popconfirm, message, Button } from 'antd';
import { CopyOutlined, MessageOutlined, LoadingOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';
import ContractsUtils from '../../../../../utils/contractsUtils.js';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function FriendTab(props) {
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [friendList, setFriendList] = useState([]);

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

  const sendMessage = (item) => {
    setCurrentItem(item)
  }

  const handleOk = () => {
    ContractsUtils.sendMessage().then(() => {
      message.success('发送成功，正在跳转');
      setTimeout(() => {
        window.open("https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/game/binbin1/.weiguo");
      }, 2000)
    })
  };

  const handleCancel = () => {
    // message.success('Click on No');
  };

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
              <Popconfirm
                placement="topRight"
                title={`是否向好友${currentItem?.name}发送游戏邀请，消息发送后直接进入游戏房间等待?`}
                onConfirm={handleOk}
                onCancel={handleCancel}
                okText="发送"
                cancelText="取消"
              >
                <MessageOutlined onClick={() => sendMessage(item)}/>
              </Popconfirm>
          </div>
        })
      }
      { friendList.length === 0 &&  loading == false && <EmptyStatus/> }
      </Spin>
    </div>
  )
}

export default FriendTab
