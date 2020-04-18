// 引入mongoose模块
const mongoose = require('mongoose');

//创建集合规则
const commentSchema = new mongoose.Schema({
   // 当前评论文章对应的ID 
   aid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
   },
   // 当前评论人的ID
   uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   time: {
      type: Date
   },
   content: {
      type: String
   }
});

// 根据规则创建集合
const Comment = mongoose.model('Comment', commentSchema);

// 将集合作为模块成员进行导出
module.exports = {
   Comment
};


// 文章的评论集合规则
