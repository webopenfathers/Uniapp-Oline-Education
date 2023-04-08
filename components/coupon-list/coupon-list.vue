<template>
	<view class="p-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view style="min-width: 310rpx;display: inline-flex;color: #fff;" class="mr-3" v-for="(item,index) in list"
				:key="index" >
				<view class="flex flex-column align-center justify-center bg-hover-warning px-3 py-2"
					style="border-right: 4rpx dashed;" :class="{'coupon-isget':item.isgetcoupon}">
					<text class="font-md">￥{{item.price}}</text>
					<text class="font-sm">适用{{item.type | formatType}}: {{item.value.title}}</text>
				</view>
				<view style="120rpx" hover-class="bg-hover-warning"
					class="flex align-center justify-center bg-warning font px-2" :class="{'coupon-isget':item.isgetcoupon}">
					{{item.isgetcoupon?'已领取':"领取"}}
				</view>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	export default {
		name: "coupon-list",
		filters: {
			formatType(type) {
				let o = {
					course: '课程',
					column: "专栏"
				}
				return o[type]
			}
		},
		data() {
			return {
				list: []
			};
		},
		created() {
			this.getData()
		},
		methods: {
			getData() {
				this.$api.getCoupon().then(res => {
					this.list = res
				})
			}
		}
	}
</script>

<style>
	/* 已领取优惠券颜色 */
	.coupon-isget {
		background-color: #dae0e5 !important;
	}
</style>