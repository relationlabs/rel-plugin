import React, {useState} from 'react'
import './dappTab.styl'
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons';
import EmptyStatus from '../../../../../content/components/emptyStatus';

function DappTab(props) {
  const [dappList, setDappList] = useState([
    {
      iconUrl: 'https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif',
      account: '0xB8c107bf274d3a06440De6395D4B7b0b59caa9B9'
    },
    {
      iconUrl: 'https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif',
      account: '0xB8c107bf274d3a06440De6395D4B7b0b59caa9B9'
    },
    {
      iconUrl: 'https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif',
      account: '0xB8c107bf274d3a06440De6395D4B7b0b59caa9B9'
    },
    {
      iconUrl: 'https://wepiggy.static.fortop.site/app/static/lowRisk.aa37608b.gif',
      account: '0xB8c107bf274d3a06440De6395D4B7b0b59caa9B9'
    }
  ])

  return (
    <div className="dappTab">
      { dappList.length !== 0 &&  
        dappList.map((item,index) => {
          return <div className="item" key={index}>
            <div className="item-left">
              <img 
                className="item-icon" 
                loading="lazy" 
                data-src={item.iconUrl} 
                src={item.iconUrl}>
              </img>
              <div className="item-info">
                <div className="">Account</div>
                <div className="address">
                  <span>0xB8c1...a9B9</span>
                  <CopyOutlined />
                </div>
              </div>
            </div>
            <div className="message"><ArrowRightOutlined /></div>
          </div>
        })
      }
      { dappList.length === 0 && <EmptyStatus/> }
    </div>
  )
}

export default DappTab
