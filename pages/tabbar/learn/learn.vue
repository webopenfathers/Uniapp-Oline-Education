<template>
	<view class="flex flex-column" style="height: 100%;">
		<icons-card :icons="icons"></icons-card>
		<!-- tab栏 -->
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
		<!-- 左右滑动的内容区域 -->
		<swiper :current="current" :duration="200" class="flex-1 flex flex-column" @change="swiperChange">
			<swiper-item class="flex" v-for="(t,tI) in tabs" :key="tI">
				<!-- 垂直方向滚动条 -->
				<scroll-view scroll-y="true" class=" flex-1" @scrolltolower="handleLoadMore(t)">
					<!-- 课程列表 -->
					<course-list type='one' v-for="(item,index) in t.list" :key="index" :item='item'>
						<view slot="desc" class="font-sm text-light-muted my-1">
							学习进度
						</view>
						<view class="font-sm">
							<text v-if="index==0" class="text-danger mr-1">最近学习</text>
							<text class="text-muted">已学习 {{item.progress}}%</text>
						</view>
					</course-list>
					<!-- 上拉显示更多 -->
					<uni-load-more :status="t.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<no-login v-if="!token"></no-login>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
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
				icons: [{
						icon: "icon-OrderHistory",
						name: '帖子',
					},
					{
						icon: "icon-pinglun2",
						name: '考试'
					},
					{
						icon: "icon-shoucang1",
						name: '电子书'
					},
				]
			}
		},
		computed: {
			...mapState({
				token: state => state.token
			})
		},
		onShow() {
			if (this.token) {
				this.tabs.forEach(item=>{
					item.page=1
					item.loadStatus='more'
				})
				this.getData()
			}
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
				this.$api.getUserHistory({
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