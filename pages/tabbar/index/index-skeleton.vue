<template>
	<view>
		<view class="p-2">
			<!-- 搜索栏 -->
			<skeleton width="710rpx" height='75rpx' oClass="mb-2 rounded"> </skeleton>
			<!-- 轮播图 -->
			<skeleton width="710rpx" height='300rpx' oClass="rounded"> </skeleton>
		</view>
		<!-- 图标分类 -->
		<view class="flex flex-wrap py-2">
			<view class="flex flex-column justify-center align-center" style="width: 25%;" v-for="i in 8" :key="i">
				<skeleton width="75rpx" height='75rpx' circle oClass="mb-2"> </skeleton>
				<skeleton width="75rpx" height='30rpx' oClass="mb-2"> </skeleton>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="flex flex-wrap py-2">
			<view class="flex justify-center align-center" style="width: 50%;">
				<skeleton width="354rpx" height='130rpx' oClass="mb-2"> </skeleton>
			</view>
			<view class="flex justify-center align-center" style="width: 50%;">
				<skeleton width="354rpx" height='130rpx' oClass="mb-2"> </skeleton>
			</view>
		</view>

		<!-- 拼团 -->
		<view class="p-2">
			<skeleton width="70rpx" height='35rpx'> </skeleton>
		</view>

		<!-- 最新课程 -->
		<view class="flex p-2" v-for="i in 3" :key="i">
			<skeleton width="300rpx" height='170rpx'> </skeleton>
			<view class="ml-2">
				<skeleton width="364rpx" height='38rpx' oClass="mb-2"> </skeleton>
				<skeleton width="120rpx" height='25rpx' oClass="mb-2"> </skeleton>
				<skeleton width="170rpx" height='43rpx'> </skeleton>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

	}
</script>

<style>
</style>