<template>
	<view class="p-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view style="width: 310rpx;display: inline-flex;color: #fff;" class="mr-3" v-for="i in 5" :key="i">
				<view class="flex flex-column align-center justify-center bg-hover-warning px-3 py-2"
					style="border-right: 4rpx dashed;">
					<text>￥100</text>
					<text class="font">满￥200可用</text>
				</view>
				<view style="120rpx" hover-class="bg-hover-warning"
					class="flex align-center justify-center bg-warning font px-2">
					领取
				</view>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "coupon-list",
		data() {
			return {
			};
		}
	}
</script>

<style>

</style>