<template>
	<view class="bg-main main-btn" hover-class="bg-main-hover" @click="onClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "main-button",
		data() {
			return {

			};
		},
		methods: {
			onClick() {
				this.$emit("click")
			}
		}
	}
</script>

<style>

</style>