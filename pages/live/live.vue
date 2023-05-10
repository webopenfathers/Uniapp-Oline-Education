<template>
	<view>
		<uni-load-more v-if="!firstLoad" status="loading"></uni-load-more>

		<view v-else-if="!detail.isbuy" class="animate__animated animate__fadeIn animate__faster">
			<!-- 1 -->
			<view class="position-relative">
				<!-- 封面 -->
				<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
				<view
					class="position-absolute top-0 left-0 right-0 bottom-0 text-white flex flex-column align-center justify-center"
					style="background-color: rgba(0, 0, 0, 0.5);">
					<text class="mb-1">开始时间：{{detail.start_time}}</text>
					<text>结束时间：{{detail.end_time}}</text>
				</view>
			</view>

			<view class="animate__animated animate__fadeIn animate__faster">
				<!-- 2 -->
				<view class="flex flex-column p-3">
					<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>

					<view class="flex align-center justify-between">
						<text class="font-sm text-light-muted">{{detail.sub_count}} 人学过</text>
					</view>


					<view class="flex mt-2 align-end">
						<text class="text-danger font-lg">￥{{detail.price}}</text>
						<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
					</view>
				</view>

				<!-- 分割线 -->
				<view class="divider"></view>
				<!-- 3 -->
				<uni-card title="直播介绍" isFull>
					<view id="media">
						<mp-html :content="detail.try">
							<view class="flex justify-center py-3 text-light-muted">
								加载中...
							</view>
						</mp-html>
					</view>
				</uni-card>
				<!-- 4-底部按钮 -->
				<template v-if="firstLoad">
					<view class="height:75px"></view>
					<view class="fixed-bottom p-2 border-top bg-white">
						<main-button @click='submit'>{{detail.price==0?'立即学习':'立即订购￥'+detail.price}}</main-button>
					</view>
				</template>
			</view>
		</view>


		<live-play :detail='detail' v-else></live-play>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstLoad: false,
				detail: {
					id: 0,
					isbuy: false,
					price: "",
					school_id: 0,
					start_time: "",
					status: "",
					sub_count: 0,
					t_price: "",
					title: "",
					try: "",
					type: "",
					updated_time: "",
					cover: "",
					created_time: "",
					end_time: ""
				}
			}
		},
		onLoad(e) {
			if (!e.id) {
				this.$toast('非法参数')
				uni.navigateBack({
					delta: 1
				});
				return
			}
			this.detail.id = e.id
			this.getData()
		},
		methods: {
			submit() {
				// 立即学习
				if (this.detail.price == 0) {
					uni.showLoading({
						title: '加载中...',
						mask: false
					})
					this.$api.learn({
						goods_id: this.detail.id,
						type: 'course'
					}).then(res => {
						this.getData()
					}).finally(() => {
						uni.hideLoading()
					})
					return
				}

				// 创建订单
				let type = 'course'
				let id = this.detail.id
				this.authJump(`/pages/create-order/create-order?id=${id}&type=${type}`)
			},
			getData() {
				this.$api.readLive({
					id: this.detail.id
				}).then(res => {
					console.log(res);
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
					this.firstLoad = true
				})
			}
		}
	}
</script>

<style>

</style>