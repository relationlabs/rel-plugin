import React, {useState} from 'react'
import { Button, Input, message } from 'antd'
import loginWhite from './logo-black.png'
import './login.styl'
import ContractsUtils from "../../../utils/contractsUtils.js"

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


	return (
		<div className="layout-login">
			<img src={loginWhite} alt="" className="carrot" />
			<div className="login-con">
				<div className="ipt-con">
					<Input.Password
						size="large"
						visibilityToggle={false}
						onChange={keyChange.bind(this)}
						placeholder="请粘贴您的私钥导入账户"
					/>
				</div>
				<Button type="primary" size="large" onClick={importAccount}>导入</Button>
			</div>
		</div>
	);
}

export default Login
