// 导入用户集合
const { User } = require('../../model/user')
module.exports = async (req, res) => {
   
    // 添加标识
    req.app.locals.currentLink = 'user';
 
    // 分页  总页数||默认为第一页   当前页
    let page = req.query.page || 1;
    // 每一页显示的数据个数
    let pagesize = 4;
    // 查询用户总数
    let count = await User.countDocuments({});
    // 分得的页数
    let total = Math.ceil(count / pagesize);
    // res.send('总页数' + total);
    // 页码的开始位置
    let start = (page - 1) * pagesize;
    //   读取用户    
    const users = await User.find({}).limit(pagesize).skip(start);
    // console.log(users);
    // console.log(users.length);
    res.render("admin/user", { users: users, total: total, page: page });
    // 在user.art 中实现分页
}