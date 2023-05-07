<template>
	<view>

		<view v-for="(item,index) in list" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options" @click="onClick(item)">
					<course-list type="one" :item="item.goods"></course-list>
				</uni-swipe-action-item>
			</uni-swipe-action>
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
				list: [],
				options: [{
					text: "取消收藏",
					style: {
						backgroundColor: '#dd524d'
					}
				}]
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
			onClick(item) {
				uni.showLoading({
					title: '操作中...',
					mask: false
				});

				this.$api.uncollect({
					goods_id: item.goods.id,
					type: item.type
				}).then(res => {
					this.$toast('取消收藏成功')
					this.page = 1
					this.getData()
				}).finally(() => {
					uni.hideLoading()
				})
			},
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
				return this.$api.getMyFavaList({
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
</style>