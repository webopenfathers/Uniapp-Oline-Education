<template>
	<view>
		<!-- 1 -->
		<view v-if="!detail.isbuy" class="position-relative">
			<!-- 封面 -->
			<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
			<!-- 角标-定位 -->
			<view class="text-white font px-1"
				style="position: absolute;right: 20rpx;bottom: 20rpx;background-color: rgba(0,0,0,0.4);">
				{{detail.type | formatType}}
			</view>
		</view>

		<f-audio @onProgress='onAudioProgressUpdate' :poster='detail.cover' v-else-if="detail.type==='audio'"
			:src='detail.content'></f-audio>

		<video v-else-if="detail.type=='video'" controls :src="detail.content" style="width: 100%;height: 420rpx;"
			:poster="detail.cover" @timeupdate="onVideoTimeUpdate"></video>


		<!-- 活动条 -->
		<active-bar v-if="activeData && !detail.isbuy" :endTime="activeData.data.end_time"
			:price="activeData.data.price" :t_price="detail.price">

			<text v-if="activeData.type=='group'">{{activeData.data.p_num}}人拼团</text>
			<text v-else>{{activeData.data.used_num}}人已抢/剩{{activeData.data.s_num-activeData.data.used_num}}名</text>

		</active-bar>


		<view class="animate__animated animate__fadeIn animate__faster">
			<!-- 2 -->
			<view class="flex flex-column p-3">
				<text class="mb-1" style="font-size: 38rpx;">{{detail.title}}</text>

				<view class="flex align-center justify-between">
					<text class="font-sm text-light-muted">{{detail.sub_count}} 人学过</text>
					<collect-btn @success='detail.isfava=$event' :isfava="detail.isfava" :goods_id="detail.id"
						type="course"></collect-btn>
				</view>


				<view v-if="!detail.isbuy" class="flex mt-2 align-end">
					<text class="text-danger font-lg">￥{{detail.price}}</text>
					<text class="font-sm text-light-muted ml-1 text-through">￥{{detail.t_price}}</text>
				</view>
			</view>

			<!-- 分割线 -->
			<view class="divider"></view>
			<!-- 3 -->
			<uni-card :title="(detail.isbuy && detail.type==='media')?'课程内容':'课程简介'" isFull>
				<view id="media">
					<mp-html :content="(detail.isbuy && detail.type==='media')?detail.content:detail.try"
						@ready="onMediaReady">
						<view class="flex justify-center py-3 text-light-muted">
							加载中...
						</view>
					</mp-html>
				</view>
			</uni-card>
			<!-- 4-底部按钮 -->
			<template v-if="!detail.isbuy && firstLoad">
				<view class="height:75px"></view>
				<view class="fixed-bottom p-2 border-top bg-white">
					<main-button @click='submit'>{{detail.price==0?'立即学习':'立即订购￥'+detail.price}}</main-button>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	// 窗口高度
	let windowHeight = uni.getSystemInfoSync().windowHeight
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
				firstLoad: false,
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
				column_id: 0,
				scrollTop: 0,
				mediaHeight: 0,
				progress: 0,
				group_id: 0,
				// 拼团/秒杀详情
				activeData: null,
				flashsale_id: 0
			}
		},
		// 图文-根据滚动状态来更新进度
		// 监听页面滚动的生命周期
		onPageScroll(e) {
			if (this.detail.isbuy && this.detail.type == 'media' && e.scrollTop > this.scrollTop) {
				// 只记录最大值
				this.scrollTop = e.scrollTop
				this.sumMediaProgress()
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
			if (e.column_id) {
				this.column_id = e.column_id
			}

			if (e.group_id) {
				this.group_id = e.group_id
			}

			if (e.flashsale_id) {
				this.flashsale_id = e.flashsale_id
			}
			this.getData()

		},
		beforeDestroy() {
			this.updateUserHistory()
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
			onAudioProgressUpdate(p) {
				this.progress = p
			},
			// 视频学习进度e
			onVideoTimeUpdate(e) {
				let {
					currentTime,
					duration
				} = e.detail

				if (duration > 0) {
					this.progress = ((currentTime / duration) * 100).toFixed(2)
				}

			},
			updateUserHistory() {
				if (!this.detail.isbuy) return
				let d = {}
				if (this.column_id == 0) {
					d = {
						id: this.detail.id,
						type: 'course',
						progress: this.progress
					}
				} else {
					d = {
						id: this.column_id,
						type: 'column',
						detail_id: this.detail.id
					}
				}
				// 调用更新接口
				this.$api.updateUserHistory(d)
			},
			onMediaReady() {
				const Query = uni.createSelectorQuery().in(this)
				Query.select('#media').boundingClientRect(data => {
					this.mediaHeight = parseInt(data.height)
					this.sumMediaProgress()
				}).exec()
			},
			// 计算图文课程学习进度
			sumMediaProgress() {
				if (this.mediaHeight > 0) {
					// 
					this.progress = (((this.scrollTop + windowHeight) / this.mediaHeight) * 100).toFixed(2)
					this.progress = this.progress > 100 ? 100 : this.progress
				}
			},
			getData() {
				this.$api.readCourse({
					id: this.detail.id,
					column_id: this.column_id,
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