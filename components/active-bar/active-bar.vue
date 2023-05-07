<template>
	<view class="flex justify-between bg-danger text-white px-3 py-2">
		<view class="flex flex-column align-start">
			<view class="flex align-center">
				<text class="font mr-1">￥{{price}}</text>
				<text class="font-sm text-through">￥{{t_price}}</text>
			</view>
			<view class="bg-white rounded text-danger font-sm py-1 px-2 mt-1">
				<slot></slot>
			</view>
		</view>


		<view class="flex align-center">
			<text class="font-sm">距结束</text>
			<uni-countdown color="#fff" splitorColor="#fff" background-color="#c3152e" border-color="#fff" :day="t.day"
				:hour="t.hour" :minute="t.minute" :second="t.second"></uni-countdown>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		name: "active-bar",
		props: {
			price: [Number, String],
			t_price: [Number, String],
			endTime: [String]
		},
		data() {
			return {
				t: {
					day: 0,
					hour: 0,
					minute: 0,
					second: 0
				}
			};
		},
		created() {
			this.formatTime()
		},
		watch: {
			endTime(newVal) {
				this.formatTime()
			}
		},
		methods: {
			formatTime() {
				this.t = tool.dateCount(this.endTime)
			}
		}
	}
</script>

<style>

</style>