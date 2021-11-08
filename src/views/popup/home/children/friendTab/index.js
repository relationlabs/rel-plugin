import React, {useState, useEffect} from 'react'
import './friendTab.styl'
import { Spin, Popconfirm, message, Input } from 'antd';
import { CopyOutlined, MessageOutlined, LoadingOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../views/content/components/emptyStatus';
import ContractsUtils from '../../../../../common/utils/contractsUtils.js';
import { nftArr } from '../../../../../common/constant/index.js';

const { Search } = Input;
const Chain = window.localStorage.getItem("Chain");
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function FriendTab(props) {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [addAddress, setAddAddress] = useState('');

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
    if ( Chain == 'DFINITY') {
      console.log("Chain: " + Chain);
    } 
    if ( Chain == 'Ethereum') {
      setLoading(true);
      ContractsUtils.getFriendList().then((res) => {
        setLoading(false);
        setFriendList(res);
      })
    }
  }

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 4)+"..."+addressStr.substr(addressStr.length-4);
  }

  const sendMessage = (item) => {
    setCurrentItem(item);
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

  const onSearch = async() => {
    let value = addAddress;
    if (value != '' && value != null && value != undefined) {
      let sameList = friendList?.filter((item) => item.identity == value?.split(':')[1]);
      if (sameList?.length > 0) {
        message.error("好友地址已已存在！");
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
          message.error("好友地址格式有误");
        }
      }
    } else {
      message.error("好友地址不能为空");
    }
  };

  const deleteFriendHandle = async(value) => {
    try {
      var tx = await ContractsUtils.deleteFriend(value)
      console.log(tx);
      // 操作还没完成，需要等待
      await tx.wait();
      getFriendList();
      message.success("好友删除成功!");
    } catch(err) {
      console.log(err);
      message.error("好友删除失败！");
    }
  };

  const addressChange = (e) => {
		setAddAddress(e.target.value)
	}

  return (
    <div className="friendList">
      {/* <Search
        loading={searchLoading}
        placeholder="请输入好友地址"
        allowClear
        enterButton="添加"
        size="middle"
        onSearch={onSearch}
      /> */}
      <Input
        allowClear
        size="large"
        placeholder="请输入想要添加的好友地址"
        onChange={addressChange.bind(this)}
        suffix={
          <Spin indicator={antIcon} spinning={searchLoading}>
            <div className="importBlock" onClick={onSearch}>
              <ArrowRightOutlined style={{ color: 'white' }} />
            </div>
          </Spin>
        }
      />
      <Spin indicator={antIcon} spinning={loading}>
      { friendList != null && friendList.length !== 0 &&
        friendList.map((item,index) => {
          return <div className="item" key={index}>
            <div className="item-left">
              <img 
                className="item-icon" 
                loading="lazy" 
                // data-src={item.iconUrl} 
                src={nftArr[index%4]}>
              </img>
              <div className="item-info">
                <div className="">{item.name}</div>
                <div className="address">
                  <span>{formatAddress(item.identity)}</span>
                  <CopyOutlined />
                </div>
              </div>
            </div>
            <div>
              <Popconfirm
                placement="topRight"
                title={`是否向好友${currentItem?.name}发送游戏邀请，消息发送后直接进入游戏房间等待?`}
                onConfirm={() => handleOk(currentItem)}
                okText="发送"
                cancelText="取消"
              >
                <MessageOutlined onClick={() => sendMessage(item)}/>
              </Popconfirm>&nbsp;&nbsp;&nbsp;
              <Popconfirm
                placement="topRight"
                title={`是否确认删除好友${currentItem?.name}?`}
                onConfirm={() => deleteFriendHandle(currentItem?.identity)}
                okText="确认"
                cancelText="取消"
              >
                <DeleteOutlined onClick={() => sendMessage(item)}/>
              </Popconfirm>
            </div>
          </div>
        })
      }
      { friendList != null && friendList.length === 0 &&  loading == false && <EmptyStatus/> }
      </Spin>
    </div>
  )
}

export default FriendTab
