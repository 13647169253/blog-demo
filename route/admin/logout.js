module.exports = (req, res) => {
	// 删除session 还有删除cookie　需要跳转到登录页面  
	// 删除session
	req.session.destroy(function () {
		// 删除cookie
		res.clearCookie('connect.sid');
		// 重定向到用户登录页面
		res.redirect('/admin/login');
		// 去除模板中的用户信息
		req.app.locals.userInfo = null;
	});
}