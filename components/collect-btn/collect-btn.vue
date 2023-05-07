<template>
	<view>
		<text class="iconfont icon-shoucang1" :class="{'text-main':isfava}" style="font-size: 25px;"
			@click="handleCollect"></text>
	</view>
</template>

<script>
	export default {
		name: "collect-btn",
		props: {
			isfava: {
				type: Boolean,
				default: false
			},
			goods_id: {
				type: String,
				default: 0
			},
			type: {
				type: String,
				default: 'course'
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleCollect() {
				uni.showLoading({
					title: '操作中...',
					mask: false
				});
				this.$api.collect({
					goods_id: this.goods_id,
					type: this.type
				}).then(res => {
					this.$toast('收藏成功')
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>