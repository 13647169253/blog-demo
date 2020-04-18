// 导入 express包
const express = require("express");

// 创建路由对象
const admin = express.Router();

// admin.get("/index", (req, res) => {
//     // console.log('');
//     res.send("欢迎来到网站的后台首页");
// });

admin.get("/login", require('./admin/loginPage'));

// admin.get("/article-edit", (req, res) => {
//     // console.log('');
//     res.render("admin/article-edit", {});
// });

// 登录验证 
admin.post('/login', require('./admin/checkLogin'))

// 显示用户列表
admin.get("/user", require('./admin/user'));

// 退出路由 
admin.get('/logout', require('./admin/logout'))

// 显示添加用户的页面 路由 
admin.get('/user-edit', require('./admin/user-edit'))

// 完成添加用户的路由
admin.post('/user-edit', require('./admin/user-add'))

// 创建修改需要使用的路由 , 在route中创建对应处理文件
admin.post('/user-modify', require('./admin/user-modify'))

// 删除功能的路由
admin.post('/user-del', require('./admin/user-del'))

// 文章列表页面路由 
admin.get('/article', require('./admin/article'))

// 文章编辑页面显示路由
admin.get('/article-add', require('./admin/article-add'))

// 文章添加的路由
admin.post('/article-add', require('./admin/articleAdd'))


// 导出admin
module.exports = admin;
