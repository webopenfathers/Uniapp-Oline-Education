import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		user: null,
		token: null
	},
	actions: {
		// 初始化
		init({
			state
		}) {
			let user = uni.getStorageSync('user')
			if (user) {
				state.user = JSON.parse(user)
				state.token = state.user.token
			}
		},



		login({
			state
		}, user) {
			state.user = user
			state.token = user.token


			// 本地持久化存储
			uni.setStorageSync('user', JSON.stringify(user))
		},


		// 退出登录
		logout({
			state
		}) {
			state.user = null
			state.token = null


			uni.removeStorageSync('user')
		},


		updateInfo({
			state
		}, phone) {
			state.user.phone = phone

			// 本地持久化存储
			uni.setStorageSync('user', JSON.stringify(state.user))
		}
	}
})