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
				]
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>