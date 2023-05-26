<template>
	<view class="flex flex-wrap py-2">
		<view @click="open(item)" class="" style="width: 25%;" v-for="(item,index) in list" :key="index"
			hover-class="bg-light" class="flex flex-column align-center justify-center py-1">
			<image :src="item.src" mode="widthFix" style="width: 70rpx;height: 70rpx;border-radius: 100%;"></image>
			<text class="font-sm text-muted mt-1">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "icon-nav",
		props: {
			list: Array
		},
		data() {
			return {

			};
		},
		methods: {
			open(item) {
				if (item.type == 'webview') {
					this.$openWebview(item.url)
					return
				}
				switch (item.module) {
					case 'test':
						uni.navigateTo({
							url: '/pages/test-list/test-list'
						})
						break;
					case 'bbs':
						uni.navigateTo({
							url: '/pages/bbs/bbs'
						})
						break;
					case 'book':
						uni.navigateTo({
							url: '/pages/book-list/book-list'
						})
						break;
					default:
						uni.navigateTo({
							url: '/pages/list/list?module=' + item.module
						})
						break;
				}
			}
		}
	}
</script>

<style>

</style>