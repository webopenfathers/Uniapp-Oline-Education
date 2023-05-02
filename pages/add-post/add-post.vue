<template>
	<view>
		<!--选择社区 -->
		<picker mode="selector" :range="menus" @change="handleChange">
			<view class="p-2">
				<button size="mini" type="default"
					style="width: 100%;">{{activeIndex==-1?'选择社区':menus[activeIndex]}}</button>
			</view>
		</picker>
		<!-- 发表帖子 -->
		<uni-card isFull :extra="index===0?'':'移除'" v-for="(item,index) in form" :key="index"
			@click-extra='deleteForm(index)'>
			<textarea v-model="item.text" placeholder=" 请填写帖子内容" class="bg-light font-md rounded p-2"
				style="width: 100%;box-sizing: border-box;" />

			<!-- 多图组件 -->
			<view style="margin:0 -20px">
				<upload-image :list="item.images" @change='handleUploadImage($event,item)'></upload-image>
			</view>
		</uni-card>


		<view style="height: 75px;"></view>
		<!-- 底部按钮 -->
		<view class="fixed-bottom bg-white border-top p-2" style="height: 55px;">
			<main-button @click='addForm'>添加内容</main-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: -1,
				menus: [],
				menusId: [],
				form: [{
					text: '',
					images: []
				}]
			}
		},
		onLoad() {
			this.$api.getBbsList({
				page: 1,
				limit: 100
			}).then(res => {
				res.rows.forEach(o => {
					this.menus.push(o.title)
					this.menusId.push(o.id)
				})
			})
		},
		onNavigationBarButtonTap() {
			this.submit()
		},
		methods: {
			submit() {
				if (this.activeIndex == -1) {
					return this.$toast('请先选择社区')
				}
				uni.showLoading({
					title: '发布中...',
					mask: false
				});

				this.$api.addPost({
					bbs_id: this.menusId[this.activeIndex],
					content: this.form
				}).then(res => {
					this.$toast('发布成功')
					setTimeout(() => {
						uni.$emit('refreshBbs')
						uni.navigateBack({
							delta: 1
						});
					},500)
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleUploadImage(imageList, item) {
				item.images = imageList.map(o => o.path)
				console.log(item.images);
			},
			addForm() {
				this.form.push({
					text: '',
					images: []
				})
			},
			handleChange(e) {
				this.activeIndex = e.detail.value
			},
			deleteForm(index) {
				uni.showModal({
					content: '是否要移除该区块?',
					success: (res) => {
						if (res.cancel) {
							return
						}
						this.form.splice(index, 1)
					}
				});
			}
		}
	}
</script>

<style>

</style>