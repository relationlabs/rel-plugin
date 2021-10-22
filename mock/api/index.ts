let returnData = {
    returnCode:17000,
    returnDesc:'描述...',
    data:{}
}

const errorTest = require('./errorTest.ts');
const login = require('./login.ts');

module.exports = {
    ...errorTest,
    ...login,
    '/register':{
        responseFn:param=>{
            return {
                ...returnData,
                data:{
                    
                }
            }
        }
    },
    '/testGet':{
        method:'get',
        responseFn:param=>{
            return {
                ...returnData,
                data:{
                    ...param
                }
            }
        }
    },
    '/testPost':{
        method:'get',
        responseFn:param=>{
            return {
                ...returnData,
                data:{
                    ...param
                }
            }
        }
    }
}


