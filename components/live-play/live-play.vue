<template>
	<view>
		<!-- #ifdef H5 -->
		<view id="video"></view>
		<!-- #endif  -->
		<scroll-view scroll-y="true" class="bg-danger" :style="'height:'+scrollH+'px;'">
			<view></view>
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
				videoContext: null
			};
		},
		created() {
			let res = uni.getSystemInfoSync()
			this.scrollH = res.windowHeight - uni.upx2px(420) - 50
		},
		mounted() {
			this.initH5Video()
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
				// 一级评论
				let d = {
					post_id: this.detail.id,
					content,
					reply_id: 0
				}

				if (this.commentForm.reply_user) {
					d.reply_id = this.commentForm.reply_id
					d.reply_user = this.commentForm.reply_user
				}
				this.$api.replyPost(d).then(res => {
					this.$toast('评论成功')
					this.page = 1
					this.getCommentList()
					uni.$emit('refreshBbs')
				})
			},
		}
	}
</script>

<style>

</style>