<template>
	<view>
		<uni-card v-if="count>0" :title="count+'人在拼单,可直接参与'" isFull>
			<swiper vertical disable-touch :autoplay="true" :interval="3000" :duration="1000"
				:style="count>1?'height: 250rpx;':'height: 125rpx;'" :display-multiple-items="count>1?2:1">
				<swiper-item class="flex align-center border-bottom" v-for="(item,index) in list" :key="index">
					<image :src="item.users[0].avatar" mode="" style="width: 78rpx;height: 78rpx;"
						class="rounded-circle bg-dark mr-2">
					</image>
					<!-- 昵称 -->
					<text>{{item.users[0].nickname || item.users[0].username}}</text>
					<!-- 中间 -->
					<view class="ml-auto font">
						<view class="flex mb-1">
							还差
							<text class="text-danger">{{item.total-item.num}}人</text>
							拼成
						</view>
						<view class="flex align-center font text-muted">
							<text>剩余</text>
							<uni-countdown :show-day="false" background-color="#fff" border-color="#fff"
								:hour="item.d.hour" :minute="item.d.minute" :second="item.d.second"></uni-countdown>
						</view>
					</view>
					<!-- 右边 -->
					<button class="mx-1" type="primary" size="mini" @click="handleGroup(item)">去拼单</button>
				</swiper-item>
			</swiper>
		</uni-card>
	</view>
</template>

<script>
	import $tool from '@/common/tool.js'
	export default {
		name: "group-works",
		data() {
			return {
				group_id: 0,
				count: 0,
				list: []
			};
		},
		methods: {
			handleGroup(item) {
				uni.showModal({
					content: '是否要参与此次拼单',
					confirmText: '立即参与',
					success: res => {
						if (res.cancel) return

						uni.showLoading({
							title: '发起拼团中...',
							mask: true
						})

						this.$api.createOrder({
							group_id: this.group_id,
							group_work_id: item.id
						}, 'group').then(res => {

							// H5支付---条件编译
							// #ifdef H5
							uni.navigateTo({
								url: `/pages-order/h5pay/h5pay?no=${res.no}`,
							});
							// #endif


							// app端支付--微信
							// #ifdef APP-PLUS
							$tool.wxpay(res.no, () => {
								this.$emit('updateData')
							})
							// #endif

						}).catch(err => {
							console.log(err);
						}).finally(() => {
							uni.hideLoading()
						})


					}
				});
			},
			int(group_id) {
				this.group_id = group_id
				this.$api.getGroupWorkList({
					group_id: this.group_id,
					page: 1
				}).then(res => {
					this.count = res.count
					this.list = res.rows.map(o => {
						let end = (new Date(o.created_time)).getTime() + 24 * 60 * 60 * 1000
						o.d = $tool.dateCount(end)
						return o
					})
				})
			}
		}
	}
</script>

<style>

</style>