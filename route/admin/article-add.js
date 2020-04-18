module.exports = (req, res) => {
   // 添加标识
   req.app.locals.currentLink = 'article';
   // 渲染对应页面
   res.render('admin/article-edit');

}