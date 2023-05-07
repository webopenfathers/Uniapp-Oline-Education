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
				type: Number,
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

				let fun = this.isfava ? 'uncollect' : 'collect'
				let msg = this.isfava ? '取消收藏' : '收藏'
				this.$api[fun]({
					goods_id: this.goods_id,
					type: this.type
				}).then(res => {
					this.$toast(msg + '成功')
					this.$emit('success', fun === 'uncollect' ? false : true)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>