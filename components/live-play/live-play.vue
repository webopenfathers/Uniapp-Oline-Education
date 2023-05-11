<template>
	<view>
		<!-- #ifdef H5 -->
		<view id="video"></view>
		<!-- #endif  -->


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
				scrollInto: ''
			};
		},
		created() {
			let res = uni.getSystemInfoSync()
			this.scrollH = res.windowHeight - uni.upx2px(420) - 50
		},
		mounted() {
			// #ifdef H5
			this.initH5Video()
			// #endif
		},
		methods: {
			initH5Video() {
				this.videoContext = new FlvPlayer({
					id: 'video',
					url: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv',
					isLive: true,
					playsinline: true,
					height: uni.upx2px(420),
					width: window.innerWidth,
					danmu: {
						panel: true, //弹幕面板
						comments: [], //弹幕数组
						area: { //弹幕显示区域
							start: 0, //区域顶部到播放器顶部所占播放器高度的比例
							end: 1 //区域底部到播放器顶部所占播放器高度的比例
						},
						closeDefaultBtn: false, //开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
						defaultOff: true //开启此项后弹幕不会初始化，默认初始化弹幕
					}
				});
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
					time: 3000,
					color: '#FFCCCC'
				}).then(res => {
					this.danmuList.push(res)

					setTimeout(() => {
						this.scrollInto = 'live_' + res.id
					}, 300)
				}).finally(() => {
					uni.hideLoading()
				})
			},
		}
	}
</script>

<style>

</style>