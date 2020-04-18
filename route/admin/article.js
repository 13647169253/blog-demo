// 导入文章集合文件
const { Article } = require('../../model/article.js');
// 导入mongoose-sex-page 模块
const pagination = require('mongoose-sex-page');
// page 当前页 size 每一页显示的数据条数 diasplay 页码显示数量  exec 写在最后面用于,用于向数据库发送查询请求   
module.exports = async (req, res) => {
   let currentPage = req.query.page || 1; // 添加当前页码
   // 添加标识
   req.app.locals.currentLink = 'article';

   // 查询所有文章数据 , 多集合联合查询populate 这里需要将Article当作一个集合 
   let articles = await pagination(Article).find().page(currentPage).size(1).display(2).populate('author').exec();
   // 将这个数据显示在页面中
   // res.send(articles);

   // 渲染文章列表页面模板
   res.render('admin/article', {
      articles: articles
   });
}