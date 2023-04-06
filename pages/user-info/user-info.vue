<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable :border="false" title="头像" @click="changeAvatar">
				<image slot='footer' :src="form.avatar" style="width: 80rpx;height: 80rpx;border-radius: 100%;"
					class="bg-light"></image>
			</uni-list-item>
			<uni-list-item :border="false" title="昵称">
				<input slot='footer' v-model="form.nickname" type="text" placeholder="未填写" class="text-right" />
			</uni-list-item>
			<uni-list-item clickable :border="false" title="性别" @click="changeSex">
				<text slot='footer'>{{form.sex}}</text>
			</uni-list-item>
			<uni-list-item clickable :border="false" title="手机" @click="navigateTo('/pages/bind-phone/bind-phone')">
				<text slot='footer'>{{user.phone || '未绑定'}}</text>
			</uni-list-item>
		</uni-list>

		<!-- 保存按钮 -->
		<view class="p-3">
			<main-button @click='submit'>提交</main-button>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				form: {
					avatar: '',
					nickname: '',
					sex: '未知'
				}
			}
		},
		computed: {
			...mapState({
				user: state => state.user
			})
		},

		created() {
			this.form = {
				avatar: this.user.avatar,
				nickname: this.user.nickname,
				sex: this.user.sex
			}
		},
		methods: {
			// 修改头像
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths[0]);
						this.$api.upload(res.tempFilePaths[0], (progress) => {
							console.log(progress);
						}).then(url => {
							this.form.avatar = url
						})
					}
				})
			},
			changeSex() {
				let sexOptions = ['未知', '男', '女']
				uni.showActionSheet({
					itemList: sexOptions,
					success: res => {
						this.form.sex = sexOptions[res.tapIndex]
					},
				});
			},
			// 提交
			submit() {
				uni.showLoading({
					title: '提交中...'
				})
				let data = Object.assign(this.form, {})
				this.$api.updateInfo(data).then(res => {
					this.$store.dispatch('updateInfo', data)
					this.$toast('保存成功')
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>