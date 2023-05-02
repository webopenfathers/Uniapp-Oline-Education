<template>
	<view>
		<view class="p-3">
			<!-- 头部 -->
			<view class="flex align-center w-100">
				<view class="flex align-center">
					<image :src="item.user.avatar" style="width: 75rpx;height: 75rpx;border-radius: 100%;"
						class="mr-2 bg-light">
					</image>
					<view class="">
						<view class="text-primary font-weight-bold">{{item.name}}</view>
						<text class="text-muted font">{{item.user.sex}}</text>
					</view>
				</view>

				<view v-if="item.is_top" class="ml-auto bg-warning text-white px-2 py-1 font" style="font-size: 14px;">
					精华
				</view>
			</view>

			<!-- 标题 -->
			<view class="py-2">
				<text>{{item.desc.text}}</text>
				<view class="flex flex-wrap">
					<view v-for="(ele,EIndex) in item.desc.images" :key="EIndex"
						class="flex justify-center align-center mt-1" style="width: 33.33%">
						<image style="height: 220rpx;width: 220rpx;" class="rounded" :src="ele" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>


			<!-- 下面评论、点赞 -->
			<view class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<view class="flex align-center pr-2">
						<text style="font-size: 23px;" class="iconfont icon-pinglun2"></text>
						<text class="ml-1">{{item.common_count}}</text>
					</view>
					<view class="flex align-center">
						<text style="font-size: 23px;" class="iconfont icon-dianzan2"></text>
						<text class="ml-1">{{item.support_count}}</text>
					</view>
				</view>
				<text class="text-light-muted font">{{item.created_time}}</text>
			</view>
		</view>
		<view class="divider"></view>
	</view>
</template>

<script>
	export default {
		name: "post-list",
		props: {
			item: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>