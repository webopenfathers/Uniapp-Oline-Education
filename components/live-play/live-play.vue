<template>
	<view>
		<view style="width: 100%;height: 420rpx;background: #0E151D;"></view>

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
	export default {
		name: "live-play",
		props: {
			detail: Object,
		},
		data() {
			return {
				scrollH: 500
			};
		},
		created() {
			let res = uni.getSystemInfoSync()
			this.scrollH = res.windowHeight - uni.upx2px(420) - 50
		},
		methods: {
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