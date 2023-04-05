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
				<text class="title">找回密码</text>
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
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input v-model="form.password" type="text" placeholder="请输入密码" class="rounded font-md" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input v-model="form.repassword" type="text" placeholder="请输入确认密码" class="rounded font-md" />
			</view>
			<!-- 登录按钮 -->
			<view class="bg-main btn" hover-class="bg-main-hover" @click="submit">
				立即找回
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
					password: '',
					repassword: ''
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
				// 	title: '提交中...',
				// 	mask: false
				// })

				// let data = Object.assign(this.form, {})

				// this.$api.bindMobile(data).then(res => {
				// 	this.$toast('绑定成功')
				// 	this.$store.dispatch('updateInfo', data.phone)
				// 	setTimeout(() => {
				// 		this.back()
				// 	}, 350)
				// }).finally(() => {
				// 	uni.hideLoading()
				// })
			}
		}
	}
</script>

<style>

</style>