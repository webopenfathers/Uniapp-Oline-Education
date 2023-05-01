<template>
	<view>
		<view class="p-3">
			<!-- 头部 -->
			<view class="flex align-center w-100">
				<view class="flex align-center">
					<image src="../../static/demo/icon/test.png" style="width: 75rpx;height: 75rpx;" class="mr-2">
					</image>
					<view class="">
						<view class="text-primary font-weight-bold">昵称</view>
						<text class="text-muted font">女</text>
					</view>
				</view>

				<view class="ml-auto bg-warning text-white px-2 py-1 font" style="font-size: 14px;">
					精华
				</view>
			</view>

			<!-- 标题 -->
			<view class="py-2">
				<text>标题</text>
				<view class="flxe flex-wrap">
					<view class="flex justify-center align-center mt-1" style="width: 33.33%">
						<image style="height: 220rpx;width: 220rpx;" class="rounded" src="" mode="aspectFill"></image>
					</view>
				</view>
			</view>


			<!-- 下面评论、点赞 -->
			<view class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<view class="flxe align-center pr-2">
						<text style="font-size: 23px;" class="iconfont icon-pinglun2"></text>
						<text class="ml-1">1</text>
					</view>
					<view class="flxe align-center">
						<text style="font-size: 23px;" class="iconfont icon-dianzan2"></text>
						<text class="ml-1">1</text>
					</view>
				</view>
				<text class="text-light-muted font">2022:11:23:65</text>
			</view>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
	export default {
		name: "post-list",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>