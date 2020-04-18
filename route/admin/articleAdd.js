// 导入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
// 导入文章集合模块
const { Article } = require('../../model/article.js');
module.exports = (req, res) => {
   // res.send('ok');
   // 创建表单解析对象
   const form = new formidable.IncomingForm();
   // 配置上传问价的存放位置
   form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
   // 保留上传文件的后缀
   form.keepExtensions = true;
   // 解析表单
   form.parse(req, async (err, fields, files) => {
      // 表单数据来自客户端req , (err错误信息在表单解析失败时,fields一个对象存储普通表单内的值,files同对象类型它存储上传文件类型相关数据.)
      // res.send(files.cover.path.split('public')[1]);  
      //  在文章集合中插入数据
      await Article.create({
         title: fields.title,
         author: fields.author,
         publishDate: fields.publishDate,
         cover: files.cover.path.split('public')[1],
         content: fields.content
      });
      res.redirect('/admin/article');
   })
};