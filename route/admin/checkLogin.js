// 引入 bcryptjs模块
const bcrypt = require('bcryptjs');

// 导入user.js文件
const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 获取表单的提交过来的数据  对象解构 
    const { email, password } = req.body;
    // 判断邮箱和密码是否填写 
    if (email.trim().length === 0 || password.trim().length === 0) return res.render('admin/error', { msg: '邮箱或者密码输入不正确' })
    // 如   应的数据  如果有 就表示 有这个邮箱 接下来就需要校验密码是否正确  
    // 如果有这个邮箱就返回一个对象  如果没有 就返回空的 
    let user = await User.findOne({ email: email });

    // 根据返回值来进行判断 邮箱是否输入正确了 
    if (user) {
        // 表示邮箱地址输入正确 我们需要去比对密码   
        let isVidate = bcrypt.compareSync(password, user.password);
        //    console.log(isVidate)
        if (isVidate) {
            // 将 id 保存到session中 然后给到浏览器端  
            req.session.userId = user._id;
            // 将用户角色存在session中
            req.session.role = user.role;
            // 将user这个对象保存到app.locals这个对象中  locals中的数据所有的模板文件都可以访问到
            req.app.locals.userInfo = user;
            // 页面重定向 
            if (user.role == 'admin') {
                // 后台
                res.redirect('/admin/user')
            } else {
                // 前台
                res.redirect('/home/')
            }

        } else {
            // 密码错误  
            // 表示邮箱地址输入错误  
            res.status(400).render('admin/error', { msg: '邮箱或者密码输入不正确' })
        }
    } else {
        // 表示邮箱地址输入错误  
        res.status(400).render('admin/error', { msg: '邮箱或者密码输入不正确' })
    }

}