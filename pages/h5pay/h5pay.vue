<template>
	<view>

	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		data() {
			return {

			}
		},
		onLoad(e) {
			// 是否在微信浏览器中
			if (!tool.isInWechat()) {
				uni.showModal({
					content: '请在微信浏览器中打开',
					showCancel: false,
					success: res => {
						// 点击确定返回首页
						if (res.confirm) {
							location.href = '/'
						}
					},
				});
			}

			let code = this.getUrlCode('code')
			if (!code) {
				this.getH5Code()
				return
			}
		},
		methods: {
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
					[, ''
					])[1]
					.replace(/\+/g, '%20')) || null
			},
			getH5Code() {
				// 微信公众号的appid
				let appid = 'wxf0d98abcc66aab61'
				let href = window.location.href
				if (href.indexOf('?code') != -1) {
					let h = href.split('#/')
					h[0] = window.location.protocol + "//" + window.location.host
					href = h[0] + '/#/' + h[1]
				}
				let local = encodeURIComponent(href);
				const url =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
				location.href = url
			}
		}
	}
</script>

<style>

</style>