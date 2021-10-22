const express = require('express')
const app = express()
const port = 7182;
const killPort = require('kill-port');
const bodyParser = require('body-parser');
const apiObj = require('./api/index.ts');

// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false }))    

// parse application/json  
app.use(bodyParser.json());

const handleRequest = (res,item,param)=>{
    let {responseFn,status} = item;
    let responseData = responseFn(param);
    res.status(status||200).send(responseData);
}

const appRoute = ()=>{
    //执行路由
    for(let path in apiObj){
        let item = apiObj[path];
        let method = item.method||'post';
        if(method === 'post'){
            app.post(path,(req,res)=>{
                console.log(`post---req.url= ${req.url}`);
                handleRequest(res,item,req.body);
            })
        }else if(method ==='get'){
            app.get(path, (req, res) => {
                console.log(`get---req.url= ${req.url}`);
                handleRequest(res,item,req.query);
            })
        }
    }
}


appRoute();

app.get('/', (req, res) => {
    res.send('Hello World! your mock server is running!-- GET');
})

app.post('/',(req,res)=>{
    res.send('Hello World! your mock server is running!--POST');
})

//确保端口不被占用
killPort(port, 'tcp').then(()=>{
    app.listen(port, () => {
        console.log(`Mock server is running at http://localhost:${port}`)
    })
}).catch(e=>{
    console.log(e);
});
