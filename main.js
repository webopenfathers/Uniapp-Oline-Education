// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from '@/api/api.js'


Vue.config.productionTip = false
Vue.prototype.$api = api

import store from '@/store/index.js'
Vue.prototype.$store = store


Vue.prototype.$openWebview = function(url) {
	uni.navigateTo({
		url: '/pages/webview/webview?url=' + encodeURIComponent(url)
	})
}


Vue.prototype.$toast = function(msg) {
	uni.showToast({
		title: msg,
		icon: 'none'
	})
}

Vue.prototype.navigateTo = function(url) {
	uni.navigateTo({
		url,
	});
}

Vue.prototype.authJump = function(url) {
	// token不存在跳转登录页
	if (!store.state.token) {
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}

	//  token 存在但是手机号不存在跳转-绑定手机号
	if (!store.state.user.phone) {
		return uni.navigateTo({
			url: '/pages-user/bind-phone/bind-phone',
		});
	}

	uni.navigateTo({
		url,
	});
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif