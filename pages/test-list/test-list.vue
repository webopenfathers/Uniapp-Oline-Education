<template>
	<view>
		<uni-card isFull>
			<!-- 头部 -->
			<view class="flex justify-between">
				<text class="h4 font-weight-bold">标题</text>
				<text class="text-danger font-sm">时长60分钟</text>
			</view>
			<!-- 身体 -->
			<view class="flex my-3">
				<text class="flex-1">题目总数:5</text>
				<text class="flex-1">总分数:5</text>
				<text class="flex-1">及格分:5</text>
			</view>
			<view slot="actions" class="flex justify-end">
				<!-- actions 底部-->
				<main-button b-class="px-3" b-style="height:80rpx" disabled>
					<text class="font">开始考试</text>
				</main-button>
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
				loadStatus: 'loading',
				page: 1,
				limit: 5,
				list: []
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>