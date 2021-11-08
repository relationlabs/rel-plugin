import React, {useState} from 'react'
import { Button, Input, message } from 'antd'
import loginWhite from '../../../assets/images/logo-white.png'
import './login.styl'
import extension from 'extensionizer';
import ContractsUtils from "../../../common/utils/contractsUtils.js"
import { ArrowRightOutlined } from '@ant-design/icons'
import {Chain} from "../../../common/constant/index"


function Login(props) {
	const [privateKey, setPrivateKey] = useState('');

	const importAccount = () => {
		try {
			window.localStorage.setItem("wallet", JSON.stringify(privateKey))
			window.localStorage.setItem("nftNum", JSON.stringify(randomNum(0,4)));
			let wallet = ContractsUtils.getLocalStorageWallet();
			if(wallet != null){
				props.history.push('/home')
			} else {
				message.error('私钥格式有误')
			}
		} catch (err) {
			message.error('私钥格式有误')
		}
	}

	const keyChange = (e) => {
		setPrivateKey(e.target.value)
	}

	const randomNum = (minNum,maxNum) =>{ 
    switch(arguments.length){ 
      case 1: return parseInt(Math.random()*minNum+1,10); break; 
      case 2: return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); break; 
      default: return 0; break; 
    }
  } 

	// 前往options.html'
	const handleDfinityLogin = async () => {
		console.log(!!window.localStorage.getItem("ic-identity"));
		console.log(!!window.localStorage.getItem("ic-delegation"));

		if (window.localStorage.getItem("ic-identity") != null  && window.localStorage.getItem("ic-delegation") != null) {
			props.history.push('/home')
		} else {
			extension.tabs.create({ url: 'options/index.html' });
		}
	}

	return (
		<div className="layout-login">
			<img src={loginWhite} alt="" className="carrot" />
			{ Chain == 'ETH' && 
					<div className="login-con">
						<div className="ipt-con">
							<Input
								type="password"
								size="large"
								suffix={
									<div className="importBlock" onClick={importAccount}>
										<ArrowRightOutlined style={{ color: 'white' }} />
									</div>
								}
								onChange={keyChange.bind(this)}
								placeholder="请粘贴您的ETH私钥导入账户"
							/>
						</div>
					</div>
			}
			{ Chain == 'DFINITY' && 
					<div className="login-con">
						<div className="ipt-con">
							<Button className="loginButton" size="large" onClick={handleDfinityLogin}>
								Login DFINITY
							</Button>
						</div>
					</div>
			}
		</div>
	);
}

export default Login
