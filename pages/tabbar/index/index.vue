<template>
	<view>
		<!-- 骨架屏 -->
		<indexSkeleton v-if="loading" />


		<view v-else class="animate__animated animate__fadeIn animate__fast">
			<block v-for="(item,index) in templates" :key="index">
				<!-- 搜索栏 -->
				<f-search-bar v-if="item.type==='search'" :placeholder="item.placeholder"></f-search-bar>

				<!-- 轮播图 -->
				<swiper v-else-if="item.type==='swiper'" style="310rpx" :indicator-dots="true" :autoplay="true"
					:interval="3000" :duration="1000">
					<swiper-item class="flex justify-center" v-for="(s,sI) in item.data" :key="sI">
						<image style="width: 720rpx;height: 300rpx;" class="rounded shadow" :src="s.src"
							mode="aspectFill">
						</image>
					</swiper-item>
				</swiper>

				<!-- 图标分类 -->
				<icon-nav v-else-if="item.type==='icons'" :list="item.data"></icon-nav>

				<!-- 优惠券 -->
				<coupon-list v-else-if="item.type==='coupon'"></coupon-list>

				<!-- 拼团模块 -->
				<view v-else-if="item.type==='promotion'">
					<active-list :type="item.listType"></active-list>
				</view>

				<!-- 最新课程 -->
				<view v-else-if="item.type==='list'">
					<view class="divider"></view>
					<view class="flex align-center px-2 py-3 justify-between">
						<text class="font-md font-weight-bold">{{item.title}}</text>
						<text class="font-sm text-light-muted" v-if="item.showMore">查看更多</text>
					</view>
					<view>
						<course-list :type='item.listType' v-for="(item,index) in item.data" :key="index"
							:item='item'></course-list>
					</view>
				</view>

				<!-- 广告位 -->
				<view v-else-if="item.type==='imageAd'">
					<view class="divider"></view>
					<image :src="item.data" mode="aspectFill" style="width: 750rpx;height: 360rpx;">
					</image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import indexSkeleton from './index-skeleton.vue'
	export default {
		components: {
			indexSkeleton
		},
		data() {
			return {
				templates: [],
				loading: false
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.getData()
		},
		created() {
			this.loading = true
			this.getData()
		},
		methods: {
			getData() {

				this.$api.getIndexData().then(data => {
					this.templates = data
				}).finally(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			}
		}
	}
</script>

<style>

</style>