<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card isFull>
				<!-- 头部 -->
				<view class="flex justify-between">
					<text class="h4 font-weight-bold">{{item.title}}</text>
					<text class="text-danger font-sm">时长: {{item.expire}}分钟</text>
				</view>
				<!-- 身体 -->
				<view class="flex my-3">
					<text class="flex-1">题目总数: {{item.question_count}}</text>
					<text class="flex-1">总分数: {{item.total_score}}</text>
					<text class="flex-1">及格分: {{item.pass_score}}</text>
				</view>
				<view slot="actions" class="flex justify-end mb-1">
					<!-- actions 底部-->
					<main-button b-class="px-3" b-style="height:80rpx" :disabled='item.is_test'
						@click='startTest(item.id)'>
						<text class="font">{{item.is_test?'你考过了':'参加考试'}}</text>
					</main-button>
				</view>
			</uni-card>


			<!-- 分割线 -->
			<view class="divider"></view>
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
				limit: 5,
				list: []
			}
		},
		created() {
			this.getData()
			uni.$on('refreshTestList', this.refresh)
		},
		destroyed() {
			uni.$off('refreshTestList', this.refresh)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			refresh() {
				this.page = 1
				this.getData().finally(() => {
					uni.stopPullDownRefresh()
				})
			},
			startTest(id) {
				uni.showModal({
					content: '是否要开始考试',
					success: (res) => {
						if (res.cancel) {
							return
						}
						this.authJump('/pages/test-detail/test-detail?id=' + id)
					}
				});

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
				return this.$api.getTestList({
					page: this.page,
					limit: this.limit
				}).then(res => {
					// 等于1是刷新，其余是加载更多
					this.list = page === 1 ? res.rows : [...this.list, ...res.rows],
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