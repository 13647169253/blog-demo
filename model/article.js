// 引入mongoose模块
const mongoose = require('mongoose');

//创建文章集合规则
const articleSchema = new mongoose.Schema({
   title: {
      type: String,
      minlength: 2,
      maxlength: 50,
      // 第二个参数为错误信息,为数据插入数据库之前进行一个判断.
      require: [true, '请添写文章标题']
   },
   author: {
      // 这是一个数据库中一个独有的数据类型
      type: mongoose.Schema.Types.ObjectId,
      // 作者的填写项实际是User集合中的一个用户,这里需要将文章集合与用户集合进行关联
      ref: 'User',
      require: [true, '请添写发布作者'],
   },
   publishDate: {
      type: Date,
      default: Date.now
   },
   cover: {
      type: String,
      default: null
   },
   content: {
      type: String,
   }
});

// 根据规则创建集合
const Article = mongoose.model('Article', articleSchema);

// 讲集合作为模块成员进行导出
module.exports = {
   Article
};

