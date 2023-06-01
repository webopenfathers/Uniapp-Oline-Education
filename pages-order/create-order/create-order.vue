<template>
	<view>
		<book-list disabled v-if="type=='book'" :item='detail'></book-list>
		<course-list v-else :item='detail' type="one"></course-list>


		<view class="divider"></view>

		<uni-list>
			<uni-list-item title="优惠券" :showArrow="true" @click="chooseCoupon" :clickable="true">
				<view slot="footer" class="font-sm">
					{{ coupon_desc }}

				</view>
			</uni-list-item>
			<uni-list-item title="支付方式">
				<view slot="footer" class="text-success">微信支付</view>
			</uni-list-item>
		</uni-list>


		<view class="height:75px"></view>
		<view class="fixed-bottom p-2 border-top bg-white">
			<main-button @click='submit' v-if="detail.price">立即购买￥{{price}}</main-button>
		</view>
	</view>
</template>

<script>
	import $tool from '@/common/tool.js'
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
				coupon_count: 0,
				user_coupon_id: 0,
				coupon_price: 0
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


			// 全局监听
			uni.$on('chooseCoupon', this.handleChooseCoupon)
		},
		beforeDestroy() {
			uni.$off('chooseCoupon', this.handleChooseCoupon)
		},
		computed: {
			price() {
				let p = ((this.detail.price * 1000 - this.coupon_price * 1000) / 1000).toFixed(2)
				return p <= 0 ? 0 : p
			},
			coupon_desc() {
				if (this.coupon_price) {
					return `减${this.coupon_price}元`
				}
				return this.coupon_count ? `请选择优惠券(${this.coupon_count}张)` : '暂无可用'
			}
		},
		methods: {
			submit() {
				uni.showLoading({
					title: '创建订单中...',
					mask: false
				})


				let data = {
					goods_id: this.detail.id,
					type: this.type,
					user_coupon_id: this.user_coupon_id
				}

				let type = 'save'

				if (this.type == 'flashsale') {
					data = {
						flashsale_id: this.id
					}
					type = 'flashsale'
				}

				this.$api.createOrder(data, type).then(res => {
					// H5支付---条件编译
					// #ifdef H5
					uni.navigateTo({
						url: `/pages-order/h5pay/h5pay?no=${res.no}`,
					});
					// #endif


					// app端支付/微信小程序端支付
					// #ifdef APP-PLUS || MP
					$tool.wxpay(res.no, () => {
						uni.navigateBack({
							delta: 1
						})
					})
					// #endif


				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleChooseCoupon(e) {
				this.user_coupon_id = e.user_coupon_id
				this.coupon_price = e.price
			},
			chooseCoupon() {
				if (this.coupon_count == 0) return
				this.authJump(`/pages-user/my-coupon/my-coupon?goods_id=${this.id}&type=${this.type}`)
			},
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