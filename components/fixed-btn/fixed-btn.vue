<template>
	<view class="fixed-btn bg-main" @click="$emit('click')">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "fixed-btn",
		data() {
			return {

			};
		}
	}
</script>

<style>
	.fixed-btn {
		position: fixed;
		right: 40rpx;
		bottom: 150rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>