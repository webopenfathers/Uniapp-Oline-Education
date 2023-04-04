<template>
	<view>
		<view class="divider"></view>
		<view class="flex align-center px-2 py-3">
			<text class="font-md font-weight-bold">{{type==='group'?'拼团':"秒杀"}}</text>
		</view>
		<scroll-view scroll-x="true" class="scroll-row">
			<course-list v-for="(item,index) in  list" :key="index" :item='item'></course-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "active-list",
		props: {
			type: {
				type: String,
				default: 'group'
			},
		},
		data() {
			return {
				list: []
			};
		},
		created() {
			let k = this.type === 'group' ? 'getGroup' : "getFlashSale"
			this.$api[k]({
				usable: 1
			}).then(res => {
				this.list = res.rows
			})
		}
	}
</script>

<style>

</style>