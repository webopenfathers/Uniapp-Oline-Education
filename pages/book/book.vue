<template>
	<view>

		<!-- 侧边抽屉 -->
		<uni-drawer ref="showLeft" mode='left' :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
				<menu-item v-for="(item,index) in menus" :key="index" :title="item.title" :index="index"
					:active="activeId===item.id" @click='changeCurrent(index)'>
					<view class="flex">
						<text v-if="item.isfree" class="border text-danger rounded border-danger font-sm px-1 mt-1">
							免费试看
						</text>
					</view>
				</menu-item>
			</scroll-view>
		</uni-drawer>


		<!-- 内容区域 -->
		<uni-card isFull>
			<mp-html :content="content">
				<view class="flex justify-center py-3 text-light-muted">
					加载中...
				</view>
			</mp-html>
		</uni-card>



		<!-- 底部操作条 -->
		<test-actions :current='current' :showSubmit='false' :total='total' @open='handleOpenLeft'
			@on-page='onPage'></test-actions>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				book_id: 0,
				activeId: 0,
				menus: [],
				content: '',
				current: 0
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
		computed: {
			total() {
				return this.menus.length
			}
		},
		methods: {
			close() {
				this.$refs.showLeft.close()
			},
			open() {
				this.$refs.showLeft.open()
			},
			handleOpenLeft() {
				this.open()
			},
			onPage(current) {
				this.current = current
				this.getContent()
			},
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

					let index = this.menus.findIndex(o => o.id === this.activeId)
					this.current = index + 1
					this.content = res.content
					// 动态设置title
					uni.setNavigationBarTitle({
						title: res.title
					})
					if (this.content == '') this.content = '暂无内容'
				}).catch(err => {
					this.content = err
					if (err == '请先购买该电子书') {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 500)
					}
				})
			},
			changeCurrent(index) {
				this.current = index + 1
				this.getContent()
				this.close()
			},
			getContent() {
				let item = this.menus[this.current - 1]
				if (item) {
					this.activeId = item.id
					this.content = ''
					this.getData()
				}
			}
		}
	}
</script>

<style>

</style>