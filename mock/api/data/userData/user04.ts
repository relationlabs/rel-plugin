module.exports = { 
    "userInfo": { 
        "username": "Im user04",
        "email": "root@wx.io",
        "mobile": "13612345678",
        "status": 1
    }, 
    "urlList": [
        "/biz/welcome",
    ], 
    "menuList": [
        {
            "name": "欢迎光临", 
            "url":null,
            "icon": "SmileOutlined",
            "children": [{ 
                "parentId": 59,
                "name": "欢迎页", 
                "url": "/biz/welcome", 
                "children": [], 
            }]
        }
    ],
    "permList": ["sys:user:update","sys:user:query"]
}