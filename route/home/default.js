// 导入文章构造集合,并结构.
const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {

   // 
   const currentPage = req.query.page || 1;
   // 获取文章集合信息
   let result = await pagination(Article).page(currentPage).size(2).display(2).find().populate('author').exec();
   // res.send(result);
   // return
   // 渲染模板并传递数据
   res.render('home/default', {
      result: result
   });
};