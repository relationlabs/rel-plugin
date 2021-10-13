import React, {useState} from 'react'
import { Button, Input } from 'antd'
import loginWhite from './logo-black.png'
import './login.styl'
import ContractsUtils from "../../../utils/contractsUtils.js"

function Login(props) {
	const [privateKey, setPrivateKey] = useState('');

	const importAccount = () => {
		try {
			let wallet = ContractsUtils.getPrivateKeyWallet(privateKey);
			window.localStorage.setItem("wallet", JSON.stringify(privateKey))
			props.history.push('/home')
		} catch (err) {
			console.log(err);
			alert('私钥格式有误')
		}
	}

	const keyChange = (e) => {
		setPrivateKey(e.target.value)
	}

	return (
		<div className="layout-login">
			<img src={loginWhite} alt="" className="carrot" />
			<div className="login-con">
				<div className="ipt-con">
					<Input
						size="large"
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
