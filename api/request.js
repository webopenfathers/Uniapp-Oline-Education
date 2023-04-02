export default {
	config: {
		baseURL: 'http://demonuxtapi.dishait.cn',
		appid: 'bd9d01ecc75dbbaaefce',
		// 请求拦截器
		beforeRequest(options = {}) {
			return new Promise((resolve, reject) => {
				// 公共参数处理
				options.url = this.baseURL + options.url
				options.method = options.method || 'GET'
				options.header = {
					appid: this.appid
				}

				// 权限相关验证


				resolve(options)
			})
		},

		// 响应拦截器
		handleResponse([error, res]) {
			return new Promise((resolve, reject) => {
				// 错误提示处理
				if (res.statusCode != 200 || res.data.msg === 'fail') {
					let msg = res.data.data || '请求失败'
					uni.showToast({
						title: msg,
						icon: 'none'
					})
					return reject(msg)
				}
				resolve(res.data.data)
			})
		}
	},


	request(options = {}) {
		return this.config.beforeRequest(options).then(opt => {
			return uni.request(opt)
		}).then(this.config.handleResponse)
	},

	/*
	{
		a:1,
		b:2,
		c:3
	}
	/mobile/index?a=1&b=2&c=3
	*/
	// GET请求
	get(url, params = null, options = {}) {
		options.url = url
		options.url += params ? '?' + Object.keys(params).map(key => key + "=" + params[key]).join('&') : ''
		options.method = 'GET'
		return this.request(options)
	},


	// POST请求
	post(url, data = {}, options = {}) {
		options.url = url
		options.method = 'POST'
		options.data = data
		return this.request(options)
	}
}