<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card isFull>
				<!-- 头部 -->
				<view class="flex justify-between">
					<text class="h4 font-weight-bold">{{item.testpaper.title}}</text>
					<text class="font-sm"
						:class="item.answer_status?'text-success':'text-danger'">{{item.answer_status?'考试完成':'考试中'}}</text>
				</view>
				<!-- 身体 -->
				<view class="flex my-3">
					<text class="flex-1">题目总数: {{item.testpaper.question_count}}</text>
					<text class="flex-1"
						:class="item.read_status===0?'text-danger':''">最终得分：{{item.read_status?item.score:'正在阅卷'}}</text>
				</view>
				<view slot="actions" class="flex text-light-muted py-2">
					{{item.created_time}}
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
						uni.navigateTo({
							url: '/pages/test-detail/test-detail?id=' + id,
						});
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
				return this.$api.getMyTestList({
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