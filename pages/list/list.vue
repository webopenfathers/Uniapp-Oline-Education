<template>
	<view>
		<view class="flex flex-wrap">
			<course-list v-for="(item,index) in list" :key="index" :item="item"
				:type="module==='course' || module==='column'?'one':'two'" :tag='tag'></course-list>
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
				module: 'course'
			}
		},
		onLoad(e) {
			if (e.module) this.module = e.module
			let t = {
				course: '课程',
				column: '专栏',
				flashsale: '秒杀',
				group: '拼团'
			}
			uni.setNavigationBarTitle({
				title: t[this.module] + '列表'
			})
		},
		computed: {
			tag() {
				if (this.module === 'course' || this.module === 'column') {
					return ''
				}

				return this.module == 'group' ? '拼团价' : '秒杀价'
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
				let fun = {
					course: 'getCourseList',
					column: 'getColumnList',
					flashsale: 'getFlashSale',
					group: 'getGroup'
				}
				return this.$api[fun[this.module]]({
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