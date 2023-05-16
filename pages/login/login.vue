<template>
	<view>
		<!-- 按钮 -->
		<view class="login-back" @click="back">
			<uni-icons type="arrowleft" size="20" color="#FFF"></uni-icons>
		</view>
		<!-- 顶部颜色 -->
		<view class="login-bg"></view>
		<!--  -->
		<view class="login">
			<!-- title -->
			<view class="flex">
				<text class="title">{{type==='login'?'登录':'注册'}}</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input v-model="form.username" type="text" placeholder="请输入用户名" class="rounded font-md" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input v-model="form.password" type="text" placeholder="请输入密码" class="rounded font-md" />
			</view>
			<view class="login-form" v-if="type==='reg'">
				<uni-icons type="locked"></uni-icons>
				<input v-model="form.repassword" type="text" placeholder="请输入确认密码" class="rounded font-md" />
			</view>
			<!-- 登录按钮 -->
			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">
				{{type==='login'?'登录':'注册'}}
			</view>
			<!-- 注册  忘记密码 -->
			<view class="flex align-center justify-between my-3 font">
				<text class="py-3 text-main" @click="changeType">{{type==='login'?'注册账号':'去登录'}}</text>
				<text class="py-3 text-light-muted" @click="openForget">忘记密码?</text>
			</view>
			<!-- 微信登录图标 -->
			<view class="flex align-center justify-center wechatlogin">
				<uni-icons type="weixin" size="25" color="#5ccc84" @click="wxLogin"></uni-icons>
			</view>
			<!-- 同意协议 -->
			<checkbox-group v-if="type==='login'" @change='handleCheckboxChange'
				class="flex align-center justify-center mt-4">
				<label class="text-light-muted">
					<checkbox value='1' color="#7fd49e" style="transform: scale(0.7);" /><text
						class="font">已阅读并同意用户协议&隐私声明</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		data() {
			return {
				confirm: false,
				type: 'login',
				form: {
					username: '',
					password: '',
					repassword: ''
				}
			}
		},
		onLoad() {
			// #ifndef H5
			this.handleH5WxLogin()
			// #endif
		},
		methods: {
			// 微信H5端登录
			handleH5WxLogin() {
				let code = tool.getUrlCode('code')
				if (!code) return

				uni.showLoading({
					title: '登录中...',
					mask: false
				})


				// 微信H5登录功能实现
				this.$api.wxLogin({
					type: 'h5',
					code
				}).then(user => {
					this.handleLoginSuccess(user)
				}).finally(() => {
					uni.hideLoading()
				})
			},
			wxLogin() {
				if (!this.beforeLogin()) return


				// #ifdef H5
				tool.getH5Code()
				// #endif

				// #ifdef APP-PLUS
				this.appWxLogin()
				// #endif
			},
			appWxLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						let {
							access_token,
							openid
						} = res.authResult

						uni.showLoading({
							title: '登录中...',
							mask: false
						})

						this.$api.wxLogin({
							type: 'app',
							access_token,
							openid
						}).then(user => {
							this.handleLoginSuccess(user)
						}).finally(() => {
							uni.hideLoading()
						})
					}
				})
			},
			openForget() {
				uni.navigateTo({
					url: '../forget/forget',
				});
			},
			handleCheckboxChange(e) {
				this.confirm = !!e.detail.value.length
			},

			back() {
				// 返回上一级
				uni.navigateBack({
					delta: 1
				})
			},
			changeType() {
				this.type = this.type === 'login' ? 'reg' : "login"
			},
			resetForm() {
				this.form = {
					username: '',
					password: '',
					repassword: ''
				}
			},
			beforeLogin() {
				if (!this.confirm && this.type === 'login') {
					return this.$toast('请先阅读并同意用户协议&隐私声明')
					return false
				}

				return true
			},
			handleLoginSuccess(user) {
				this.$toast('登录成功')
				this.$store.dispatch('login', user)
				if (!user.phone) {
					uni.redirectTo({
						url: '/pages/bind-phone/bind-phone',
					});
					return
				}
				setTimeout(() => {

					// 是H5端
					// #ifdef H5
					uni.switchTab({
						url: '/pages//tabbar/home/home'
					})
					// #endif

					// 不是H5端
					// #ifndef H5
					this.back()
					// #endif

				}, 350)
			},
			submit() {

				if (!this.beforeLogin()) return

				uni.showLoading({
					title: `${this.type==='login'?'登录中':'提交中'}...`,
					mask: false
				})
				let data = Object.assign(this.form, {})


				this.$api[this.type](data).then(user => {
					if (this.type === 'reg') {
						this.$toast('注册成功')
						this.resetForm()
						this.changeType()
					} else {
						this.handleLoginSuccess(user)
					}
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>