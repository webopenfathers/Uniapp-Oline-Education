<template>
	<view>
		<!-- 1 -->
		<view class="position-relative">
			<view class="scroll-row-item course  course-one">
				<view class="position-relative">
					<image :src="detail.cover" class="rounded"></image>
				</view>
				<view class="flex flex-column flex-shrink">
					<text class="font-lg">{{detail.title}}</text>
					<view class="flex flex-1 align-end justify-end">
						<view class="border rounded p-2 text-danger"
							style="background-color: rgb(255, 247, 240);border-color: rgb(255, 227, 203);">
							<text class="font-lg ">￥{{detail.price}}</text>
							<text class="font text-light-muted">￥{{detail.t_price}}</text>
							<text class="mx-2">|</text>
							<text class="font">{{detail.sub_count}}人</text>
						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="divider"></view>


		<!-- tab栏 -->
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
		<!-- 简介 -->
		<view v-if="current===0" class="animate__animated animate__fadeIn animate__faster">
			<!-- 2 -->
			<view class="flex flex-column p-3">
				<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>
				<text class="font-sm text-light-muted">{{detail.sub_count}} 人学过</text>

				<view v-if="!detail.isbuy" class="flex mt-2 align-end">
					<text class="text-danger font-lg">￥{{detail.price}}</text>
					<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
				</view>
			</view>

			<!-- 分割线 -->
			<view class="divider"></view>
			<!-- 3 -->
			<uni-card title="电子书简介" isFull>
				<mp-html :content="detail.try">
					<view class="flex justify-center py-3 text-light-muted">
						加载中...
					</view>
				</mp-html>
			</uni-card>
		</view>

		<!--目录 -->
		<view v-else class="animate__animated animate__fadeIn animate__faster">
			<!-- 共多少节 -->
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">共 {{list.length}} 节</view>
			</view>
			<menu-item @click='openPlay(item)' v-for="(item,index) in list" :key="index" :title="item.title"
				:index="index">

				<view class="flex">
					<text v-if="item.isfree" class="border text-danger rounded border-danger font-sm px-1 mt-1">
						免费试看
					</text>
				</view>


			</menu-item>
		</view>


		<!-- 4-底部按钮 -->
		<template v-if="!detail.isbuy && firstLoad">
			<view class="height:75px"></view>
			<view class="fixed-bottom p-2 border-top bg-white">
				<main-button @click='submit'>{{detail.price==0?'立即学习':'立即订购￥'+detail.price}}</main-button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				firstLoad: false,
				current: 0,
				tabs: [{
					name: '简介',
				}, {
					name: "目录",
				}],
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
				},
				list: []
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
		},
		onShow() {
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
						type: 'book'
					}).then(res => {
						this.getData()
					}).finally(() => {
						uni.hideLoading()
					})
					return
				}

				// 创建订单
				let type = 'book'
				let id = this.detail.id
				this.authJump(`/pages/create-order/create-order?id=${id}&type=${type}`)
			},
			openPlay(item) {
				if (item.isfree === 0 && !this.detail.isbuy) {
					return this.$toast('请先购买该电子书')
				}
				this.authJump(`/pages/book/book?id=${item.id}&book_id=${this.detail.id}`)
			},
			clickTab(index) {
				this.current = index
			},
			getData() {
				this.$api.readBook({
					id: this.detail.id
				}).then(res => {
					this.detail = res
					this.list = res.book_details
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
	.course>view:first-child>view {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		background-color: rgba(0, 0, 0, 0.4);
		padding: 0 10rpx;
	}


	.course-one {
		display: flex !important;
		padding: 20rpx;
	}

	.course-one>view:first-child {
		margin-right: 20rpx;
	}

	.course-one image,
	.course-one>view:first-child {
		width: 258rpx;
		height: 380rpx;
		flex-shrink: 1;
	}

	.course-one>view:last-child {
		width: 430rpx;
	}
</style>