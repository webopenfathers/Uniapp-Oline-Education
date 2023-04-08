<template>
	<view>
		<view class="flex text-white mb-3" v-for="(item,index) in list" :key="index"
			:class="{'coupon-used':item.btn!=='立即使用'}">
			<view class="flex flex-column flex-1 bg-hover-warning p-2" style="border-right: 4rpx dashed #fff;">
				<text class="font-lg">￥{{item.price}}</text>
				<text class="font-sm">适用{{item.typeName}}：{{item.title}}</text>
			</view>
			<view hover-class="bg-hover-warning" class=" flex justify-center align-center bg-warning"
				style="width: 200rpx;">
				{{item.btn}}
			</view>
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
		// 上拉加载
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
				return this.$api.getUserCoupon({
					page: this.page,
					limit: this.limit
				}).then(res => {
					res.rows = this.formatList(res.rows)
					// 等于1是刷新，其余是加载更多
					this.list = page === 1 ? res.rows : [...this.list, ...res.rows],
						this.loadStatus = res.rows.length < this.limit ? "noMore" : 'more'
				}).catch((err) => {
					this.loadStatus = 'more'
					if (page > 1) {
						this.page = this.page - 1
					}
				})
			},
			formatList(list) {
				list.forEach(v => {
					const now = (new Date()).getTime()
					const end = new Date(v.end_time).getTime()
					// true已经过期 false未过期
					v.expired = end < now
					v.btn = v.used === 1 ? '已使用' : (v.expired ? '已过期' : '立即使用')
					v.typeName = v.type === 'course' ? '课程' : "专栏"
				})

				return list
			}
		}
	}
</script>

<style>
	page {
		padding: 30rpx;
		box-sizing: border-box;
	}

	.coupon-used>view {
		background-color: #ccc !important;
	}
</style>