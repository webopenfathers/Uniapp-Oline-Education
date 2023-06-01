<template>
	<view>
		<view class="text-center my-5">{{ statusOptions[status] }}</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		data() {
			return {
				status: 'pendding',
				statusOptions: {
					pendding: '支付中...',
					success: '支付成功',
					fail: '支付失败'
				}
			}
		},
		async onLoad(e) {
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

			let code = tool.getUrlCode('code')
			if (!code) {
				tool.getH5Code()
				return
			}
			// 4.请求支付
			try {
				let orderInfo = await this.$api.wxpay({
					no: e.no,
					code,
					type: 'h5'
				})
				// console.log(orderInfo);

				// H5支付
				this.wxH5Pay(orderInfo, (s) => {
					this.status = 'fail'
				})
			} catch (err) {
				// console.log(err);
				if (err.indexOf('code been used') != -1) {
					this.getH5Code()
				} else {
					this.status = 'fail'
					this.$toast(err)
				}
			}
		},
		methods: {
			// 5. H5支付
			wxH5Pay(data, callback) {
				/**
				 data:{
					  "appId": "wx2421b1c4370ecxxx",   //公众号ID，由商户传入    
					  "timeStamp": "1395712654",   //时间戳，自1970年以来的秒数    
					  "nonceStr": "e61463f8efa94090b1f366cccfbbb444",      //随机串    
					  "package": "prepay_id=up_wx21201855730335ac86f8c43d1889123400",
					  "signType": "RSA",     //微信签名方式：    
					  "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==" //微信签名
				}
				**/
				function onBridgeReady() {
					WeixinJSBridge.invoke('getBrandWCPayRequest', data, (res) => {
						callback(res)
					})
				}
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
						document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
					}
				} else {
					onBridgeReady()
				}
			},
			// 
		}
	}
</script>

<style>

</style>