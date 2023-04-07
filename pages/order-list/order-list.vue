<template>
	<view>
		<!-- 卡片组件 -->
		<uni-card isFull>
			<view>
				<view class="flex font-sm text-muted py-2 justify-between">
					<text>订单时间：2022-06-32 10:00:00</text>
					<text>订单号：123456789</text>
				</view>
				<view class="flex font-md">
					内容
				</view>
				<view class="flex justify-end font-md text-danger font-weight-bold">
					￥10.00
				</view>
			</view>
			<view slot='actions' class="font-md text-dark font-weight-bold py-2">
				交易完成
			</view>
		</uni-card>
		<!-- 分割线 -->
		<view class="divider"></view>

		<!-- 上拉显示更多 -->
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'more'
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>