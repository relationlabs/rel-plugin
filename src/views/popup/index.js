import React from 'react'
import './popup.styl'
import Login from './login'
import Home from './home'
import EthAccount from './home/children/ethAccount/index'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Chain } from '../../common/constant/index'

function Popup() {
    console.log('ic-delegation:' + window.localStorage.getItem('ic-delegation'));
    console.log('Chain:' + Chain);
    return (
        <HashRouter>
            <Switch>
                <Route key="/login" path="/login" component={Login} />
                <Route path="/home" path="/home" component={Home} />
                <Route path="/ethAccount" path="/ethAccount" component={EthAccount} />
                {
                    Chain == 'ETH' && window.localStorage.getItem('wallet')  
                        ? <Redirect to="/home"/>
                        : <Redirect to="/login"/>
                }
                {
                    Chain == 'DFINITY' && window.localStorage.getItem('ic-delegation') != null
                        ? <Redirect to="/home"/>
                        : <Redirect to="/login"/>
                }
            </Switch>
        </HashRouter>
    )
}

export default Popup