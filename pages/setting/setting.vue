<template>
	<view>
		<uni-list :border="false">
			<uni-list-item :border="false" title="账户安全" show-arrow></uni-list-item>
			<uni-list-item :border="false" title="清除缓存">
				<text slot='footer'>1.00MB</text>
			</uni-list-item>
			<uni-list-item :border="false" title="检查更新" show-arrow></uni-list-item>
			<uni-list-item :border="false" title="当前版本">
				<text slot='footer'>1.0.0</text>
			</uni-list-item>
		</uni-list>

		<!-- 退出登录按钮 -->
		<view class="p-3">
			<main-button @click=''>退出登录</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>