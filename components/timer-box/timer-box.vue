<template>
	<view>
		<view class="timer-box">
			考试时间 {{time_out | formatTime}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "timer-box",
		filters: {
			formatTime(data) {
				let hours = parseInt(data % (60 * 60 * 24) / (60 * 60))
				let minutes = parseInt(data % (60 * 60) / 60)
				let seconds = data % 60

				return (hours < 10 ? ('0' + hours) : hours) + ':' +
					(minutes < 10 ? ('0' + minutes) : minutes) + ':' +
					(seconds < 10 ? ('0' + seconds) : seconds)
			}
		},
		props: {
			expire: {
				type: Number,
				default: 120
			},
		},
		data() {
			return {
				time_out: 0
			};
		},
		mounted() {
			this.time_out = this.expire * 60
		}
	}
</script>

<style>
	.timer-box {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		color: red;
		border-top: 1rpx solid red;
		border-bottom: 1rpx solid red;
		padding: 20rpx 0rpx;
		font-size: 35rpx;
		height: 50rpx;
		position: fixed;
		left: 0;
		right: 0;
		z-index: 1000;
	}
</style>