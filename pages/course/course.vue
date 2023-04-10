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

		<f-audio :poster='detail.cover' v-else-if="detail.type==='audio'" :src='detail.content'></f-audio>

		<video v-else-if="detail.type=='video'" controls :src="detail.content" style="width: 100%;height: 420rpx;"
			:poster="detail.cover"></video>


		<view class="animate__animated animate__fadeIn animate__faster">
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
			<uni-card :title="(detail.isbuy && detail.type==='media')?'课程内容':'课程简介'" isFull>
				<mp-html :content="(detail.isbuy && detail.type==='media')?detail.content:detail.try">
					<view class="flex justify-center py-3 text-light-muted">
						加载中...
					</view>
				</mp-html>
			</uni-card>
			<!-- 4-底部按钮 -->
			<template v-if="!detail.isbuy && firstLoad">
				<view class="height:75px"></view>
				<view class="fixed-bottom p-2 border-top bg-white">
					<main-button>立即订购￥{{detail.price}}</main-button>
				</view>
			</template>
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
				firstLoad: false,
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
					this.firstLoad = true
				})
			}
		}
	}
</script>

<style>

</style>