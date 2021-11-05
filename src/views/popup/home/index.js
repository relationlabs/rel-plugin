import React, {useState, useEffect} from 'react'
import './home.styl'
import { Tabs, Switch, message } from 'antd'
import { BigNumber } from "ethers";
import FriendTab from './children/friendTab/index'
import MessageTab from './children/messageTab/index'
import TestTab from './children/testTab/index'
import LogoGather from './motion/LogoGather/index';
import { GithubOutlined, TwitterOutlined, FacebookOutlined, LoginOutlined} from '@ant-design/icons';
import ContractsUtils from '../../../common/utils/contractsUtils.js';
import DfinityLogo from '../../../assets/images/dfinity.png';
import MotokoSvg from '../../../assets/images/motoko.svg';
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { nftArr } from '../../../common/constant/index.js';
import DfinityUtils from "../../../common/utils/dfinityUtils.js"

const { TabPane } = Tabs;

function Home(props) {
  const [tabKey, setTapKey] = useState(1);
  const [messageArr, setMessageArr] = useState(null);
  const [address, setAddress] = useState('');
  const [dfinityKey, setDfinityKey] = useState('');
  const nftNum = JSON.parse(window.localStorage.getItem("nftNum")) ?? 0;

  useEffect(() => {
    listenMessage();
    handleAccountsChanged();
    setAddress(ContractsUtils.getLocalStorageWallet()?.address);
  }, [])

  const callback = (key) => {
    setTapKey(key);
  }

  const toLogin = async() => {
		// props.history.push('/login');
    window.localStorage.setItem("wallet", '');
    window.localStorage.setItem("friendSize", 0);
    window.localStorage.setItem("friendList", []);
    window.localStorage.setItem("messageList", []);
    window.localStorage.setItem("dfinityKey", '');
    window.localStorage.setItem("nftNum", 0);

    await DfinityUtils.logoutButtonClick();
    props.history.push('/login');
	}

  const toEthAccount = () => {
		// props.history.push('/ethAccount')
	}

  const formatAddress = (addressStr) => {
    return addressStr.substring(0, 3)+"..."+addressStr.substr(addressStr.length-3);
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
        setMessageArr(messageList);
      });
    } catch(err) {
      console.log(err)
    }
  }

  const handleAccountsChanged = async (arr) => {
    if(!!window.localStorage.getItem("dfinityKey") == true) {
      setDfinityKey(window.localStorage.getItem("dfinityKey"));
    } else {
      var wallet = ContractsUtils.getLocalStorageWallet();
      let flatSig = await wallet.signMessage(ContractsUtils.getUserName(address) ?? 'IC contracts');
      const array = flatSig
        .replace("0x", "")
        .match(/.{4}/g)
        .map((hexNoPrefix) => BigNumber.from("0x" + hexNoPrefix).toNumber());
      const uint8Array = Uint8Array.from(array);
      const id = Ed25519KeyIdentity.generate(uint8Array)
      const dfinityKey = id.getPrincipal().toString();
      window.localStorage.setItem("dfinityKey", dfinityKey);
      console.log('Dfinity身份生成：' + dfinityKey);
      message.success('Dfinity身份已生成');
      setDfinityKey(dfinityKey);
    }
  }

  return (
    <div className="layout-home">
      <div className="section-one">
        <LogoGather
          width={150}
          height={150}
          pixSize={12}
          pointSizeMin={8}
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
              src={nftArr[nftNum]}
            >
            </img>
          </div>
          <div className="switch">
            {/** 
            <Radio.Group size="small" defaultValue="eth" buttonStyle="solid">
              <Radio.Button value="eth">以太坊</Radio.Button>
              <Radio.Button value="dfinity">Dfinity</Radio.Button>
            </Radio.Group>
            */}
            <img src={MotokoSvg} style={{ width: 23, marginRight: 6 }} />
            <Switch size="small" defaultChecked/>
          </div>
          <div className="address" >
            <div className="data">IC - Contacts</div>
            <div className="data">{ContractsUtils.getUserName(address)}</div>
          </div>
          <div className="dfinityIdentify">
            <div className="data">Identity principal</div>
            <div className="data">{formatAddress(dfinityKey)}</div>
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
          <TabPane tab="消息列表" key="1">{tabKey == 1 && <MessageTab message={messageArr}/>}</TabPane>
          <TabPane tab="通讯录" key="2">{tabKey == 2 && <FriendTab/>}</TabPane>
          <TabPane tab="个人设置" key="3">{tabKey == 3 && <TestTab/>}</TabPane>
          {/* <TabPane tab="合约测试" key="4"><TestTab/></TabPane> */}
        </Tabs>
      </div>
    </div>
  )
}

export default Home
