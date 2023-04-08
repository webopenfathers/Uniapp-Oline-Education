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


		// 登录
		login({
			state
		}, user) {
			state.user = user
			state.token = user.token


			// 本地持久化存储
			uni.setStorageSync('user', JSON.stringify(user))
			uni.$emit('userLogin', user)
		},


		// 退出登录
		logout({
			state
		}) {
			state.user = null
			state.token = null


			uni.removeStorageSync('user')
			uni.removeStorageSync('historyKeyword')
			uni.$emit('userLogout')
		},


		updateInfo({
			state
		}, data) {
			Object.keys(data).forEach(k => state.user[k] = data[k])
			// 本地持久化存储
			uni.setStorageSync('user', JSON.stringify(state.user))
		}
	}
})