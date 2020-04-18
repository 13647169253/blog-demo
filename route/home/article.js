// 导入文章集合
const { Article } = require('../../model/article');
// 导入文章评论集合
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
   // 文章查询
   const article = await Article.findOne({ _id: req.query.id }).populate('author')
   // 评论查询
   const comments = await Comment.find({ aid: req.query.id }).populate('uid')
   // res.send(comment);
   // console.log(article);
   // res.send(article);
   res.render('home/article', {
      article: article,
      comments: comments
   })
}