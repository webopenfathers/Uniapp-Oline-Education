<template>
	<view class="px-2">
		<view class="uni-uploader" v-if="show">
			<view class="uni-uploader-head">
				<view class="uni-uploader-title">点击可预览选好的图片</view>
				<view class="uni-uploader-info">{{imageList.length}}/9</view>
			</view>
			<view class="uni-uploader-body">
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">

						<view class="uni-uploader__file position-relative" style="border: 1rpx solid #F4F4F4;">
							<image class="uni-uploader__img rounded" :src="image.path" :data-src="image.path"
								@tap="previewImage" mode="aspectFill"></image>

							<view class="position-absolute top-0 right-0 rounded"
								style="padding: 0 15rpx;background-color: rgba(0,0,0,0.5);"
								@click.stop="deleteImage(index)">
								<text class="iconfont icon-shanchu text-white"></text>
							</view>

							<progress :percent="image.progress" activeColor="#007AFF" active
								class="position-absolute left-0 right-0 bottom-0" v-if="image.progress < 100"
								stroke-width="3" />

						</view>

					</block>
					<view class="uni-uploader__input-box rounded">
						<view class="uni-uploader__input" @tap="chooseImage"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import permision from "./permission.js"
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		props: {
			list: Array,
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				title: 'choose/previewImage',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		created() {
			this.imageList = this.list.map(url => {
				return {
					path: url,
				}
			}) || []
		},
		destroyed() {
			this.imageList = []
			this.sourceTypeIndex = 2
			this.sourceType = ['拍照', '相册', '拍照或相册']
			this.sizeTypeIndex = 2
			this.sizeType = ['压缩', '原图', '压缩或原图']
			this.countIndex = 8
		},
		methods: {
			validate() {
				if ((this.imageList.filter(o => o.progress && typeof o.progress == 'number')).length > 0) {
					uni.showToast({
						title: '当前还有图片正在上传',
						icon: 'none'
					});
					return false
				}
				return true
			},
			// 删除图片
			deleteImage(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片？',
					showCancel: true,
					cancelText: '不删除',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
							this.$emit('change', this.imageList)
						}
					},
				});
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif

				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList
						.length : this.count[this.countIndex],
					success: (res) => {
						// 上传图片
						res.tempFilePaths.forEach(path => {
							this.imageList.push({
								path,
								progress: 100
							})
							/*
							在这里调用api接口上传和修改上传进度
							上传成功：通知父组件去修改数据
							this.$emit('change',this.imageList)
							上传失败：移除当前记录
							this.imageList.splice(index,1)
							this.$emit('change',this.imageList)
							*/
							let index = this.imageList.length - 1
							this.$api.upload(path, (p) => {
								this.imageList[index].progress = p
							}).then(url => {
								delete this.imageList[index].progress
								this.imageList[index].path = url
								this.$emit('change', this.imageList)
							}).catch(err => {
								this.imageList.splice(index, 1)
								this.$emit('change', this.imageList)
							})
						})
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res
											.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');

				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}

				return status;
			}
		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}

	/* #ifndef APP-PLUS-NVUE */
	@font-face {
		font-family: "iconfont";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMUAAsAAAAABuwAAALHAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqBdIFfATYCJAMICwYABCAFhG0HMRsGBiMRZmNPI/vHYew22ZGPyaS9SlT7j/uYTkyqoYjGfQ8i3j9y9r39OBgVVCmUjqwCsksZFx1KqEyqQ/KYti5ti6bxQ1n6iMWv2jVjO1EYe/ufy+ldA2jj/EC5zDFpUi/AOKAA98K2JlQgBcANYxe8wOMQIJBUipGxl6lz8VHscQLIVr1hFX7Bj6Is5SO4DUsVGcDBN53mI9AffV5+UyI+GByLXTFz/bi11H7LybANow0sDRAEy1kBtgosUAwoyNzG+HQswgiWwLiSCccqFfjW6GhgRI765yEudnEwAMmQ/0wCT/iovzQAKOAB04AFk24OXkBoYEhIsAYd0YZ7r14Fht54cedBorMtVBuux4SdPBm3uuuO2Ma73bcxDbeCcqREe1azJZxyaql5Eddvv3p1RnDWmuCuW/FzQ+afuRNYceX/71gvrCGOvn/Ed3733apPBYVd4tFocWJ2ZHvklMi27P2RUyMOPI88IFNkP7LMHNvHt8zaH94X3pbVvrRzvbs/bHZh7K/smHtv3JVlv2LlqQVg9Jz9bRv+7ncYNNatCPPPLxWAzw91RCNGzym2AfDvwSHwLwUDW9QQ2QajmqAxbZiGd49VgQQCo2B3JF+nqmNuPC34xNy+0yMlA4tPNqr4YnAIogxcfGogkCImrA4iit1YRAOAQloBCOE8BEMor8ESzidU8V/AIZa/4BIuFgJ5+ZLdliV72VQcCQfGGcY/6CkG4Zq4iEtvKN9uoLwoor2QNh2CtmrKqSsGpCVmbB/ZMQsQFD1cwGnoXISFosGJK8W8HOpaND2pmqJPCo4QyACDzAAjfwDNRCQggs5MUXn/DUTyxjFAHU119hcIsaF7B1oqmgHoVR4GNT3KORsfJB0MIwAERMQDXIAVcU48AizNgwzIBFOhJkQXDtSonRgqr7ZX+r/bBQRia4w4fS3pHjWESb2TBAA=') format('woff2');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-shanchu:before {
		content: "\e6a6";
	}

	/* #endif */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}

	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.uni-uploader-info {
		color: #B2B2B2;
	}

	.uni-uploader-body {
		margin-top: 16upx;
	}

	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.uni-uploader__file {
		margin: 10upx;
		width: 210upx;
		height: 210upx;
	}

	.uni-uploader__img {
		display: block;
		width: 210upx;
		height: 210upx;
	}

	.uni-uploader__input-box {
		position: relative;
		margin: 10upx;
		width: 208upx;
		height: 208upx;
		border: 2upx solid #D9D9D9;
	}

	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D9D9D9;
	}

	.uni-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.uni-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.uni-uploader__input-box:active {
		border-color: #999999;
	}

	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #999999;
	}

	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>