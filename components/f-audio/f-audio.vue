<template>
	<view class="bg-light">
		<!-- 封面 -->
		<view class="px-5 pt-5">
			<image :src="poster" mode="aspectFill" class="bg-hover-light"
				style="width: 100%;height: 400rpx;border-radius: 20rpx;"></image>
		</view>
		<!-- 进度条 -->
		<view class="f-audio-slider mb-5">
			<slider @changing="onchanging" @change="onchange" :max="duration" :value="position" activeColor="#5ccc84"
				block-color="#5ccc84" :block-size="15" />
			<!-- 当前时间和剩余时间 -->
			<text class="current-time">{{currentTime | formatTime}}</text>
			<text class="duration">{{duration | formatTime}}</text>
		</view>

		<view class="f-audio-btn flex align-center justify-center pb-5">
			<text class="iconfont icon-ziyuan11" :style="loopStatus?'color:rgba(92,204,132);':''" @click="loop"></text>
			<text class="iconfont  mx-3" :class="isPlaying?'icon-tianchongxing- ':'icon-bofang2'" @click="play"></text>
			<text class="iconfont icon-shoucang"></text>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		name: "f-audio",
		props: {
			src: {
				type: String,
				default: ''
			},
			poster: {
				type: String,
				default: ''
			}
		},
		filters: {
			formatTime(s) {
				if (s == 0) {
					return '00:00:00'
				}
				return tool.formatSeconds(s)
			}
		},
		computed: {
			position() {
				return this.isPlayEnd ? 0 : this.currentTime
			}
		},
		created() {
			this.createAudio()
		},
		beforeDestroy() {
			if (this._audioContext != null && this.isPlaying) this.stop()
		},
		data() {
			return {
				_audioContext: null,
				// 是否播放
				isPlaying: false,
				// 是否播放结束
				isPlayEnd: false,
				// 当前时间
				currentTime: 0,
				// 总时长
				duration: 1,
				_isChanging: false,
				// 循环播放
				loopStatus: false
			};
		},
		methods: {
			// 创建音频
			createAudio() {
				this._audioContext = uni.createInnerAudioContext()
				this._audioContext.autoplay = false
				this._audioContext.src = this.src
				// 监听播放
				this._audioContext.onPlay(() => {

				})
				// 更刚进入获取总时长
				this._audioContext.onCanplay(() => {
					this.duration = this._audioContext.duration
				})
				// 监听播放进度
				this._audioContext.onTimeUpdate((e) => {
					if (this._isChanging) return
					this.currentTime = this._audioContext.currentTime
					this.duration = this._audioContext.duration
					if (this.duration > 0) {
						this.$emit('onProgress', ((this.currentTime / this.duration) * 100).toFixed(2))
					}
				})
				// 监听播放结束
				this._audioContext.onEnded(() => {
					this.currentTime = 0
					this.isPlaying = false
					this.isPlayEnd = false
				})
				// 监听播放错误
				this._audioContext.onError(() => {
					this.isPlaying = false
				})
			},
			// 播放
			play() {
				if (this.isPlaying) {
					return this.pause()
				}
				this.isPlaying = true
				this._audioContext.play()
				this.isPlayEnd = false
			},
			// 暂停
			pause() {
				this._audioContext.pause()
				this.isPlaying = false
			},
			// 进度条改变事件e
			onchange(e) {
				this._audioContext.seek(e.detail.value)
				// 拖动结束设为false
				this._isChanging = false
			},
			onchanging() {
				// 拖动中设为true
				this._isChanging = true
			},
			stop() {
				this._audioContext.stop()
				this.isPlaying = false
			},
			loop() {
				this.loopStatus = !this.loopStatus
				this._audioContext.loop = this.loopStatus
				this.$toast((this.loopStatus ? '开启' : '关闭') + '循环播放')
			}
		}
	}
</script>

<style>
	.f-audio-slider {
		position: relative;
	}

	.f-audio-slider text {
		position: absolute;
		top: 35rpx;
		font-size: 12px;
	}

	.f-audio-slider .current-time {
		left: 30rpx;
	}

	.f-audio-slider .duration {
		right: 30rpx;
	}

	.f-audio-btn text:first-child,
	.f-audio-btn text:last-child {
		font-size: 30px;
		color: #bbb;
	}

	.f-audio-btn text:nth-child(2) {
		font-size: 50px;
		color: rgb(92, 204, 132);
	}
</style>