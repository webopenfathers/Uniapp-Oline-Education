<template>
	<view>
		<block v-for="(item,index) in templates" :key="index">
			<!-- 搜索栏 -->
			<f-search-bar v-if="item.type==='search'" :placeholder="item.placeholder"></f-search-bar>

			<!-- 轮播图 -->
			<swiper v-else-if="item.type==='swiper'" style="310rpx" :indicator-dots="true" :autoplay="true"
				:interval="3000" :duration="1000">
				<swiper-item class="flex justify-center" v-for="(s,sI) in item.data" :key="sI">
					<image style="width: 720rpx;height: 300rpx;" class="rounded shadow" :src="s.src" mode="aspectFill">
					</image>
				</swiper-item>
			</swiper>

			<!-- 图标分类 -->
			<icon-nav v-else-if="item.type==='icons'" :list="item.data"></icon-nav>

			<!-- 优惠券 -->
			<coupon-list v-else-if="item.type==='coupon'"></coupon-list>

			<!-- 拼团模块 -->
			<template v-else-if="item.type==='promotion'">
				<view class="divider"></view>
				<view class="flex align-center px-2 py-3">
					<text class="font-md font-weight-bold">{{item.listType==='group'?'拼团':"秒杀"}}</text>
				</view>
				<scroll-view scroll-x="true" class="scroll-row">
					<course-list v-for="(item,index) in item.data || groupList" :key="index" :item='item'></course-list>
				</scroll-view>
			</template>

			<!-- 最新课程 -->
			<template v-else-if="item.type==='list'">
				<view class="divider"></view>
				<view class="flex align-center px-2 py-3 justify-between">
					<text class="font-md font-weight-bold">{{item.title}}</text>
					<text class="font-sm text-light-muted" v-if="item.showMore">查看更多</text>
				</view>
				<view>
					<course-list :type='item.listType' v-for="(item,index) in item.data" :key="index"
						:item='item'></course-list>
				</view>
			</template>

			<!-- 广告位 -->
			<template v-else-if="item.type==='imageAd'">
				<view class="divider"></view>
				<image :src="item.data" mode="aspectFill" style="width: 750rpx;height: 360rpx;">
				</image>
			</template>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupList: [{
						"group_id": 19,

						"id": 12,

						"title": "unicloud商城全栈开发",

						"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",

						"price": "4.00",

						"t_price": "10.00",

						"type": "media",

						"start_time": "2021-04-15T16:00:00.000Z",

						"end_time": "2022-05-16T16:00:00.000Z"
					},
					{
						"group_id": 19,

						"id": 12,

						"title": "unicloud商城全栈开发",

						"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",

						"price": "4.00",

						"t_price": "10.00",

						"type": "media",

						"start_time": "2021-04-15T16:00:00.000Z",

						"end_time": "2022-05-16T16:00:00.000Z"
					},
					{
						"group_id": 19,

						"id": 12,

						"title": "unicloud商城全栈开发",

						"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",

						"price": "4.00",

						"t_price": "10.00",

						"type": "media",

						"start_time": "2021-04-15T16:00:00.000Z",

						"end_time": "2022-05-16T16:00:00.000Z"
					}
				],
				templates: []
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getData()
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.$api.getIndexData().then(data => {
					this.templates = data
				})
			}
		}
	}
</script>

<style>

</style>