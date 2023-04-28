<template>
	<view>
		<!-- 倒计时 -->
		<timer-box @end='end'></timer-box>
		123
		<!-- 底部操作条 -->
		<test-actions :current='current' :total='total' @on-page='onPage'></test-actions>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 1,
				total: 4
			}
		},
		methods: {
			end() {
				console.log('自动提交试卷');
			},
			onPage(current) {
				this.current = current
			}
		}
	}
</script>

<style>

</style>