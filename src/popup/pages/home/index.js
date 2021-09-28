import React, {useState, useEffect} from 'react'
import './home.styl'
import { Tabs } from 'antd'
import FriendTab from './children/friendTab/index'
import DappTab from './children/dappTab/index'
import TestTab from './children/testTab/index'
import useAccount from '../../useAccount.js'
import LogoGather from '../motion/LogoGather/index';
import { GithubOutlined, TwitterOutlined, FacebookOutlined, LockFilled} from '@ant-design/icons';

const { TabPane } = Tabs;

function Home(props) {
  const {} = useAccount();

  const callback = (key) => {
    console.log(key);
  }

  const toLogin = () => {
		props.history.push('/login')
	}

  const toEthAccount = () => {
		props.history.push('/ethAccount')
	}

  useEffect(() => {

  }, [])

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
              data-src="https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif" 
              src="https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif">
            </img>
          </div>
          <div className="static">
            <div className="data">Meta-RelationShip-ID</div>
          </div>
          <div className="chainList">
            <GithubOutlined spin={false} className="iconStyle" onClick={toEthAccount}/>
            <TwitterOutlined spin={false} className="iconStyle" />
            <FacebookOutlined spin={false} className="iconStyle" />
          </div>
        </div>
        {/* <div className="info">
          <div className="metaInfo">这里可以添加metaId信息</div>
        </div> */}
      </div>

      <div className="section-two">
        <Tabs defaultActiveKey="0" onChange={callback}>
          <TabPane tab="合约测试" key="0">
            <TestTab/>
          </TabPane>
          <TabPane tab="消息" key="1">
            {/* Content of Tab Pane 3 */}
          </TabPane>
          <TabPane tab="通讯录" key="2">
            <FriendTab />
          </TabPane>
          <TabPane tab="我的" key="3">
            <DappTab/>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default Home
