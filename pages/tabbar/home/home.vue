<template>
	<view>
		<button type="default" @click="openLogin">登录页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			openLogin(){
			uni.navigateTo({
				url:'../../login/login'
			})	
			}
		}
	}
</script>

<style>

</style>
