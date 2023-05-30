<template>
	<view>
		<!-- H5端直播间 -->
		<!-- #ifdef H5 -->
		<view id="video"></view>
		<!-- #endif  -->


		<!-- 微信小程序端直播间 -->
		<!-- #ifdef MP -->
		<live-player :src="detail.playUrl" autoplay @statechange="statechange" @error="error"
			style="width: 750rpx; height: 420rpx;" />
		<!-- #endif -->


		<scroll-view scroll-y="true" class="bg-light" :style="'height:'+scrollH+'px;'" :scroll-into-view="scrollInto">
			<view class="font text-danger p-2">
				系统提示：直播内容及互动评论必须严格遵守直播规范，严禁传播违法违规，低俗血暴，吸烟酗酒，造谣诈骗等不良有害信息。
			</view>
			<view :id="'live_'+item.id" class="p-2 font" v-for="(item,index) in danmuList" :key="index">
				<text class="text-muted">{{item.name}}：</text>
				{{item.content}}
			</view>
		</scroll-view>


		<view style="height: 50px;"></view>
		<!-- 底部操作条 -->
		<view style="height: 50px;z-index: 1;" class="fixed-bottom bg-white flex align-center px-3">
			<!-- 输入框样式 -->
			<view class=" border rounded flex-1 px-2 py-1 text-light-muted bg-light mr-2" @click="openComment">
				说一句吧
			</view>
		</view>

		<!-- 评论组件 -->
		<comment-popup ref="comment" @send='sendComment'></comment-popup>
	</view>
</template>

<script>
	// #ifdef H5
	import 'xgplayer';
	import FlvPlayer from 'xgplayer-flv';
	// #endif
	export default {
		name: "live-play",
		props: {
			detail: Object,
		},
		data() {
			return {
				scrollH: 500,
				videoContext: null,
				danmuList: [],
				scrollInto: '',
				currentTime: 0
			};
		},
		created() {
			let res = uni.getSystemInfoSync()
			this.scrollH = res.windowHeight - uni.upx2px(420) - 50

			// 获取弹幕列表
			this.getData()
		},
		beforeDestroy() {
			// #ifdef H5
			this.videoContext.off('timeupdate', this.handleTimeUpdate)
			// #endif
		},
		methods: {
			// #ifndef MP
			statechange(e) {
				console.log('live-player code:', e.detail.code)
			},
			error(e) {
				console.error('live-player error:', e.detail.errMsg)
			},
			// #endif

			getData() {
				this.$api.getLiveComment({
					page: 1,
					limit: 500,
					live_id: this.detail.id
				}).then(res => {
					// #ifdef H5
					this.initH5Video(res.rows)
					// #endif
				})
			},
			initH5Video(comments = []) {
				comments = comments.map(o => {
					return {
						duration: 5000,
						id: o.id,
						start: o.time,
						txt: `${o.name}:${o.content}`,
						style: {
							color: o.color,
							borderRadius: '50px',
							padding: '5px 5px',
							backgroundColor: 'rgba(255, 255, 255, 0.1)'
						}
					}
				})

				this.videoContext = new FlvPlayer({
					id: 'video',
					url: this.detail.playUrl,
					isLive: true,
					playsinline: true,
					height: uni.upx2px(420),
					width: window.innerWidth,
					danmu: {
						panel: true, //弹幕面板
						comments, //弹幕数组
						area: { //弹幕显示区域
							start: 0, //区域顶部到播放器顶部所占播放器高度的比例
							end: 1 //区域底部到播放器顶部所占播放器高度的比例
						},
						closeDefaultBtn: false, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
						defaultOff: false //开启此项后弹幕不会初始化，默认初始化弹幕
					}
				});

				this.videoContext.on('timeupdate', this.handleTimeUpdate)
			},
			handleTimeUpdate(e) {
				this.currentTime = e.currentTime
			},
			openComment() {
				this.$refs.comment.open()
			},
			sendComment(content) {
				if (content == '') return this.$toast('弹幕内容不能为空')
				uni.showLoading({
					title: '发送中...',
					mask: false
				});
				this.$api.sendLiveComment({
					live_id: this.detail.id,
					content,
					time: parseInt(this.currentTime * 1000),
					color: this.getRandomColor()
				}).then(res => {
					this.danmuList.push(res)

					setTimeout(() => {
						this.scrollInto = 'live_' + res.id
					}, 300)


					// 同步弹幕到视频中
					// #ifdef H5
					this.videoContext.danmu.sendComment({ //发送弹幕
						duration: 5000,
						id: res.id,
						start: res.time,
						txt: `${res.name}:${res.content}`,
						style: {
							color: res.color,
							borderRadius: '50px',
							padding: '5px 5px',
							backgroundColor: 'rgba(255, 255, 255, 0.1)'
						}
					})
					// #endif
				}).finally(() => {
					uni.hideLoading()
				})
			},
			getRandomColor: function() {
				const rgb = []
				for (let i = 0; i < 3; ++i) {
					let color = Math.floor(Math.random() * 256).toString(16)
					color = color.length == 1 ? '0' + color : color
					rgb.push(color)
				}
				return '#' + rgb.join('')
			}
		}
	}
</script>

<style>

</style>