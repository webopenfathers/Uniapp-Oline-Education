<template>
	<view>
		<view class="flex align-center px-2 py-3 justify-between">
			<text class="font-md font-weight-bold">历史记录</text>
			<text class="font-sm text-light-muted">清除全部</text>
		</view>

		<!-- 脚标组件 -->
		<view class="flex flex-wrap px-3" style="margin-right: -30rpx;">
			<uni-badge style="margin-right: 25rpx;margin-bottom: 25rpx;"  size="normal" v-for="i in 10" :key="i" type="success"  text="你好啊啊啊"></uni-badge>
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

</style>