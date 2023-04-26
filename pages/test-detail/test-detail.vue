<template>
	<view>
		<timer-box @end='end'></timer-box>
		123
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			end() {
				console.log('自动提交试卷');
			}
		}
	}
</script>

<style>

</style>