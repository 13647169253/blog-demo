// 导入 model/user.js 
const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 添加标识
    req.app.locals.currentLink = 'user';
    // 获取地址栏中ID参数
    // 获取get提交过来的数据  
    const { e, id, page } = req.query;
    // console.log(id, page)
    // 在修改时才会获取到id 进行判断
    if (id) {
        // 获取到编辑的用户
        const user = await User.findOne({ _id: id })
        // console.log(user); 
        // 渲染 修改
        res.render('admin/user-edit', {
            e: e,
            user: user,
            link: `/admin/user-modify?id=${id}&page=${page}`,
            button: '编辑'
        })
    } else {
        // 渲染 添加用户的页面 
        res.render('admin/user-edit', {
            e: e,
            link: '/admin/user-edit',
            button: '添加'
        })
    }


}