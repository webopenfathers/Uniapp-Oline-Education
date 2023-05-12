<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<!-- 卡片组件 -->
			<uni-card isFull>
				<view>
					<view class="flex font-sm text-muted py-2 justify-between">
						<text>订单时间：{{item.created_time}}</text>
						<text>订单号：{{item.no}}</text>
					</view>
					<view class="flex font-md">
						{{item.goods}}
					</view>
					<view class="flex justify-end font-md text-danger font-weight-bold">
						￥{{item.price}}
					</view>
				</view>
				<view slot='actions' class="font-md flex  font-weight-bold py-2"
					:class="item.status==='success'?'text-success':'text-dark'">
					<view class="">
						{{item.status==='success'?'交易成功':'等待支付'}}
					</view>
					<view class="ml-auto">
						<main-button class="px-1" style="height: 80rpx;" v-if="item.status=='pendding'" @click='pay(item.no)'>立即支付</main-button>
					</view>
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
	import $tool from '@/common/tool.js'
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
			this.page = 1
			this.getData().finally(() => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.handleLoadMore()
		},
		methods: {
			pay(no) {
				// H5支付---条件编译
				// #ifdef H5
				uni.navigateTo({
					url: `/pages/h5pay/h5pay?no=${no}`,
				});
				// #endif


				// app端支付--微信
				// #ifdef APP-PLUS
				$tool.wxpay(no, () => {
					this.page = 1
					this.getData()
				})
				// #endif
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
				return this.$api.getOrderList({
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