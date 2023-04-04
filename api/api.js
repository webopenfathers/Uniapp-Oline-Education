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
	}

}