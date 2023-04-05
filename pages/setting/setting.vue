<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable :border="false" title="账户安全" show-arrow
				@click="authJump('/pages/user-safe/user-safe')"></uni-list-item>
			<uni-list-item :border="false" title="清除缓存">
				<text slot='footer'>1.00MB</text>
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
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		methods: {
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