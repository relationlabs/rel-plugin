import React, {useState} from 'react'
import { Button, Input, message } from 'antd'
import loginWhite from '../../../assets/images/logo-white.png'
import './login.styl'
import ContractsUtils from "../../../common/utils/contractsUtils.js"
import { ArrowRightOutlined } from '@ant-design/icons'
import { AuthClient } from '@dfinity/auth-client';

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


	const handleLogin = async () => {
		const IDENTITY_URL = 'https://identity.ic0.app';
		const authClient = await AuthClient.create();

		console.log(authClient.isAuthenticated());

		await authClient.login();
    const identity = authClient.getIdentity();

		console.log(authClient.isAuthenticated());

    console.log(identity);
		console.log(identity.getPrincipal())
		console.log(identity.getPrincipal().toString())
    console.log(identity.getPrincipal().isAnonymous())
  };

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
					<Button className="loginButton" size="large" onClick={handleLogin}>
						登录 Dfinity
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Login