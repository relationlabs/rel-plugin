import React, {useState} from 'react'
import './messageTab.styl'
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';

function MessageTab(props) {
  const [messageList, setMessageList] = useState([]);

  return (
    <div className="messageTab">
      { messageList.length !== 0 &&  
        messageList.map((item,index) => {
          return <div className="item" key={index}>
            <div className="item-left">
              <div className="item-info">
                {/* <div className="">消息</div>
                <div className="address">
                  <span>0xB8c1...a9B9</span>
                  <CopyOutlined />
                </div> */}
              </div>
            </div>
            <div className="message"><ArrowRightOutlined /></div>
          </div>
        })
      }
      { messageList.length === 0 && <EmptyStatus/> }
    </div>
  )
}

export default MessageTab
