import React, {useState, useEffect} from 'react'
import './home.styl'
import { Tabs } from 'antd'
import { BigNumber } from "ethers";
import FriendTab from './children/friendTab/index'
import MessageTab from './children/messageTab/index'
import TestTab from './children/testTab/index'
import LogoGather from '../motion/LogoGather/index';
import { GithubOutlined, TwitterOutlined, FacebookOutlined, LoginOutlined} from '@ant-design/icons';
import ContractsUtils from '../../../utils/contractsUtils.js';
// import LogoSvg from '../motion/LogoGather/IC.svg';
import DfinityLogo from './dfinity.png';
// import { Ed25519KeyIdentity } from "@dfinity/identity";

const { TabPane } = Tabs;

function Home(props) {
  const [tabKey, setTapKey] = useState(1);
  const [message, setMessage] = useState(null);
  const [address, setAddress] = useState('');

  useEffect(() => {
    listenMessage();
    handleAccountsChanged();
    setAddress(ContractsUtils.getLocalStorageWallet()?.address);
  }, [])

  const callback = (key) => {
    setTapKey(key);
  }

  const toLogin = () => {
		props.history.push('/login');
    window.localStorage.setItem("wallet", '');
    window.localStorage.setItem("friendSize", 0);
    window.localStorage.setItem("friendList", []);
    window.localStorage.setItem("messageList", []);
	}

  const toEthAccount = () => {
		// props.history.push('/ethAccount')
	}

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 4)+"..."+addressStr.substr(addressStr.length-4);
  }

  const listenMessage = async() => {
    try {
      let messageList = [];
      if(!!window.localStorage.getItem("messageList") == true){
        messageList = [...JSON.parse(window.localStorage.getItem("messageList"))]
      }
      var addressListContract = await ContractsUtils.createAddressListContract();
      addressListContract.on('GetMessage', (from, to, value) => {
        messageList.push({
          sender: value.args.sender,
          message: value.args.message,
        });
        window.localStorage.setItem("messageList", JSON.stringify(messageList));
        setMessage(messageList);
      });
    } catch(err) {
      console.log(err)
    }
  }

  const handleAccountsChanged = async (arr) => {
    var wallet = ContractsUtils.getLocalStorageWallet(); // ethers.utils.verifyMessage(message , signature);
    let flatSig = await wallet.signMessage(ContractsUtils.getUserName(address) ?? 'IC contracts');
    const array = flatSig
      .replace("0x", "")
      .match(/.{4}/g)
      .map((hexNoPrefix) => BigNumber.from("0x" + hexNoPrefix).toNumber());
    const uint8Array = Uint8Array.from(array);
    console.log(uint8Array);
    // console.log(Ed25519KeyIdentity);
    // const id = Ed25519KeyIdentity.generate(uint8Array)
    // console.log(id)
    // console.log(id.getPrincipal().toString())
  }

  return (
    <div className="layout-home">
      <div className="section-one">
        <LogoGather
          width={150}
          height={150}
          pixSize={12}
          pointSizeMin={8}
          // image={LogoSvg}
          image='https://zos.alipayobjects.com/rmsportal/TOXWfHIUGHvZIyb.svg'
        />
        <div className="bg">
          <div className="lock">
            <LoginOutlined className="lockStyle" onClick={toLogin}/>
          </div>
          <div className="avt">
            <img 
              className="icon" 
              loading="lazy" 
              src="images/logo-white.png"
            >
            </img>
          </div>
          <div className="address" >
            <div className="data">IC - Contact</div>
            <div className="data">{ContractsUtils.getUserName(address)}</div>
          </div>
          <div className="dfinityIdentify">
            <div className="data">Identify Anchor</div>
            <div className="data">{ContractsUtils.getUserName(address)}</div>
          </div>
          <div className="chainList">
            <GithubOutlined spin={false} className="iconStyle" onClick={toEthAccount}/>
            <TwitterOutlined spin={false} className="iconStyle" />
            <FacebookOutlined spin={false} className="iconStyle" />
            <span className="iconStyle" style={{ height: 30, width: 30, display: 'inline-block', position: 'relative' }}>
              <img src={DfinityLogo} style={{ position: 'absolute', top: -2, left: 0, width: 26 }} />
            </span>
          </div>
        </div>
      </div>

      <div className="section-two">
        <Tabs defaultActiveKey="1" onChange={callback} centered>
          <TabPane tab="消息列表" key="1">{tabKey == 1 && <MessageTab message={message}/>}</TabPane>
          <TabPane tab="通讯录" key="2">{tabKey == 2 && <FriendTab/>}</TabPane>
          <TabPane tab="个人设置" key="3">{tabKey == 3 && <TestTab/>}</TabPane>
          {/* <TabPane tab="合约测试" key="4"><TestTab/></TabPane> */}
        </Tabs>
      </div>
    </div>
  )
}

export default Home
