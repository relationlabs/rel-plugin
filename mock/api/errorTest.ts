let errorList = ['/error400','/error404','/error500','/error503'];

let errorObj = (()=>{
    let _errorObj = {};
    errorList.forEach(item=>{
        _errorObj[item] = {
            method:'post',
            header:{},
            status:Number(item.slice(-3)), 
            responseFn:param=>{
                return null
            }
        };
    })
    return _errorObj;
})()

module.exports = {
    ...errorObj,
    './biz301':{
        status:301, 
        responseFn:param=>{
            return {
                returnCode:17000,
                returnDesc:null,
                data:{
                    result:'Yes,you get the right result!'
                }
            }
        }
    },
    '/bizError':{
        status:200, //默认200
        responseFn:param=>{
            let {returnCode,noDescription} = param;
            return {
                returnCode:returnCode||17011,
                returnDesc:noDescription?null:'数据库被删了，您暂时不能提交数据！',
                data:{
                    result:'nothing to say!'
                }
            }
        }
    }
}

