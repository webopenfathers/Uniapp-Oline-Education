<template>
	<view class='code-btn bg-main' hover-class="bg-main-hover" @click="sendCode">
		{{time>0?((time)+'s'):'发送'}}
	</view>
</template>

<script>
	let timer = null
	export default {
		name: "code-btn",
		props: {
			phone: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {
				time: 0
			};
		},
		methods: {
			sendCode() {
				console.log(999999);
				if (this.time > 0) {
					return
				}
				this.$api.getCaptcha({
					phone: this.phone
				}).then(res => {
					if (typeof res === 'number') {
						this.$toast('验证码：' + res)
					} else {
						this.$toast('发送成功')
					}
					this.time = 60
					timer = setInterval(() => {
						this.time--
						if (this.time <= 0) {
							clearInterval(timer)
						}
					}, 1000)
				})
			}
		}
	}
</script>

<style>
	.code-btn {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 200rpx;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		border-top-right-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
	}
</style>