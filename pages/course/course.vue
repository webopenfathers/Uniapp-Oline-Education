<template>
	<view>
		<!-- 1 -->
		<view class="position-relative">
			<!-- 封面 -->
			<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
			<!-- 角标-定位 -->
			<view class="text-white font px-1"
				style="position: absolute;right: 20rpx;bottom: 20rpx;background-color: rgba(0,0,0,0.4);">
				图文
			</view>
		</view>
		<!-- 2 -->
		<view class="flex flex-column p-3">
			<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>
			<text class="font-sm text-light-muted">{{detail.sub_count}} 人学过</text>
			<view class="flex mt-2 align-end">
				<text class="text-danger font-lg">￥{{detail.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
			</view>
		</view>

		<!-- 分割线 -->
		<view class="divider"></view>
		<!-- 3 -->
		<uni-card title="课程简介" isFull>
			<rich-text :nodes="detail.try">
			</rich-text>
		</uni-card>
		<!-- 4-底部按钮 -->
		<view class="height:75px"></view>
		<view class="fixed-bottom p-2 border-top bg-white">
			<main-button>立即订购￥{{detail.price}}</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					"id": 12,

					"title": "unicloud商城全栈开发",

					"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",

					"try": "<p>unicloud商城全栈开发</p>",

					"price": "10.00",

					"t_price": "20.00",

					"type": "media",

					"sub_count": 0,

					"content": "<p>unicloud商城全栈开发</p>",

					"isbuy": true,

					"isfava": true
				}
			}
		},
		// 可以接收参数
		onLoad(e) {
			this.detail.id = e.id,
				uni.setNavigationBarTitle({
					title: this.detail.title
				})
		},
		methods: {

		}
	}
</script>

<style>

</style>