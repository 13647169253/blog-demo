// 导入 express包
const express = require("express");
// 导入 path模块 
const path = require('path');
// 导入 body-parser包 
const bodyPaser = require('body-parser');
// 导入 express-session这个模块 
const session = require('express-session');
// 导入 dateformat 时间处理模块
const dateFormat = require('dateformat');
// 导入 art - template
const template = require('art-template');
// 导入 morgan 模块
const morgan = require('morgan');
// 导入config模块
const config = require('config');

// 创建服务器
const app = express();

// 导入 model下面的conn.js文件 
require('./model/conn')

// require('./model/user')
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));

app.use(session({
    secret: '我也不知道写什么',
    saveUninitialized: false,
}))

// 静态资源托管 
app.use(express.static(path.join(__dirname, 'public')));

// 使用get方法获取到 , config会对运行环境自动判断并获取对应配置信息.
console.log(config.get('title'));

// 获取系统环境变量 返回值是一个对象
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    // 开发模式
    console.log('开发环境')
    // 在开发环境中的 客户端发送到服务器端的请求信息打印在控制台中
    app.use(morgan('dev'));
} else {
    // 生产环境
    console.log('生产环境');

};

// 配置模板引擎 
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

//  在模板内部导入时间处理模板 dataformat变量   
template.defaults.imports.dateFormat = dateFormat;

// 导入我们写的路由文件
const home = require("./route/home");
const admin = require("./route/admin");

// 在这里去实现登录拦截的功能  app.use 不会是get请求 和 post请求都会进行拦截 
app.use('/admin', require('./middleware/loginGuard'))


app.use("/home", home);
app.use("/admin", admin);

// 定义错误处理中间件 
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    // 需要对这个错误处理的中间件进行改造 , 
    let arr = [];
    for (let key in result) {
        // key 为键 
        if (key != 'path') {
            arr.push(key + '=' + result[key]);
        };
    };
    // console.log(arr.join('&'));
    res.redirect(`${result.path}?${arr.join('&')}`);
})

// 监听端口号
app.listen(80, (req, res) => {
    console.log("http://localhost");
});
