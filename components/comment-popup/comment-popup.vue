<template>
	<view>
		<uni-popup ref="popup" type="bottom">
			<view style="750rpx;height: 400rpx;" class="bg-white">
				<!-- 头部 -->
				<view style="height: 100rpx;width: 100%; box-sizing: border-box;"
					class="flex align-center  border-bottom px-3">
					<text class="flex-1">发表</text>
					<button type="primary" size="mini" :disabled="content==''" @click="send">发送</button>
				</view>

				<!-- 文本域 -->
				<textarea v-model="content" placeholder="发表评论..." class="p-2"
					style="width: 100%;box-sizing: border-box;" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "comment-popup",
		data() {
			return {
				content: ''
			};
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			send() {
				this.$emit('send', this.content)
				this.$refs.popup.close()
				this.content = ''
			}
		}
	}
</script>

<style>

</style>