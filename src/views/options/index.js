/*global chrome*/
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { AuthClient } from '@dfinity/auth-client';

const antdConfig ={
    locale: zhCN
};

function OptionApp() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        console.log(window.localStorage.getItem("ic-identity") == null)
        console.log(window.localStorage.getItem("ic-delegation") == null)
        if(window.localStorage.getItem("ic-identity") != null && !!window.localStorage.getItem("ic-delegation") != null) {
            setIsLogin(true);
        } else {
            setIsLogin(false)
        }
    }, [])

    const optionsStyle = {
        margin:'0px',
        height: '100vh', 
        width: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: 'linear-gradient(to right bottom, #29acde, #f67d2e, #902282)',
    }
    
    const handleLogin = async () => {
        const authClient = await AuthClient.create();
        await authClient.login({
            identityProvider:"https://identity.ic0.app/#authorize",
            onSuccess: async () => {
                const identity = await authClient.getIdentity();
                window.localStorage.setItem("Chain", 'DFINITY');
                window.localStorage.setItem("principal", identity.getPrincipal().toString());
                setIsLogin(true);

                console.log(identity);
                console.log(identity.getPrincipal())
                console.log(identity.getPrincipal().toString())
                console.log(identity.getPrincipal().isAnonymous())
                console.log(authClient.isAuthenticated());
                console.log(window.localStorage.getItem('ic-identity'));
                console.log(window.localStorage.getItem('ic-delegation'));
            },
            onError: () => {
                setIsLogin(false);
                message.error('Internet identity 登陆失败！')
            }
        });
    };

    return (
        <div style={optionsStyle}>
            { !isLogin && 
                <div class="container">
                    <h1>Internet Identity Client</h1>
                    <h2>You are not authenticated</h2>
                    <p>To log in, click this button!</p>
                    <Button className="loginButton" style={{borderRadius: '20px'}} size="large" onClick={handleLogin}>
                        Login DFINITY
                    </Button>
                </div>
            }
            { isLogin && 
                <div class="container">
                    <h1>Internet Identity Client</h1>
                    <h2>You are authenticated</h2>
                    <p>Now you can start using the plugin!</p>
                </div>
            }
        </div>
    )
};

ReactDOM.render(<ConfigProvider {...antdConfig}>
    <OptionApp />
</ConfigProvider>, document.getElementById('options-root'));
