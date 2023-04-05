<template>
	<view>
		<button type="default" @click="openLogin">登录页</button>
		<view class="">
			{{user?user.username:'未登录'}}
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState({
				user: state => state.user
			})
		},
		data() {
			return {

			}
		},
		methods: {
			openLogin() {
				uni.navigateTo({
					url: '../../login/login'
				})
			}
		}
	}
</script>

<style>

</style>