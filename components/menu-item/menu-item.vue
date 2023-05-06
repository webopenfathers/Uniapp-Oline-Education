<template>
	<!-- 目录部分 -->
	<view class="flex align-center p-3 border-bottom" hover-class="bg-light" @click="$emit('click')">
		<text class="flex-shrink" style="width:90rpx"
			:class="active?'text-main':'text-muted'">{{(index+1)|formatIndex}}</text>
		<view class="flex flex-column  align-start" :class="active?'text-main':'text-muted'">
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
			index: Number,
			active: {
				type: Boolean,
				default: false
			}
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