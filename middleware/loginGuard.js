module.exports = (req, res, next) => {
    // 判断请求的方式是什么  如果 get请求就进行处理 如果post就放行 
    if (req.method == 'GET') {
        // 判断用户访问的是否是登录页面
        // 判断用户的登录状态
        // 如果用户是登录的 将请求放行
        // 如果用户不是登录的 将请求重定向到登录页面
        if (req.url != '/login' && !req.session.userId) {
            res.redirect('/admin/login');
        } else {
            // 判断用户角色
            if (req.session.role == 'normal') {
                // 如果用户是登录状态且是一个普通用户那么跳转到首页,并且阻止它向下执行
                return res.redirect('/home/');
            };
            // 用户是登录状态 将请求放行
            next();
        };
    } else if (req.method == 'POST') {
        next();
    };
};