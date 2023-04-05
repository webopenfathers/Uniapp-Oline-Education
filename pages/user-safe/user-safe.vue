<template>
	<view>
		<uni-list :border="false">
			<uni-list-item :border="false" title="原密码">
				<input type="text" v-model='form.opassword' slot='footer' class="font-md" style="text-align: right;"
					placeholder="请输入原密码" placeholder-style="color:#bbb" />
			</uni-list-item>
			<uni-list-item :border="false" title="新密码">
				<input type="text" v-model='form.password' slot='footer' class="font-md" style="text-align: right;"
					placeholder="请输入新密码" placeholder-style="color:#bbb" />
			</uni-list-item>
			<uni-list-item :border="false" title="确认密码">
				<input type="text" v-model='form.repassword' slot='footer' class="font-md" style="text-align: right;"
					placeholder="请输入确认密码" placeholder-style="color:#bbb" />
			</uni-list-item>
		</uni-list>

		<view class="p-3">
			<main-button @click='submit'>保 存</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					opassword: '',
					password: '',
					repassword: ''
				}
			}
		},
		methods: {
			submit() {
				uni.showLoading({
					title: '提交中...',
					mask: true
				})

				let data = Object.assign(this.form, {})
				this.$api.updatePassword(data).then(res => {
					this.$toast('修改成功')

					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
						this.$store.dispatch('logout')
					}, 350)
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>