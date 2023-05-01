<template>
	<view>
		<!-- 倒计时 -->
		<timer-box v-if="expire>0" :expire="expire" @end='end'></timer-box>
		<!-- 题目卡片 -->
		<uni-card isFull :title="q.type | formatType" :extra="'第'+current+'题'">
			<view class="mb-2">
				<mp-html :content="q.title">
					<view class="flex justify-center py-3 text-light-muted">
						加载中...
					</view>
				</mp-html>
			</view>
			<!-- 答题区--问答题-->
			<textarea v-if="q.type==='answer'" v-model="q.user_value[0]" placeholder="请输入答案..." class="border p-2 w-100"
				style="box-sizing: border-box;" />
			<!-- 答题区--填空题-->
			<view v-else-if="q.type==='completion'">
				<textarea v-for="(item,index) in q.user_value" :key="index" v-model="q.user_value[index]"
					placeholder="请输入答案..." class="border p-2 w-100 mb-2" style="box-sizing: border-box;" />
				<!-- 按钮 -->
				<main-button @click='addCompletion'>添加填空</main-button>
			</view>

			<!-- 答题区--单选组件 -->
			<view v-else-if="q.type==='trueOrfalse' || q.type==='radio'" class="">
				<test-option @click='handleDo' v-for="(item,index) in q.options" :key="index" :index="index"
					:label="item" :checked="q.user_value===index"></test-option>
			</view>

			<!-- 答题区--多选组件 -->
			<view v-else-if="q.type==='checkbox'">
				<test-option @click='handleDo' v-for="(item,index) in q.options" :key="index" :index="index"
					:label="item" :checked="index | formatChecked(q.user_value)"></test-option>
			</view>


		</uni-card>
		<!-- 底部操作条 -->
		<test-actions @submit='beforeSubmit' :current='current' :total='total' @on-page='onPage'></test-actions>
	</view>
</template>

<script>
	const typeOptions = {
		answer: '问答题',
		completion: "填空题",
		trueOrfalse: '判断题',
		checkbox: '多选题',
		radio: '单选题'
	}
	export default {
		filters: {
			formatType(type) {
				return typeOptions[type]
			},
			// 判断传过来的数组中，是否包含索引
			formatChecked(v, arr) {
				return arr.includes(v)
			}
		},
		data() {
			return {
				current: 0,
				total: 0,
				list: [],
				id: 0,
				// 过期时间
				expire: 0,
				// 考试标题
				title: '',
				user_test_id: '',
				isback: false,
			}
		},
		computed: {
			// 当前题目
			q() {
				return this.list[this.current - 1] || {}
			},
			// 那些没有填的题目
			undo() {
				let arr = []
				this.list.forEach((item, index) => {
					// 问答题没有填
					if (((item.type === 'answer' || item.type === 'completion') && !item.user_value[0]) || ((item
							.type === 'trueOrfalse' || item.type === 'radio') && item.user_value == -1) || (item
							.type === 'checkbox' && item.user_value.length === 0)) {
						arr.push(index + 1)
					}
				})
				return arr
			}
		},
		onLoad(e) {
			if (!e.id) {
				this.$toast('非法参数')
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 600)
				return
			}
			this.id = e.id
			this.getData()
		},
		onBackPress() {
			// return false ----直接返回
			// return true---不返回
			// 真正返回
			if (this.isback) {
				// 通知考场列表刷新数据
				uni.$emit('refreshTestList', '')
				return false
			}
			// 拦截返回
			uni.showModal({
				content: '是否要放弃这场考试？',
				cancelText: '继续做题',
				confirmText: '放弃',
				success: res => {
					if (res.confirm) {
						this.isback = true
						uni.navigateBack({
							delta: 1
						})
					}
				},
			});
			return true
		},
		methods: {
			// 交卷之前判断那些题目没有完成
			beforeSubmit() {
				if (this.undo.length > 0) {
					return uni.showModal({
						content: `还有题目没有完成：第${this.undo.join(',')}题`,
						showCancel: false
					});
				}

				uni.showModal({
					content: '是否要交卷',
					cancelText: '继续做题',
					confirmText: '现在交卷',
					success: res => {
						if (res.confirm) {
							this.submit()
						}
					},
				});

			},
			// 交卷
			submit() {
				uni.showLoading({
					title: '交卷中...',
					mask: false
				})
				this.$api.submitTest({
					user_test_id: this.user_test_id,
					value: this.list.map(o => o.user_value)
				}).then(res => {
					this.$toast('交卷成功')
					this.isback = true
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 500)
				}).finally(() => {
					uni.hideLoading()
				})

			},
			getData() {
				uni.showLoading({
					title: '加载中...',
				});
				this.$api.readTestPaper({
					id: this.id
				}).then(res => {
					this.expire = res.expire
					this.title = res.title
					this.list = res.testpaper_questions
					this.user_test_id = res.user_test_id
					this.total = this.list.length
					if (this.total > 0) {
						this.current = 1
					}
				}).finally(() => {
					uni.hideLoading()
				})
			},
			end() {
				// console.log('自动提交试卷');
				this.isback = true
				this.$toast('考试结束')
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 600)
			},
			onPage(current) {
				this.current = current
			},
			// 添加填空
			addCompletion() {
				this.list[this.current - 1].user_value.push('')
			},
			handleDo(e) {
				if (this.q.type === 'radio' || this.q.type === 'trueOrfalse') {
					this.list[this.current - 1].user_value = e
					return
				}

				let index = this.q.user_value.findIndex(checked => checked == e)
				if (index === -1) {
					this.q.user_value.push(e)
				} else {
					this.q.user_value.splice(index, 1)
				}
			}
		}
	}
</script>

<style>

</style>