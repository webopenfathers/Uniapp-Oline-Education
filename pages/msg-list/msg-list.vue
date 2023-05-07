<template>
	<view class="p-2">
		<view class="bg-white rounded p-2" v-for="(item,index) in list" :key="index">
			<view class="">{{item.content}}</view>
			<text class="text-muted font-sm">{{item.created_time}}</text>
		</view>


		<!-- 上拉显示更多 -->
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loading',
				page: 1,
				limit: 10,
				list: []
			}
		},
		created() {
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getData().finally(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			// 上拉加载更多
			handleLoadMore() {
				if (this.loadStatus !== 'more') {
					return
				}
				this.page = this.page + 1
				this.getData()
			},
			getData() {
				let page = this.page
				return this.$api.getMsgList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					// 等于1是刷新，其余是加载更多
					this.list = page === 1 ? res.rows : [...this.list, ...res.rows]
					this.loadStatus = res.rows.length < this.limit ? "noMore" : 'more'
				}).catch((err) => {
					this.loadStatus = 'more'
					if (page > 1) {
						this.page = this.page - 1
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #eee;
	}
</style>