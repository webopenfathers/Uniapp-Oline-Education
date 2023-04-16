<template>
	<!-- 目录部分 -->
	<view class="flex align-center p-3 border-bottom" hover-class="bg-light">
		<text class="flex-shrink text-muted" style="width:90rpx">{{(index+1)|formatIndex}}</text>
		<view class="flex flex-column  align-start">
			{{title}}
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "menu-item",
		props: {
			title: {
				type: String,
				default: ''
			},
			index: Number
		},
		data() {
			return {

			};
		},
		filters: {
			formatIndex(value) {
				if (value < 10) {
					return '00' + value
				}
				if (value >= 10 && value < 100) {
					return '0' + value
				}
				return value
			}
		}
	}
</script>

<style>

</style>