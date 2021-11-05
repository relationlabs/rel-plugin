/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const antdConfig ={
    locale: zhCN
};

const OptionApp = () => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <h1>Options Page</h1>
            <Button type="primary">
                BUTTON
            </Button>
        </div>
    )
};

ReactDOM.render(<ConfigProvider {...antdConfig}>
    <App />
</ConfigProvider>, document.getElementById('options-root'));
