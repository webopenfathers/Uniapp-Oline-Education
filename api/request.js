export default {
	config:{
		// 请求拦截器
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				options.url = 'http://demonuxtapi.dishait.cn' + options.url
				options.method = options.method || 'GET'
				options.header = {
					appid: 'bd9d01ecc75dbbaaefce'
				}
				resolve(options)
			})
		}
	},


	request(options = {}) {
		return this.config.beforeRequest(options).then(opt => {
				return uni.request(opt)
			})
		}
	}