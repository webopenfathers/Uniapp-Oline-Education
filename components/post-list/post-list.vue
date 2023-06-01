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
						<view class="text-primary font-weight-bold">{{item.user.name}}</view>
						<text class="text-muted font">{{item.user.sex}}</text>
					</view>
				</view>

				<view v-if="item.is_top" class="ml-auto bg-warning text-white px-2 py-1 font" style="font-size: 14px;">
					精华
				</view>
			</view>

			<!-- 标题 -->
			<view v-if="!iscontent" class="py-2" @click="open">
				<text>{{item.desc.text}}</text>
				<view class="flex flex-wrap">
					<view v-for="(ele,EIndex) in item.desc.images" :key="EIndex"
						class="flex justify-center align-center mt-1" style="width: 33.33%">
						<image style="height: 220rpx;width: 220rpx;" class="rounded" :src="ele" mode="aspectFill">
						</image>
					</view>
				</view>
			</view>

			<view v-else class="flex flex-column p-2" v-for="(item2,index2) in item.content" :key="index2">
				<text class="mb-1">{{item2.text}}</text>
				<image v-for="(img,imgI) in item2.images" :key="imgI" :src="img" mode="widthFix"
					style="max-width: 100%;"></image>
			</view>


			<!-- 下面评论、点赞 -->
			<view v-if="!iscontent" class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<view class="flex align-center pr-2">
						<text style="font-size: 23px;" class="iconfont icon-pinglun2"></text>
						<text class="ml-1">{{item.comment_count==0?'评论':item.comment_count}}</text>
					</view>
					<view class="flex align-center" :class="item.issupport?' text-danger':''"
						@click="$emit('support',item.id)">
						<text style="font-size: 23px;" class="iconfont icon-dianzan2"></text>
						<text class="ml-1">{{item.support_count===0?'点赞':item.support_count}}</text>
					</view>
					<!-- 删除帖子功能 -->
					<button v-if="showDelete" type="warn" size="mini" class="ml-3"
						@click="$emit('delete',item.id)">删除</button>
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
			iscontent: {
				type: Boolean,
				default: false
			},
			showDelete: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			};
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages-bbs/post-detail/post-detail?id=' + this.item.id,
				});
			}
		}
	}
</script>

<style>

</style>