let curConf;
const env = process.env.NODE_ENV;
const baseConf = require('./scripts/base');
const { merge: webpackMerge } = require('webpack-merge');

if (env === 'prod') {
    console.log('apply prod configs');
    curConf = require('./scripts/prod');
} else if (env === 'dev') {
    console.log('apply dev configs');
    curConf = require('./scripts/dev');
}

curConf = webpackMerge(baseConf, curConf);

module.exports = curConf;