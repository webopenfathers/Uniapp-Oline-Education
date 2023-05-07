<template>
	<view class="flex justify-between bg-danger text-white px-3 py-2">
		<view class="">
			<view class="flex align-center">
				<text class="font mr-1">￥1.00</text>
				<text class="font-sm text-through">￥10.00</text>
			</view>
			<view class="bg-white rounded text-danger font-sm py-1 px-2 mt-1">2人团</view>
		</view>


		<view class="flex align-center">
			<uni-countdown color="#fff" background-color="#c3152e" border-color="#fff" :day="1" :hour="2" :minute="30"
				:second="0"></uni-countdown>
		</view>
	</view>
</template>

<script>
	export default {
		name: "active-bar",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>