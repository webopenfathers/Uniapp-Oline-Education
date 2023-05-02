<template>
	<view>
		<scroll-view scroll-x="true" class="px-1 pt-2 scroll-row" @scrolltolower="handleBbsLoadMore">
			<view v-for="(item,index) in bbs" :key="index" class="border px-3 py-1 scroll-row-item  rounded mx-1 mb-2"
				:class="activeIndex===index?'bg-main text-white':'bg-light text-muted'" @click="changeBbs(index)">
				{{item.title}}
			</view>

			<!-- 向右滑动加载更多 -->
			<view v-if="bbsLoadStatus=='loading'" class="scroll-row-item">
				<uni-load-more :status="bbsLoadStatus" :icon-size="13"></uni-load-more>
			</view>
		</scroll-view>

		<view class="divider"></view>

		<view class="flex py-2">
			<view class="flex-1 flex justify-center align-center text-muted font-md">
				<text class="font-weight-bold mr-2">总帖子</text>{{postCount}}
			</view>
			<view class="flex-1 flex justify-center align-center text-muted font-md">
				<text class="font-weight-bold mr-2">总用户</text>{{userCount}}
			</view>
		</view>

		<view class="divider"></view>

		<post-list v-for="(item,index) in list" :key="index" :item="item" @support='handleSupport'></post-list>
		<uni-load-more :status="loadStatus" :icon-size="13"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userCount: 0,
				postCount: 0,
				bbsLoadStatus: 'loading',
				activeIndex: 0,
				bbs: [],
				bbsQuery: {
					page: 1
				},
				listQuery: {
					page: 1,
					keyword: '',
					bbs_id: 0
				},
				list: [],
				loadStatus: 'loading'
			}
		},
		onLoad() {
			this.getBbs()
			this.getData()
		},
		// 下拉
		onPullDownRefresh() {
			this.refresh()
		},
		// 上拉
		onReachBottom() {
			this.handleLoadMore()
		},
		// 输入框输入
		onNavigationBarSearchInputConfirmed(e) {
			this.listQuery.keyword = e.text
			this.refresh()
		},
		// 监听按钮点击
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/add-post/add-post',
			});
		},
		methods: {
			handleSupport(id) {
				let item = this.list.find(o => o.id == id)
				if (!item) return

				let k = !item.issupport ? 'supportPost' : 'unSupportPost'
				let msg = !item.issupport ? '点赞成功' : '取消点赞'
				this.$api[k]({
					post_id: item.id
				}).then(res => {
					item.support_count = !item.issupport ? (item.support_count + 1) : (item.support_count - 1)
					item.issupport = !item.issupport
					this.$toast(msg)
				})
			},
			// 下拉刷新
			refresh() {
				this.listQuery.page = 1
				this.getData().finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			changeBbs(index) {
				if (this.activeIndex === index) return
				this.activeIndex = index
				this.listQuery.bbs_id = this.bbs[index].id
				this.listQuery.page = 1
				this.list = []
				this.getData()
			},
			getData() {
				this.loadStatus = 'loading'
				let page = this.listQuery.page
				return this.$api.getPostList(this.listQuery).then(res => {
					this.list = page === 1 ? res.rows : [...this.list, ...res.rows]
					this.loadStatus = res.rows.length < 10 ? 'noMore' : 'more'
				}).catch(err => {
					this.loadStatus = 'more'
					if (this.listQuery.page > 1) {
						this.listQuery.page -= 1
					}
				})
			},
			// 上拉加载更多
			handleLoadMore() {
				if (this.loadStatus !== 'more') return
				this.listQuery.page++
				this.getData()
			},
			handleBbsLoadMore() {
				if (this.bbsLoadStatus !== 'more') return
				this.bbsQuery.page++
				this.getBbs()
			},
			getBbs() {
				this.bbsLoadStatus = 'loading'
				this.$api.getBbsList(this.bbsQuery).then(res => {
					this.postCount = res.postCount
					this.userCount = res.userCount
					let bbs = this.bbsQuery.page === 1 ? res.rows : [...this.bbs, ...res.rows]
					if (this.bbsQuery.page === 1) {
						bbs.unshift({
							id: 0,
							title: "全部"
						})
					}
					this.bbs = bbs
					this.bbsLoadStatus = res.rows.length < 10 ? 'noMore' : 'more'
				}).catch(err => {
					this.bbsLoadStatus = 'more'
					if (this.bbsQuery.page > 1) {
						this.bbsQuery.page -= 1
					}
				})
			}

		}
	}
</script>

<style>

</style>