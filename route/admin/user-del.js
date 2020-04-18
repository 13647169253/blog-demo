// 导入
const { User } = require('../../model/user');

module.exports = async (req, res) => {
   
   //获取提交的数据
   let { id } = req.body;
   // console.log(id);
   await User.findOneAndDelete({ _id: id });
   res.redirect('/admin/user');
}