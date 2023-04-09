<template>
	<view class="flex" style="border-bottom: 1rpx solid #f4f4f4;">
		<view @click="$emit('change',index)" class="tab-item" v-for="(item,index) in tabs" :key="index"
			:class="current===index?'tab-item-active':''">
			<text class="font-md">{{item.name}}</text>
			<view v-if="index===current" class="tab-line animate__animated animate__fadeIn animate__faster"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tab",
		props: {
			current: {
				type: Number,
				default: 0
			},
			tabs: Array
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.tab-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 20rpx;
		color: #888;
	}

	.tab-line {
		width: 50rpx;
		height: 10rpx;
		background-color: #00cf8a;
		border-radius: 10rpx;
		position: absolute;
		bottom: 0;
	}

	.tab-item-active {
		color: #00cf8a;
		font-weight: bold;
	}
</style>