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
				<text class="title">登录</text>
			</view>
			<view class="login-form">
				<uni-icons type="person"></uni-icons>
				<input type="text" placeholder="请输入用户名" class="rounded font-md" />
			</view>
			<view class="login-form">
				<uni-icons type="locked"></uni-icons>
				<input type="text" placeholder="请输入密码" class="rounded font-md" />
			</view>
			<!-- 登录按钮 -->
			<view class="bg-main btn" hover-class="bg-main-hover">
				登录
			</view>
			<!-- 注册  忘记密码 -->
			<view class="flex align-center justify-between my-3 font">
				<text class="py-3 text-main">注册账号</text>
				<text class="py-3 text-light-muted">忘记密码?</text>
			</view>
			<!-- 微信登录图标 -->
			<view class="flex align-center justify-center wechatlogin">
				<uni-icons type="weixin" size="25" color="#5ccc84"></uni-icons>
			</view>
			<!-- 同意协议 -->
			<checkbox-group class="flex align-center justify-center mt-4">
				<label class="text-light-muted">
					<checkbox color="#7fd49e" style="transform: scale(0.7);" /><text class="font">已阅读并同意用户协议&隐私声明</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				// 返回上一级
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.login-bg {
		height: 220rpx;
		background-image: linear-gradient(120deg, #3BFDAF 0%, #70D6F2 100%);
	}

	.login-back {
		position: fixed;
		top: 0;
		left: 0;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.login {
		position: absolute;
		top: 200rpx;
		left: 0;
		right: 0;
		background-color: #FFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		padding: 60rpx 70rpx 0 70rpx;
	}

	.login .title {
		font-size: 22px;
		margin-bottom: 50rpx;
		color: #35404b;
	}

	.login-form {
		position: relative;
		margin-bottom: 50rpx;
	}

	.login-form .uni-icons {
		position: absolute;
		left: 0;
		top: 0;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #272727;
	}

	.login-form input {
		height: 100rpx;
		padding-left: 100rpx;
		padding-right: 20rpx;
		background-color: #f5f5f5;
	}

	.login .btn {
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		border-radius: 10rpx;
	}

	.wechatlogin .uni-icons {
		border: 1rpx solid #5ccc84;
		width: 47px;
		border-radius: 100%;
		height: 47px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>