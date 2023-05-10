<template>
	<view>
		<view class="flex flex-wrap">
			<course-list v-for="(item,index) in list" :key="index" :item="item"
				:type="module==='course' || module==='column'?'one':'two'" :tag='tag'>
				<text v-if="module=='live'" slot='desc' class="font-sm my-1"
					:class="item.status=='直播中'?'text-danger':'text-light-muted'">
					{{item.status}}
				</text>
			</course-list>
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
				group: '拼团',
				live: '直播'
			}
			uni.setNavigationBarTitle({
				title: t[this.module] + '列表'
			})
		},
		computed: {
			tag() {
				if (this.module === 'course' || this.module === 'column' || this.module === 'live') {
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
					group: 'getGroup',
					live: 'getLive'
				}
				return this.$api[fun[this.module]]({
					page: this.page,
					limit: this.limit
				}).then(res => {
					if (this.module == 'live') {
						res.rows = res.rows.map(o => {
							let start_time = (new Date(o.start_time)).getTime()
							let end_time = (new Date(o.end_time)).getTime()
							let now = Date.now()
							if (start_time > now) {
								o.status = '未开始'
							} else if (end_time < now) {
								o.status = '已结束'
							} else {
								o.status = '直播中'
							}
							return o
						})
					}



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