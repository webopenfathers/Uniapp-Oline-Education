<template>
	<view :class="bClass + ' '+ (disabled?'bg-main-disable':'')" :style="bStyle" class="bg-main main-btn"
		hover-class="bg-main-hover" @click="onClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "main-button",
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			bClass: {
				type: String,
				default: ''
			},
			bStyle: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			onClick() {
				if (this.disabled) return
				this.$emit("click")
			}
		}
	}
</script>

<style>

</style>