import React, {useState} from 'react'
import { Button, Input, message } from 'antd'
import loginWhite from '../../../assets/images/logo-white.png'
import './login.styl'
import extension from 'extensionizer';
import ContractsUtils from "../../../common/utils/contractsUtils.js"
import { ArrowRightOutlined } from '@ant-design/icons'
import DfinityUtils from "../../../common/utils/dfinityUtils.js"
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

		// 前往options.html'
		extension.tabs.create({ url: 'options.html' });

		// const authClient = await AuthClient.create();
    // await authClient.login({
    //   identityProvider:"https://identity.ic0.app/#authorize",
    //   onSuccess: async () => {
    //     const identity = await authClient.getIdentity();
				
    //     console.log(identity);
    //     console.log(identity.getPrincipal())
    //     console.log(identity.getPrincipal().toString())
    //     console.log(identity.getPrincipal().isAnonymous())
    //     console.log(authClient.isAuthenticated());

    //     console.log(window.localStorage.getItem('ic-identity'));
		// 		console.log(window.localStorage.getItem('ic-delegation'));

		// 		props.history.push('/home')
    //   },
    //   onError: () => {
    //     message.error('Internet identity 登陆失败！')
    //   }
    // });
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
