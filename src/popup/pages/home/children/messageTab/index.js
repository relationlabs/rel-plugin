import React, {useState, useEffect} from 'react'
import './messageTab.styl'
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';

function MessageTab(props) {
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    console.log(props?.message);
    if(props?.message != null) {
      setMessageList([props?.message])
    }
  }, [props])

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 4)+"..."+addressStr.substr(addressStr.length-4);
  }

  return (
    <div className="messageTab">
      { messageList.length !== 0 &&  
        messageList.map((item,index) => {
          return <div className="item" key={index}>
            <div className="item-left">
              <div className="item-info">
                {formatAddress(item?.args?.sender)}邀请你一起游戏 on IC
              </div>
            </div>
            <div className="message" >
              <a href={item?.args?.message} target='_blank'><ArrowRightOutlined /></a>
            </div>
          </div>
        })
      }
      { messageList.length === 0 && <EmptyStatus/> }
    </div>
  )
}

export default MessageTab
