<template>
	<view>
		<uni-card :title="count+'人在拼单,可直接参与'" isFull>
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
					<button class="mx-1" type="primary" size="mini">去拼单</button>
				</swiper-item>
			</swiper>
		</uni-card>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		name: "group-works",
		data() {
			return {
				group_id: 0,
				count: 1,
				list: []
			};
		},
		methods: {
			int(group_id) {
				this.group_id = group_id
				this.$api.getGroupWorkList({
					group_id: this.group_id,
					page: 1
				}).then(res => {
					this.count = res.count
					this.list = res.rows.map(o => {
						let end = (new Date(o.created_time)).getTime() + 24 * 60 * 60 * 1000
						o.d = tool.dateCount(end)
						return o
					})
				})
			}
		}
	}
</script>

<style>

</style>