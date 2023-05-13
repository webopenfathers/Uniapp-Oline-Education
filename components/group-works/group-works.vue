<template>
	<view>
		<uni-card title="3人在拼单,可直接参与" isFull>
			<swiper vertical disable-touch :autoplay="true" :interval="3000" :duration="1000" style="height: 250rpx;"
				:display-multiple-items="2">
				<swiper-item class="flex align-center border-bottom" v-for="i in 4" :key="i">
					<image src="" mode="" style="width: 78rpx;height: 78rpx;" class="rounded-circle bg-dark mr-2">
					</image>
					<text>昵称</text>
					<!-- 中间 -->
					<view class="ml-auto font">
						<view class="flex mb-1">
							还差
							<text class="text-danger">1人</text>
							拼成
						</view>
						<view class="flex align-center font text-muted">
							剩余 20:20:20
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
	export default {
		name: "group-works",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>