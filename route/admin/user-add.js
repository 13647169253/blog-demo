

// 导入User这个模块 
const { User,validateUser } = require('../../model/user');

// 导入bcryptjs模块
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next) => {
    
    try {
       await validateUser(req.body);
    } catch (e) {
        // 需要页面重定向 
        // return res.redirect(`/admin/user-edit?e=${e.message}`)
        return next(JSON.stringify({path:'/admin/user-edit',e:e.message}));
    };

    // 如果代码可以走到这里 说明表单提交过来的数据是合法的  需要对邮箱进行验证 
    const user = await User.findOne({email:req.body.email});
    // 如果邮箱地址在集合中 返回一个对象  如果没有 就返回 null
    if(user) {
      return next(JSON.stringify({path:'/admin/user-edit',e:'邮箱地址已经被注册了'}));
      // return res.redirect(`/admin/user-edit?e=邮箱地址已经被注册了`)
    };

    // 表示集合中没有这个邮箱地址  将密码进行加密 以后再将它写入到数据库 
    // 生成加密的随机字符串 
    const salt = bcrypt.genSaltSync(10);
    // 对密码进行加密  将结果再次赋值给 req.body.password
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    // 将数据写入到集合中 
    await User.create(req.body);
    // 页面就需要重定向到 用户显示页面 /admin/user
    res.redirect('/admin/user');
};