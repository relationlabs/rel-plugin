/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { AuthClient } from '@dfinity/auth-client';

const antdConfig ={
    locale: zhCN
};

const optionsStyle = {
    height: '100vh', 
    width: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right bottom, #29acde, #f67d2e, #902282)',
}

const handleLogin = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
        identityProvider:"https://identity.ic0.app/#authorize",
        onSuccess: async () => {
            const identity = await authClient.getIdentity();
                    
            console.log(identity);
            console.log(identity.getPrincipal())
            console.log(identity.getPrincipal().toString())
            console.log(identity.getPrincipal().isAnonymous())
            console.log(authClient.isAuthenticated());
            console.log(window.localStorage.getItem('ic-identity'));
            console.log(window.localStorage.getItem('ic-delegation'));
        },
        onError: () => {
            message.error('Internet identity 登陆失败！')
        }
    });
};

const OptionApp = () => {
    return (
        <div style={optionsStyle}>
            <div class="container">
                <h1>Internet Identity Client</h1>
                <h2>You are not authenticated</h2>
                <p>To log in, click this button!</p>
                <button type="button" id="loginButton" onClick={handleLogin}>
                    Log in
                </button>
            </div>
        </div>
    )
};

ReactDOM.render(<ConfigProvider {...antdConfig}>
    <OptionApp />
</ConfigProvider>, document.getElementById('options-root'));
