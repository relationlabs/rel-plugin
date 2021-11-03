import React, {useState} from 'react'
import { Button, Input, message } from 'antd'
import loginWhite from './logo-white.png'
import './login.styl'
import ContractsUtils from "../../../utils/contractsUtils.js"
import { ArrowRightOutlined } from '@ant-design/icons'

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


  // const login = () => {
  //   return new Promise(async (resolve) => {
  //     await this.authClient?.login({
  //       identityProvider: IDENTITY_URL,
  //       onSuccess: async () => {
  //         resolve(this.authClient?.getIdentity());
  //       },
  //     });
  //   });
  // }

	return (
		<div className="layout-login">
			<img src={loginWhite} alt="" className="carrot" />
			{/* <div className="login-con">
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
						placeholder="请粘贴您的私钥导入账户"
					/>
				</div>
			</div> */}
			<div className="login-con">
				<div className="ipt-con">
					<Button className="loginButton" size="large">
						登录 Dfinity
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login
