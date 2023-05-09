<template>
	<view>
		<course-list :item='detail' type="one"></course-list>

		<view class="divider"></view>

		<uni-list>
			<uni-list-item title="优惠券" :showArrow="true">
				<view slot="footer" class="font-sm">请选择优惠券(1张)</view>
			</uni-list-item>
			<uni-list-item title="支付方式">
				<view slot="footer" class="text-success">微信支付</view>
			</uni-list-item>
		</uni-list>


		<view class="height:75px"></view>
		<view class="fixed-bottom p-2 border-top bg-white">
			<main-button v-if="detail.price">立即购买￥{{detail.price}}</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					cover: '',
					id: 0,
					price: '',
					title: '',
					type: ''
				},
				id: 0,
				type: null
			}
		},
		onLoad(e) {
			if (!e.id || !e.type) {
				this.$toast('非法参数')
				uni.navigateBack({
					delta: 1
				});
				return
			}
			this.id = e.id
			this.type = e.type

			// 获取下单前产品信息
			this.$api.readGoods({
				id: this.id,
				type: this.type
			}).then(res => {
				this.detail = res
			}).catch(err => {
				uni.navigateBack({
					delta: 1
				});
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>