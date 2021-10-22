module.exports = { 
    "userInfo": { 
        "username": "管理员",
        "email": "root@wx.io",
        "mobile": "13612345678",
        "status": 1
    }, 
    "urlList": [
        "/biz/welcome", 
        "/biz/personalCenter", 
        "/biz/mobxExample"
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
        },
        {
            "name": "个人中心",
            "icon": "UserOutlined",
            "url":null,
            "children": [{ 
                "parentId": 59,
                "name": "个人中心", 
                "url": "/biz/personalCenter", 
                "children": [], 
            }]
        },
        {
            "name": "mobx示例",
            "icon": "CodeOutlined",
            "url": "/biz/mobxExample", 
            "children": [], 
        }
    ],
    "permList": ["sys:user:add","sys:user:delete","sys:user:update","sys:user:query"]
}