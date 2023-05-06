<template>
	<view>
		<view style="height: 50px;"></view>
		<view class="test-actions">
			<view :class="current<=1?'text-light-muted':''" class="iconfont icon-shangyibu" hover-class="bg-light"
				@click="pre"></view>
			<view hover-class="bg-light" @click="$emit('open')">
				<view class="iconfont icon-leimupinleifenleileibie"></view>
				<view class="flex align-center justify-center font-sm">
					<text class="text-main">{{current}}</text>
					<text class="">/{{total}}</text>
				</view>
			</view>
			<view hover-class="bg-light" @click="submit" v-if="showSubmit">
				<view class="iconfont icon-tijiao"></view>
				<text class="font-sm">交卷</text>
			</view>
			<view :class="current>=total?'text-light-muted':''" class="iconfont icon-xiayibu" hover-class="bg-light"
				@click="next"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "test-actions",
		props: {
			current: {
				type: Number,
				default: 1
			},
			total: {
				type: Number,
				default: 1
			},
			showSubmit: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 交卷
			submit() {
				this.$emit('submit')
			},
			// 上一页
			pre() {
				if (this.current <= 1) {
					return
				}
				this.$emit('on-page', this.current - 1)
			},
			// 下一页
			next() {
				if (this.current >= this.total) {
					return
				}
				this.$emit('on-page', this.current + 1)
			}
		}
	}
</script>

<style>
	.test-actions {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		height: 50px;
		z-index: 100;
	}

	.test-actions>view {
		flex: 1;
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.test-actions .iconfont {
		font-size: 20px;
	}
</style>