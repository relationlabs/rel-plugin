let userData01 = require('./data/userData/user01.ts');
let userData02 = require('./data/userData/user02.ts');
let userData03 = require('./data/userData/user03.ts');
let userData04 = require('./data/userData/user04.ts');

module.exports = {
    '/login': {
        method:'post',//默认post
        status:200, //默认200
        header:{},
        responseFn:param=>{
            let roleTypeMap ={
                'admin':userData01,
                'user02':userData02,
                'user03':userData03
            }
            return {
                returnCode:17000,
                returnDesc:'描述...',
                data:roleTypeMap[param.role]
            }
        }
    },
    '/login2': {
        method:'post',
        status:200,
        header:{},
        responseFn:()=>{
            return {
                returnCode:17000,
                returnDesc:'描述...',
                data: userData04,
            }
        }
    }
}

