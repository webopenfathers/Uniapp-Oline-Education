<template>
	<view>
		<view class="flex text-white mb-3">
			<view class="flex flex-column flex-1 bg-hover-warning p-2" style="border-right: 4rpx dashed #fff;">
				<text class="font-lg">￥50.00</text>
				<text class="font-sm">适用课程：课程名称</text>
			</view>
			<view hover-class="bg-hover-warning" class=" flex justify-center align-center bg-warning"
				style="width: 200rpx;">
				立即使用
			</view>
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

		}
	}
</script>

<style>
	page {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.coupon-used>view {
		background-color: #ccc !important;
	}
</style>