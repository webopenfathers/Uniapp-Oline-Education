<template>
	<view>
		<!-- 1 -->
		<view class="position-relative">
			<!-- 封面 -->
			<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
			<!-- 角标-定位 -->
			<view class="text-white font px-1"
				style="position: absolute;right: 20rpx;bottom: 20rpx;background-color: rgba(0,0,0,0.4);">
				专栏
			</view>
		</view>

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
			<uni-card title="专栏简介" isFull>
				<mp-html :content="detail.content">
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
			<menu-item v-for="(item,index) in list" :key="index" :title="item.title" :index="index">

				<view class="flex">
					<text class=" mr-1 border text-danger rounded border-danger font-sm px-1 mt-1">
						{{item.type | formatType}}
					</text>
					<text v-if="item.price==0" class="border text-danger rounded border-danger font-sm px-1 mt-1">
						免费试看
					</text>
				</view>


			</menu-item>
		</view>


		<!-- 4-底部按钮 -->
		<template v-if="!detail.isbuy && firstLoad">
			<view class="height:75px"></view>
			<view class="fixed-bottom p-2 border-top bg-white">
				<main-button>立即订购￥{{detail.price}}</main-button>
			</view>
		</template>
	</view>
</template>

<script>
	let opt = {
		media: "图文",
		audio: '音频',
		video: '视频',
		column: "专栏"
	}
	export default {

		// 过滤器
		filters: {
			formatType(K) {
				return opt[K]
			}
		},
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
			this.getData()

		},
		methods: {
			clickTab(index) {
				this.current = index
			},
			getData() {
				this.$api.readColumn({
					id: this.detail.id
				}).then(res => {
					this.detail = res
					this.list = res.column_courses
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