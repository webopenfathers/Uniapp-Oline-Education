<template>
	<view>
		<course-list :item='detail' type="one"></course-list>

		<view class="divider"></view>

		<uni-list>
			<uni-list-item title="优惠券" :showArrow="true">
				<view slot="footer" class="font-sm">
					{{coupon_count?`请选择优惠券(${coupon_count}张)`:'暂无可用'}}

				</view>
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
				type: null,
				coupon_count: 0
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
				this.getUserableCouponCount()
			}).catch(err => {
				uni.navigateBack({
					delta: 1
				});
			})
		},
		methods: {
			getUserableCouponCount() {
				uni.showLoading({
					title: '加载中...',
					mask: false
				})
				this.$api.getUserableCouponCount({
					goods_id: this.id,
					type: this.type == 'course' ? 'course' : 'column'
				}).then(res => {
					this.coupon_count = res
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>