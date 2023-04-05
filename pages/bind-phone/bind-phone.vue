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
				<text class="title">绑定手机号</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input v-model="form.phone" type="text" placeholder="请输入手机号" class="rounded font-md" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input v-model="form.code" type="text" placeholder="请输入验证码" class="rounded font-md" />
				<!-- 发送验证码 -->
				<code-btn :phone="form.phone"></code-btn>
			</view>
			<!-- 登录按钮 -->
			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">
				绑 定
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					phone: '',
					code: '',
				}
			}
		},
		methods: {
			back() {
				// 返回上一级
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				// uni.showLoading({
				// 	title: `${this.type==='login'?'登录中':'提交中'}...`,
				// 	mask: false
				// })
				// let data = Object.assign(this.form, {})
				// if (this.type === 'reg') {
				// 	this.$api.reg(data).then(res => {
				// 		this.$toast('注册成功')
				// 		this.resetForm()
				// 		this.changeType()
				// 	}).finally(() => {
				// 		uni.hideLoading()
				// 	})
				// } else {
				// 	this.$api.login(data).then(user => {
				// 		this.$toast('登录成功')
				// 		this.$store.dispatch('login', user)
				// 		setTimeout(() => {
				// 			this.back()
				// 		}, 350)
				// 	}).finally(() => {
				// 		uni.hideLoading()
				// 	})
				// }
			}
		}
	}
</script>

<style>

</style>