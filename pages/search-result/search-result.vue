<template>
	<view>
		<tab :current="current" :tabs="tabs" @change='clickTab'></tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabs: [{
					name: '课程'

				}, {
					name: "专栏"
				}]
			}
		},
		// 点击搜索框返回上一页
		onNavigationBarSearchInputClicked() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			clickTab(index) {
				this.current = index
			}
		}
	}
</script>

<style>

</style>