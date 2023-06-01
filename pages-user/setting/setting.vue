<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable :border="false" title="账户安全" show-arrow
				@click="authJump('/pages-user/user-safe/user-safe')"></uni-list-item>
			<uni-list-item clickable :border="false" title="清除缓存" @click="clear">
				<text slot='footer'>{{currentSize | formatCurrentSize}}</text>
			</uni-list-item>
			<uni-list-item :border="false" title="检查更新" show-arrow></uni-list-item>
			<uni-list-item :border="false" title="当前版本">
				<text slot='footer'>1.0.0</text>
			</uni-list-item>
		</uni-list>

		<!-- 退出登录按钮 -->
		<view class="p-3" v-if="user">
			<main-button @click='handleLogout'>退出登录</main-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import tool from '@/common/tool.js'
	export default {
		data() {
			return {
				// 获取本地缓存大小
				currentSize: 0,
				// 清楚缓存但不清除状态---去掉key值
				keys: []
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		filters: {
			formatCurrentSize(value) {
				return tool.bytesToSize(value)
			}
		},
		created() {
			this.getSize()
		},
		methods: {
			getSize() {
				// 获取缓存数据
				uni.getStorageInfo({
					success: (res) => {
						this.keys = res.keys.filter(k => k !== 'user')
						this.currentSize = res.currentSize
					}
				})
			},
			clear() {
				uni.showModal({
					content: '是否要清除缓存?',
					success: (res) => {
						if (res.cancel) {
							return
						}

						this.keys.forEach(k => {
							uni.removeStorageSync(k)
						})

						this.$toast('清除成功')
						this.getSize()
					}
				});

			},
			handleLogout() {
				uni.showModal({
					content: '是否要退出登录',
					success: (res) => {
						if (res.cancel) {
							return
						}
						this.$api.logout()
						this.$store.dispatch('logout').then(res => {
							this.$toast('退出登录成功')
						})
					}
				});

			}
		}
	}
</script>

<style>

</style>