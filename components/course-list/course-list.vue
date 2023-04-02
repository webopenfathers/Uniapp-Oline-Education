<template>
	<view class="scroll-row-item course course-two">
		<view class="position-relative">
			<image src="@/static/demo/cover/1.png" mode=""></image>
			<view class="text-white font-sm">
				图文
			</view>
		</view>
		<view class="flex flex-column flex-shrink">
			<text class="text-ellipsis font-md">uni-app实战直播app开发</text>
			<view class="font-sm text-light-muted my-1">
				10人已抢
			</view>
			<view class="flex flex-1 align-end">
				<text class="font-md text-danger">￥100.00</text>
				<text class="font-sm text-light-muted">￥200.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "course-list",
		data() {
			return {

			};
		}
	}
</script>

<style>
	.course {}

	.course-two {
		width: 340rpx;
		margin-left: 20rpx;
	}

	.course-two image {
		width: 340rpx;
		height: 180rpx;
	}

	.course>view:first-child>view {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		background-color: rgba(0, 0, 0, 0.4);
		padding: 0 10rpx;
	}
</style>