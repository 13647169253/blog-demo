// 导入 express包 
const express = require("express");
// 创建路由对象  
const home = express.Router();

// home.get('/', (req, res) => {
//     res.send("欢迎来到前台首页")
// })

home.get('/', require('./home/default'))

home.get('/article', require('./home/article'))

home.post('/comment', require('./home/comment'))

module.exports = home;