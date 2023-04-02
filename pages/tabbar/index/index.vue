<template>
	<view>
		<f-search-bar></f-search-bar>
		<swiper style="310rpx" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item class="flex justify-center" v-for="(item,index) in swiper" :key="indxe">
				<image style="width: 720rpx;height: 300rpx;" class="rounded shadow" :src="item.src"
					mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [
					{
						src:'/static/demo/banner/banner1.png'
					},
					{
						src:'/static/demo/banner/banner2.png'
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