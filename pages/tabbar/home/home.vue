<template>
	<view>
		<view class="home-bg"></view>
		<view class="position-relative">
			<view class="flex p-3">
				<!-- 头像部分 -->
				<image src="/static/noLogin.png" style="width: 120rpx;height: 120rpx" class="rounded-circle bg-light">
				</image>
				<!-- 文字部分 -->
				<view class="flex flex-column pl-3 flex-1 text-white">
					<view class="font-md mb-2">
						立即登录
					</view>
					<view class="font-sm">
						登录解锁更多功能
					</view>
				</view>
			</view>

			<!-- 下面导航 -->
			<view class="p-3">
				<view class="flex bg-white shadow rounded">
					<view v-for="(item,index) in icons" :key="index"
						class="flex-1 flex flex-column align-center justify-center py-3">
						<text class="iconfont" :class="item.icon" style="font-size: 20px;color: #febd00;"></text>
						<text class="font-sm mt-1 text-secondary">{{item.name}}</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		data() {
			return {
				icons: [{
						icon: "icon-xuexi",
						name: '学习'
					},
					{
						icon: "icon-xuexi",
						name: '订单'
					},
					{
						icon: "icon-xuexi",
						name: '订单'
					},
					{
						icon: "icon-xuexi",
						name: '订单'
					},
				]
			}
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '../../login/login'
				})
			}
		}
	}
</script>

<style>
	.home-bg {
		background-color: #5ccc84;
		height: 350rpx;
		width: 750rpx;
		border-bottom-left-radius: 100rpx;
		border-bottom-right-radius: 100rpx;
		position: fixed;
		left: 0;
		right: 0;
	}
</style>