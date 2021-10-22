const chalk = require('chalk');
const ora = require('ora');
const minimist = require('minimist');
const killport = require('kill-port');
const waitOn = require('wait-on');

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const { exec } = require('child_process');

class Spinner {
    ora = null;

    constructor(text) {
        this.ora = ora({
            text,
            prefixText: chalk.gray("[IC-Contact]"),
        });
        return this.ora;
    }
}

class CmdParse {
    command = '';
    
    options = {};

    spinner = null;

    webpackConfig = {};

    constructor(cmdStr) {
        const args = minimist(cmdStr.slice(2), {
            boolean: true,
        });

        const _ = args._;
        this.command = _[0];
        delete args._;
        this.options = {...args};
    }

    run() {
        this.spinner = new Spinner();
        this.spinner.start('开始编译...\n');
        switch (this.command) {
            case 'dev':
                this.spinner.text = '正在启动项目...\n';
                this.RunDevServer();
                break;
            case 'build':
                this.spinner.text = '正在构建打包项目...\n';
                this.RunBuild();
                break;
            default:
                break;
        }
    }

    // 启动mock服务
    RunMockServer() {
        this.spinner.text = '正在启动mock服务...\n';
        const mockPort = 7182; // mock服务的port固定为7182
        const mockUrl = `http://localhost:${mockPort}`;
        const spinner = new Spinner();
        exec('node ./mock/index.ts');
        waitOn({
            resources: [mockUrl],
            timeout: 30000,
        }).then(() => {
            spinner.succeed('mock服务已启动!\n');
        }).catch(err => {
            spinner.fail(`mock服务启动失败! error: ${err}\n`);
        });
    }

    // 基础环境
    Base(mode) {
        const { mock = false } = this.options;

        // 如果mock为true，则启动mock服务
        if (mock && mode !== 'prod') this.RunMockServer();

        process.env.MOCK = mock ? '1' : '0';
        process.env.NODE_ENV = mode;
        this.webpackConfig = require('./build/webpack.config.js');
    }

    // 生产环境构建
    RunBuild() {
        this.Base('prod');
        this.spinner.info('开始构建生产环境的代码\n');
        const compiler = webpack(this.webpackConfig);
        compiler.run((err, stats) => {
            if (err || stats.hasErrors()) {
                this.spinner.fail(`代码打包出错 ${err ? err : stats.toString('errors-only')}`);
                return;
            }
            this.spinner.succeed('代码打包完成');
            console.log(chalk.green('编译完成！'));
        });
    }

    // 启动webpack-dev-server
    RunDevServer() {
        this.Base('dev');
        let { devServer: devServerOptions = {} } = this.webpackConfig || {};
        const { port = 3000 } = devServerOptions || {};
        this.spinner.info('开始构建开发环境的代码并启动devServer\n');
        // kill 上一次的端口占用
        killport(port).then(res => {
            const compiler = webpack(this.webpackConfig);
            devServerOptions = { ...devServerOptions, open: true };
            const devServer = new webpackDevServer(devServerOptions, compiler);
            
            devServer.listen(port, 'localhost', err => {
                if (err) {
                    this.spinner.fail(`开发环境构建代码失败, error: ${err}`);
                }
            });

            // 等待代码构建成功，并且devServer已启动成功
            const localUrl = `http://localhost:${port}`;
            waitOn({
                resources: [localUrl],
                timeout: 300000, //等待超时时间
            }).then(() => {
                this.spinner.succeed(`本地开发服务器启动成功: ${chalk.underline.blueBright(localUrl)}`)
            }).catch(err => {
                console.log(`本地开发服务器启动失败, error: ${err}`);
                this.spinner.fail(`本地开发服务器启动失败, error: ${err}`);
            });
        });
    }
}

const mainProcess = new CmdParse(process.argv);
mainProcess.run();