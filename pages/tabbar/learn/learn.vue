<template>
	<view>
		学习
		<no-login v-if="!token"></no-login>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				token: state => state.token
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>