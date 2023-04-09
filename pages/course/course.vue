<template>
	<view>
		<!-- 1 -->
		<view class="position-relative">
			<!-- 封面 -->
			<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
			<!-- 角标-定位 -->
			<view class="text-white font px-1"
				style="position: absolute;right: 20rpx;bottom: 20rpx;background-color: rgba(0,0,0,0.4);">
				{{detail.type | formatType}}
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
			<mp-html :content="detail.try"></mp-html>
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
		filters: {
			formatType(t) {
				let c = {
					media: '图文',
					audio: '音频',
					video: '视频'
				}
				return c[t]
			}
		},
		data() {
			return {
				detail: {
					"id": 0,

					"title": "",

					"cover": "",

					"try": "",

					"price": "",

					"t_price": "",

					"type": "media",

					"sub_count": 0,

					"content": "",

					"isbuy": false,
				}
			}
		},
		// 可以接收参数
		onLoad(e) {
			this.detail.id = e.id
			if (!this.detail.id) {
				this.$toast('非法参数')
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 700)
				return
			}
			this.getData()

		},
		methods: {
			getData() {
				this.$api.readCourse({
					id: this.detail.id
				}).then(res => {
					this.detail = res
					uni.setNavigationBarTitle({
						title: this.detail.title
					})
				}).catch(err => {
					if (err === '该记录不存在') {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 700)
					}
				}).finally(() => {

				})
			}
		}
	}
</script>

<style>

</style>