import React, {useState, useEffect} from 'react'
import './home.styl'
import { Tabs } from 'antd'
import FriendTab from './children/friendTab/index'
import MessageTab from './children/messageTab/index'
import TestTab from './children/testTab/index'
import useAccount from '../../useAccount.js'
import LogoGather from '../motion/LogoGather/index';
import { GithubOutlined, TwitterOutlined, FacebookOutlined, LockFilled} from '@ant-design/icons';
import ContractsUtils from '../../../utils/contractsUtils.js';

const { TabPane } = Tabs;

function Home(props) {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    listenMessage();
  }, [])

  const callback = (key) => {
    console.log(key);
  }

  const toLogin = () => {
		props.history.push('/login')
	}

  const toEthAccount = () => {
		// props.history.push('/ethAccount')
	}

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 4)+"..."+addressStr.substr(addressStr.length-4);
  }

  const listenMessage = async() => {
    console.log("合约方法 - 9.监听自己收到的消息");
    var addressListContract = await ContractsUtils.createAddressListContract();
    addressListContract.on('GetMessage', (from, to, value) => {
      console.log(value);
      console.log('I received ' + value?.args?.message + ' tokens from ' + from);
      setMessage(value);
    });
  }

  return (
    <div className="layout-home">
      <div className="section-one">
        <LogoGather
          width={120}
          height={120}
          pixSize={10}
          pointSizeMin={5}
          image='https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg'
        />
        <div className="bg">
          <div className="lock">
            <LockFilled className="lockStyle" onClick={toLogin}/>
          </div>
          <div className="avt">
            <img 
              className="icon" 
              loading="lazy" 
              src="images/logo-white.png"
              // data-src="https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif" 
              // src="https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif"
            >
            </img>
          </div>
          <div className="static">
            <div className="data">Meta-RelationShip-ID</div>
          </div>
          <div className="address">
            <div className="data">{formatAddress("0x7fcc26e9527d88b63e822b72d2a68ac45c8aba05")}</div>
          </div>
          <div className="chainList">
            <GithubOutlined spin={false} className="iconStyle" onClick={toEthAccount}/>
            <TwitterOutlined spin={false} className="iconStyle" />
            <FacebookOutlined spin={false} className="iconStyle" />
          </div>
        </div>
      </div>

      <div className="section-two">
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          {/* <TabPane tab="合约测试" key="0"><TestTab/></TabPane> */}
          <TabPane tab="消息列表" key="1"><MessageTab message={message}/></TabPane>
          <TabPane tab="通讯录" key="2"><FriendTab/></TabPane>
          <TabPane tab="个人设置" key="3">{/* <DappTab/> */}</TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Home
