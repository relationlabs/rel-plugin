const killPort = require('kill-port');

const webpackDevDerverPort = 3000;

//if all requests need be proxy, pleae use "/"
const needMockApiList = [
    '/login',
    '/register',
    '/bizError',
    '/error400',
    '/error404',
    '/error500',
    '/error503'
];

//默认杀死端口${webpackDevDerverPort}
killPort(webpackDevDerverPort);

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        host: 'localhost',
        port: webpackDevDerverPort,
        hot: true,  // 模块热替换
        // inline: true,
        compress: false,
        historyApiFallback: {
            disableDotRule: true
        },
        // stats: 'minimal',
        client: {
            logging: 'warn',
            progress: true, //显示打包的进度
        },
        // 本地mock-代理
        proxy: (() => {
            const proxyReturnObj = {};
            needMockApiList.forEach(item => {
                proxyReturnObj[item] = {
                    target: "http://localhost:3001",
                    secure: false,
                    changeOrigin: true
                };
            });
            return proxyReturnObj;
        })()
    },
};
