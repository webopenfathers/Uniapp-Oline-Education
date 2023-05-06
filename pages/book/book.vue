<template>
	<view>
		<uni-card isFull>
			<mp-html :content="content">
				<view class="flex justify-center py-3 text-light-muted">
					加载中...
				</view>
			</mp-html>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				book_id: 0,
				activeId: 0,
				menus: [],
				content: ''
			}
		},
		onLoad(e) {
			let {
				book_id,
				id
			} = e
			if (!book_id || !id) {
				this.$toast('参数缺失')
				this.back()
				return
			}
			this.book_id = parseInt(book_id)
			this.activeId = parseInt(id)
			this.getData()
		},
		methods: {
			back() {
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 700)
			},
			getData() {
				this.$api.getBookDetailContent({
					book_id: this.book_id,
					id: this.activeId
				}).then(res => {
					this.menus = res.menus
					if (this.menus.length === 0) {
						this.$toast('该电子书没有章节内容')
						return this.back()
					}

					this.content = res.content
					// 动态设置title
					uni.setNavigationBarTitle({
						title: res.title
					})
				}).catch(err => {

				})
			}
		}
	}
</script>

<style>

</style>