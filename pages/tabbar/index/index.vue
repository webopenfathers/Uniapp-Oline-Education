<template>
	<view>
		<f-search-bar></f-search-bar>
		<swiper style="310rpx" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="flex justify-center" v-for="(item,index) in swiper" :key="index">
				<image style="width: 720rpx;height: 300rpx;" class="rounded shadow" :src="item.src" mode="aspectFill">
				</image>
			</swiper-item>
		</swiper>
		<icon-nav :list="iconNav"></icon-nav>
		<coupon-list></coupon-list>

		<view class="divider"></view>

		<view class="flex align-center px-2 py-3">
			<text class="font-md font-weight-bold">拼团</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-row">
			<course-list v-for="(item,index) in groupList" :key="index" :item='item'></course-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [{
						src: '/static/demo/banner/banner1.png'
					},
					{
						src: '/static/demo/banner/banner2.png'
					}
				],
				iconNav: [{
						name: '活动',
						src: "/static/demo/icon/hd.png"
					},
					{
						name: '考试',
						src: "/static/demo/icon/test.png"
					},
					{
						name: '秒杀',
						src: "/static/demo/icon/ms.png"
					},
					{
						name: '拼团',
						src: "/static/demo/icon/pt.png"
					},
					{
						name: '直播',
						src: "/static/demo/icon/course.png"
					},
					{
						name: '专栏',
						src: "/static/demo/icon/column.png"
					},
					{
						name: '电子书',
						src: "/static/demo/icon/book.png"
					},
					{
						name: '社区',
						src: "/static/demo/icon/ask.png"
					}
				],
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
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>