import React, {useState, useEffect} from 'react'
import './friendTab.styl'
import { Spin, Popconfirm, message, Input } from 'antd';
import { CopyOutlined, MessageOutlined, LoadingOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';
import ContractsUtils from '../../../../../utils/contractsUtils.js';

const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function FriendTab(props) {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    if(!!window.localStorage.getItem("friendList") == true){
      setFriendList(JSON.parse(window.localStorage.getItem("friendList")))
    }
    getFriendList();
  }, [])


  useEffect(() => {
    console.log("friendList ========> ");
    console.log(friendList);
  }, [friendList])

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

  const handleOk = async(currentItem) => {
    var userName = ContractsUtils.getUserName(ContractsUtils.getLocalStorageWallet().address)
    var isCreate = await ContractsUtils.isCreateRelationAddress(currentItem.identity);
    if(isCreate) {
      ContractsUtils.sendMessage(currentItem).then((res) => {
        console.log(res);
        message.success('发送成功，正在跳转');
        setTimeout(() => {
          window.open(`https://ivg37-qiaaa-aaaab-aaaga-cai.ic0.app/#!/game/${userName}/.${currentItem?.name}`);
        }, 2000)
      })
    } else {
      message.error('对方未创建好友合约');
    }
  };

  const onSearch = async(value) => {
    if (value != '' && value != null && value != undefined) {
      let sameList = friendList?.filter((item) => item.identity == value.split(':')[1]);
      if (sameList?.length > 0) {
        message.error("地址已添加！");
      } else {
        try {
          setSearchLoading(true);
          var tx = await ContractsUtils.addFriend(value)
          // 操作还没完成，需要等待挖矿
          await tx.wait();
          getFriendList();
          setSearchLoading(false);
          message.success("好友添加成功");
        } catch(err) {
          setSearchLoading(false);
          message.success("地址格式有误");
        }
      }
    }
  };

  return (
    <div className="friendList">
      <Search
        loading={searchLoading}
        placeholder="请输入好友地址"
        allowClear
        enterButton="添加"
        size="middle"
        onSearch={onSearch}
      />
    <Spin indicator={antIcon} spinning={loading}>
      { friendList != null && friendList.length !== 0 &&
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
                onConfirm={() => handleOk(currentItem)}
                okText="发送"
                cancelText="取消"
              >
                <MessageOutlined onClick={() => sendMessage(item)}/>
              </Popconfirm>
          </div>
        })
      }
      { friendList != null && friendList.length === 0 &&  loading == false && <EmptyStatus/> }
      </Spin>
    </div>
  )
}

export default FriendTab
