/*global chrome*/
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { AuthClient } from '@dfinity/auth-client';
import { canisterId, createActor } from '../../common/utils/declarations/relationship/index'

let relationship;
const antdConfig ={
    locale: zhCN
};

function OptionApp() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if(window.localStorage.getItem("ic-identity") == null || window.localStorage.getItem("ic-delegation") == null) {
            setIsLogin(false);
        } else {
            setIsLogin(true)
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
        console.log(authClient);
        await authClient.login({
            identityProvider:"https://identity.ic0.app/#authorize",
            onSuccess: async () => {
                setIsLogin(true);
                const identity = await authClient.getIdentity();
                console.log(identity.getPrincipal().toText());
                window.localStorage.setItem("Chain", 'DFINITY');
                window.localStorage.setItem('identity', JSON.stringify(identity))
                window.localStorage.setItem("principal", identity.getPrincipal().toText());

                await authClient.isAuthenticated().then(res => console.log(res));

                console.log(window.localStorage.getItem('ic-identity'));
                console.log(window.localStorage.getItem('ic-delegation'));
                console.log(JSON.parse(window.localStorage.getItem('identity')));

                relationship = createActor(canisterId, {
                    agentOptions: {
                        host: 'https://ic0.app',
                        identity,
                    },
                });
                relationship.createProfile('momo').then(res => 
                    console.log("icCreateIC-通过IC创建Dfinity身份: ", res)
                );

                // console.log(identity.getKeyPair());
                // console.log(identity.getKeyPair().secretKey);
                // console.log(identity.Ed25519KeyIdentity.generate().toJSON());
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
