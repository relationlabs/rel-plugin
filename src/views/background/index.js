/*global chrome*/
// import { apiRequest } from '@/api'

window.test = 'I am the bg window!';
window.testf = function() {
    alert(window.test);
    const views = chrome.extension.getViews({type: 'popup'});
    if (Array.isArray(views) && views.length > 0) {
        console.log(views[0], views[0].location.href);
    }
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            // 运行插件运行的页面URL规则
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({ pageUrl: {  }}),
            ],
            actions: [new window.chrome.declarativeContent.ShowPageAction()]
    }])
    })
})

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('收到来自content的消息', request, sender);
    sendResponse('ok');
})
*/


// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     // 接受来自content-script的消息，requset里不允许传递function类型的参数
//     chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//         const { contentRequest } = request
//         // 接收来自content的api请求
//         if (contentRequest === 'apiRequest') {
//             let { config } = request
//             // API请求成功的回调
//             config.success = (data) => {
//                 data.result = 'succ'
//                 sendResponse(data)
//             }
//             // API请求失败的回调
//             config.fail = (msg) => {
//                 sendResponse({
//                     result: 'fail',
//                     msg
//                 })
//             }
//             // 发起请求
//             apiRequest(config)
//         }
//     })
//     return true
// })