const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');
// 修改处理文件
module.exports = async (req, res, next) => {
   // res.send('ok');
   // 获取get方式提交的数据
   const { id, page } = req.query;
   // 根据ID查询集合中的用户的信息,来实现用户比对
   const user = await User.findOne({ _id: id })
   // console.log(user);
   // 密码比对 需要导入第三方模块, compareSunc 同步使用    compare 异步
   let isVidate = bcrypt.compareSync(req.body.password, user.password);
   // console.log(isVidate);
   if (isVidate) {
      // 正确 数据写入集合中 updateone
      await User.updateOne({ _id: id }, {
         // 因为这里不能将密码更改所以需要指定
         username: req.body.username,
         email: req.body.email,
         role: req.body.role,
         state: req.state,
      });
      // 修改完成后进行页面的重定向 , 将页面定向为用户在的分页中.
      res.redirect(`/admin/user?page=${page}`);
   } else {
      // 失败 给错误处理的中间件进行处理
      let obj = {
         path: '/admin/user-edit',
         e: '密码填写错误,请填写正确的密码',
         id: id,
         page: page
      }
      // 将结果传递给
      next(JSON.stringify(obj));
   }
   // res.send(req.body);
};