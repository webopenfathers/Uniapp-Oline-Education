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


		<!-- 活动条 -->
		<active-bar v-if="activeData && !detail.isbuy" :endTime="activeData.data.end_time"
			:price="activeData.data.price" :t_price="detail.price">
			<text v-if="activeData.type=='group'">{{activeData.data.p_num}}人拼团</text>
			<text v-else>{{activeData.data.used_num}}人已抢/剩{{activeData.data.s_num-activeData.data.used_num}}名</text>
		</active-bar>

		<!-- tab栏 -->
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
		<!-- 简介 -->
		<view v-if="current===0" class="animate__animated animate__fadeIn animate__faster">
			<!-- 2 -->
			<view class="flex flex-column p-3">
				<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>
				<view class="flex align-center justify-between">
					<text class="font-sm text-light-muted">{{detail.sub_count}} 人学过</text>
					<collect-btn @success='detail.isfava=$event' :isfava="detail.isfava" :goods_id="detail.id"
						type="column"></collect-btn>
				</view>

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
			<menu-item @click='openPlay(item)' v-for="(item,index) in list" :key="index" :title="item.title"
				:index="index">

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
				<main-button @click='submit'>{{detail.price==0?'立即学习':'立即订购￥'+detail.price}}</main-button>
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
					id: 0,
					title: "",
					cover: "",
					try: "",
					price: "",
					t_price: "",
					type: "media",
					sub_count: 0,
					content: "",
					isbuy: false,
					isfava: false
				},
				list: [],
				group_id: 0,
				// 拼团/秒杀详情
				activeData: null,
				flashsale_id: 0
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

			if (e.group_id) {
				this.group_id = e.group_id
			}

			if (e.flashsale_id) {
				this.flashsale_id = e.flashsale_id
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
						type: 'column'
					}).then(res => {
						this.getData()
					}).finally(() => {
						uni.hideLoading()
					})
					return
				}

				// 创建订单
				let type = 'column'
				let id = this.detail.id
				this.authJump(`/pages/create-order/create-order?id=${id}&type=${type}`)
			},
			openPlay(item) {
				if (item.price != 0 && !this.detail.isbuy) {
					return this.$toast('请先购买该专栏')
				}
				this.authJump(`/pages/course/course?id=${item.id}&column_id=${this.detail.id}`)
			},
			clickTab(index) {
				this.current = index
			},
			getData() {
				this.$api.readColumn({
					id: this.detail.id,
					group_id: this.group_id,
					flashsale_id: this.flashsale_id
				}).then(res => {
					this.detail = res

					if (res.group) {
						this.activeData = {
							type: 'group',
							data: res.group
						}
					}

					if (res.flashsale) {
						this.activeData = {
							type: 'flashsale',
							data: res.flashsale
						}
					}


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