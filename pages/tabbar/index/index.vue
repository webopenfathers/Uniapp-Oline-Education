<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<uni-status-bar :bg-color="#FFF"></uni-status-bar>
		<!-- #endif -->

		<!-- 骨架屏 -->
		<indexSkeleton v-if="loading" />


		<view v-else class="animate__animated animate__fadeIn animate__fast">
			<block v-for="(item,index) in templates" :key="index">
				<!-- 搜索栏 -->
				<f-search-bar v-if="item.type==='search'" :placeholder="item.placeholder"></f-search-bar>

				<!-- 轮播图 -->
				<swiper v-else-if="item.type==='swiper'" style="310rpx" :indicator-dots="true" :autoplay="true"
					:interval="3000" :duration="1000">
					<swiper-item class="flex justify-center" v-for="(s,sI) in item.data" :key="sI"
						@click="swiperClick(s)">
						<image style="width: 720rpx;height: 300rpx;" class="rounded shadow" :src="s.src"
							mode="aspectFill">
						</image>
					</swiper-item>
				</swiper>

				<!-- 图标分类 -->
				<icon-nav v-else-if="item.type==='icons'" :list="item.data"></icon-nav>

				<!-- 优惠券 -->
				<coupon-list ref="couponList" v-else-if="item.type==='coupon'"></coupon-list>

				<!-- 拼团模块 -->
				<view v-else-if="item.type==='promotion'">
					<active-list :type="item.listType"></active-list>
				</view>

				<!-- 最新课程 -->
				<view v-else-if="item.type==='list'">
					<view class="divider"></view>
					<view class="flex align-center px-2 py-3 justify-between">
						<text class="font-md font-weight-bold">{{item.title}}</text>
						<text class="font-sm text-light-muted" v-if="item.showMore" @click="openCourseList">查看更多</text>
					</view>
					<view>
						<course-list :type='item.listType' v-for="(item2,index2) in item.data" :key="index2"
							:item='item2'></course-list>
					</view>
				</view>

				<!-- 广告位 -->
				<view v-else-if="item.type==='imageAd'">
					<view class="divider"></view>
					<image :src="item.data" mode="aspectFill" style="width: 750rpx;height: 360rpx;"
						@click="imageAdClick(item)">
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
			this.refreshCouponList()
		},
		created() {
			this.loading = true
			this.getData()

			// 监听全局的用户登录，刷新优惠券列表
			uni.$on('userLogin', this.refreshCouponList)
			// 监听全局的用户退出，刷新优惠券列表
			uni.$on('userLogout', this.refreshCouponList)
		},
		destroyed() {
			// 页面摧毁，取消事件
			uni.$off('userLogin', this.refreshCouponList)
			// 页面摧毁，取消事件
			uni.$off('userLogout', this.refreshCouponList)
		},
		methods: {
			imageAdClick(item) {
				console.log(item);
			},
			swiperClick(s) {
				if (s.type == 'webview') {
					// 打开webView页面
					this.$openWebview(s.url)
				} else if (s.type == 'course') {
					uni.navigateTo({
						url: '/pages/course/course?id=' + s.course_id,
					});
				}
			},
			refreshCouponList() {
				if (this.$refs.couponList && this.$refs.couponList[0]) {
					this.$refs.couponList[0].getData()
				}
			},
			getData() {
				this.$api.getIndexData().then(data => {
					this.templates = data
				}).finally(() => {
					this.loading = false
					uni.stopPullDownRefresh()
				})
			},
			openCourseList() {
				uni.navigateTo({
					url: '/pages/list/list?module=course',
				});
			}
		}
	}
</script>

<style>

</style>