import api from './request.js'
export default {
	// 获取首页数据
	getIndexData() {
		return api.get('/mobile/index')
	},

	// 获取可用秒杀列表
	getFlashSale(params = {}) {
		return api.get('/mobile/flashsale', params)
	},

	// 获取可用get拼团列表
	getGroup(params = {}) {
		return api.get('/mobile/group', params)
	},

	// 注册账号
	reg(data) {
		return api.post('/mobile/reg', data)
	},


	// 账号登录
	login(data) {
		return api.post('/mobile/login', data)
	},

	// 获取手机验证码
	getCaptcha(data) {
		return api.post('/mobile/get_captcha', data)
	},

	// 绑定手机号
	bindMobile(data) {
		return api.post('/mobile/bind_mobile', data)
	},

	// 找回密码
	forget(data) {
		return api.post('/mobile/forget', data)
	},

	// 退出登录
	logout() {
		return api.post('/mobile/logout')
	},

	// 修改密码
	updatePassword(data) {
		return api.post('/mobile/update_password', data)
	},

	// 上传图片
	upload(filePath, onProgress = null) {
		return api.upload('/mobile/upload', {
			filePath
		}, {
			onProgress
		})
	},
	// 修改资料
	updateInfo(data) {
		return api.post('/mobile/update_info', data)
	},

	// 获取订单列表
	getOrderList(params) {
		return api.get('/mobile/order/list', params)
	},

	// 获取优惠券列表
	getCoupon(params = {}) {
		return api.get('/mobile/coupon', params)
	},

	// 领取优惠券
	receiveCoupon(data) {
		return api.post('/mobile/user_coupon/receive', data)
	},

	// 我的优惠券列表
	getUserCoupon(params) {
		return api.get('/mobile/user_coupon', params)
	},

	// 搜索结果页
	search(params) {
		return api.get('/mobile/search', params)
	},

	// 查看课程详情
	readCourse(params) {
		return api.get('/mobile/course/read', params)
	},

	// 获取专栏详情页
	readColumn(params) {
		return api.get('/mobile/column/read', params)
	},
	// 学习进度列表
	getUserHistory(params) {
		return api.get('/mobile/user_history/list', params)
	},

	// 更新学习进度
	updateUserHistory(data) {
		return api.post('/mobile/user_history/update', data)
	},

	// 考场列表
	getTestList(params) {
		return api.get('/mobile/testpaper/list', params)
	},

	// 开始考试
	readTestPaper(params) {
		return api.get('/mobile/testpaper/read', params)
	},

	// 考试交卷
	submitTest(data) {
		return api.post('/mobile/user_test/save', data)
	},

	// 我的考试记录
	getMyTestList(params) {
		return api.get('/mobile/user_test/list', params)
	},

	// 社区列表
	getBbsList(params) {
		return api.get('/mobile/bbs', params)
	},

	// 帖子列表
	getPostList(params) {
		return api.get('/mobile/post/list', params)
	},

	// 点赞帖子
	supportPost(data) {
		return api.post('/mobile/post/support', data)
	},

	// 取消点赞帖子
	unSupportPost(data) {
		return api.post('/mobile/post/unsupport', data)
	},

	// 发布帖子
	addPost(data) {
		return api.post('/mobile/post/save', data)
	},

	// 查看帖子
	readPost(params) {
		return api.get('/mobile/post/read', params)
	},

	// 查看帖子评论
	getPostComments(params) {
		return api.get('/mobile/post_comment', params)
	},

	// 发送评论
	replyPost(data) {
		return api.post('/mobile/post/reply', data)
	},

	// 我的帖子列表
	getMyPost(params) {
		return api.get('/mobile/mypost', params)
	},

	// 删除我的帖子
	deletePost(data) {
		return api.post('/mobile/post/delete', data)
	},

	// 电子书列表
	getBookList(params) {
		return api.get('/mobile/book/list', params)
	},

	// 查看电子书详情
	readBook(params) {
		return api.get('/mobile/book/read', params)
	}
}