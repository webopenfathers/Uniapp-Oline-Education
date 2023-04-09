<template>
	<view class="flex flex-column" style="height: 100%;">
		<!-- tab栏 -->
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
		<!-- 左右滑动的内容区域 -->
		<swiper :current="current" :duration="200" class="flex-1 flex flex-column" @change="swiperChange">
			<swiper-item class="flex" v-for="(t,tI) in tabs" :key="tI">
				<!-- 垂直方向滚动条 -->
				<scroll-view scroll-y="true" class=" flex-1" @scrolltolower="handleLoadMore(t)">
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
					list: [],
					page: 1,
					type: 'course'
				}, {
					name: "专栏",
					loadStatus: 'more',
					list: [],
					page: 1,
					type: 'column'
				}],
				keyword: ''
			}
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getData()
		},
		// 点击搜索框返回上一页
		onNavigationBarSearchInputClicked() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			clickTab(index) {
				this.swiperChange({
					detail: {
						current: index
					}
				})
			},
			swiperChange(e) {
				this.current = e.detail.current
				let tab = this.tabs[this.current]
				// 防止重复加载
				if (tab.loadStatus == 'more' && tab.page == 1) {
					this.getData()
				}
			},
			getData() {
				let tab = this.tabs[this.current]
				tab.loadStatus = 'loading'
				this.$api.search({
					keyword: this.keyword,
					page: tab.page,
					type: tab.type
				}).then(res => {
					console.log(res);
					tab.list = tab.page == 1 ? res.rows : [...tab.lis, ...res.rows]
					tab.loadStatus = res.rows.length < 10 ? 'noMore' : 'more'
				}).catch(err => {
					tab.loadStatus = 'more'
					if (tab.page > 1) {
						tab.page = tab.page - 1
					}
				})
			},
			handleLoadMore(t) {
				if (t.loadStatus != 'more') return
				t.page = t.page + 1
				this.getData()
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