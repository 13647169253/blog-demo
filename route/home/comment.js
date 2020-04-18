// 导入评论集合
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
   // 接收客户端传递的请求参数
   const { content, aid, uid } = req.body;
   // 将评论信息存储到评论集合中
   await Comment.create({
      content: content,
      aid: aid,
      uid: uid,
      time: new Date()
   });

   res.redirect('/home/article?id=' + aid);
};