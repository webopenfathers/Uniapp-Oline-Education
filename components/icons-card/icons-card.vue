<template>
	<view class="p-3">
		<view class="flex bg-white shadow rounded">
			<view v-for="(item,index) in icons" :key="index"
				class="flex-1 flex flex-column align-center justify-center py-3" hover-class="bg-light">
				<text class="iconfont" :class="item.icon" style="font-size: 20px;color: #febd00;"></text>
				<text class="font-sm mt-1 text-secondary">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "icons-card",
		props: {
			icons: Array
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>