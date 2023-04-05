<template>
	<view>
		<uni-list :border="false">
			<uni-list-item clickable :border="false" title="头像">
				<image slot='footer' src="/static/noLogin.png" style="width: 80rpx;height: 80rpx;border-radius: 100%;"
					class="bg-light"></image>
			</uni-list-item>
			<uni-list-item :border="false" title="昵称">
				<input slot='footer' type="text" placeholder="未填写" class="text-right" />
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
			<main-button>退出登录</main-button>
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

		},
		methods: {
			changeSex() {
				let sexOptions = ['未知', '男', '女']
				uni.showActionSheet({
					itemList: sexOptions,
					success: res => {
						this.form.sex = sexOptions[res.tapIndex]
					},
				});

			}

		}
	}
</script>

<style>

</style>