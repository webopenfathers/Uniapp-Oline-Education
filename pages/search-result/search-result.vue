<template>
	<view class="flex flex-column" style="height: 100%;">
		<!-- tab栏 -->
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
		<!-- 左右滑动的内容区域 -->
		<swiper :duration="200" class="flex-1 flex flex-column">
			<swiper-item class="flex" v-for="(t,tI) in tabs" :key="tI">
				<!-- 垂直方向滚动条 -->
				<scroll-view scroll-y="true" class=" flex-1">
					<!-- 课程列表 -->
					<course-list type='one' v-for="(item,index) in t.list" :key="index" :item='item'></course-list>
					<!-- 上拉显示更多 -->
					<uni-load-more :status="t.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
					name: '课程',
					loadStatus: 'more',
					list: [{
							"id": 12,

							"title": "unicloud商城全栈开发",

							"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/79023e0596c23aff09e6.png",

							"price": "10.00",

							"t_price": "10.00",

							"type": "media"

						},
						{
							"id": 538,

							"title": "VueCli 实战商城后台管理系统",

							"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/efa10a1e149fa44d0a51.png",

							"price": "10.00",

							"t_price": "10.00",

							"type": "media"

						},
						{
							"id": 542,

							"title": "uni-app实战视频点播app小程序",

							"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/9ef188863ea44740d24d.png",

							"price": "99.00",

							"t_price": "99.00",

							"type": "audio"

						},
						{
							"id": 543,

							"title": "uni-app多端企业网盘全栈开发",

							"cover": "http://demo-mp3.oss-cn-shenzhen.aliyuncs.com/egg-edu-demo/ff517a15e651ba374920.png",

							"price": "99.00",

							"t_price": "99.00",

							"type": "video"

						}
					],
					page: 1,
				}, {
					name: "专栏",
					loadStatus: 'more',
					list: [],
					page: 1,
				}],


			}
		},
		// 点击搜索框返回上一页
		onNavigationBarSearchInputClicked() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			clickTab(index) {
				this.current = index
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
</style>