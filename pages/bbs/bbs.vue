<template>
	<view>
		<scroll-view scroll-x="true" class="px-1 pt-2 scroll-row">
			<view v-for="(item,index) in bbs" :key="index" class="border px-3 py-1 scroll-row-item  rounded mx-1 mb-2"
				:class="activeIndex===index?'bg-main text-white':'bg-light text-muted'">{{item.title}}</view>

			<!-- 向右滑动加载更多 -->
			<view class="scroll-row-item">
				<uni-load-more :status="bbsLoadStatus" :icon-size="13"></uni-load-more>
			</view>
		</scroll-view>

		<view class="divider"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bbsLoadStatus:'loading',
				activeIndex: 0,
				bbs: [{
						"id": 29,

						"title": "新的社区"

					},
					{
						"id": 28,

						"title": "新的社区"

					},
					{
						"id": 27,

						"title": "新的社区223"

					},
					{
						"id": 26,

						"title": "新的社区1"

					},
					{
						"id": 24,

						"title": "新的社区"

					},
					{
						"id": 5,

						"title": "第一个社区"

					},
					{
						"id": 4,

						"title": "第二个社区"

					},
					{
						"id": 1,

						"title": "第一个社区"

					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>