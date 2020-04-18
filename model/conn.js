// 连接数据库 
// 导入mongoose模块 
const mongoose = require('mongoose');
// 导入 config 
const config = require('config');


// mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.passwrod')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("数据库连接成功");
//     }).catch(err => {
//         console.log("数据库连接失败");
//     })


mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("数据库连接成功");
    }).catch(err => {
        console.log("数据库连接失败");
    })