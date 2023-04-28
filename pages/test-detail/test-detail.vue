<template>
	<view>
		<!-- 倒计时 -->
		<timer-box @end='end'></timer-box>
		<!-- 题目卡片 -->
		<uni-card isFull :title="q.type | formatType" :extra="'第'+current+'题'">
			<view class="">
				<mp-html :content="q.title">
					<view class="flex justify-center py-3 text-light-muted">
						加载中...
					</view>
				</mp-html>
			</view>
			<view class="">
				内容
			</view>
		</uni-card>
		<!-- 底部操作条 -->
		<test-actions :current='current' :total='total' @on-page='onPage'></test-actions>
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
			}
		},
		data() {
			return {
				current: 1,
				total: 4,
				list: [{
						"id": 42,

						"score": 25,

						"question_id": 73,

						"title": "说说你的看法",

						"remark": "问题解析",

						"type": "answer",

						"user_value": [
							""
						]

					},
					{
						"id": 43,

						"score": 25,

						"question_id": 72,

						"title": "请问我年龄多大",

						"remark": "问题解析",

						"type": "completion",

						"user_value": [
							""
						]

					},
					{
						"id": 44,

						"score": 0,

						"question_id": 71,

						"title": "请问我是男生还是女生",

						"remark": "问题解析",

						"type": "trueOrfalse",

						"options": [
							"正确",
							"错误"
						],

						"user_value": -1

					},
					{
						"id": 45,

						"score": 25,

						"question_id": 70,

						"title": "你的名字叫什么",

						"remark": "问题解析",

						"type": "checkbox",

						"options": [
							"张三",
							"李四",
							"王五",
							"王五哈"
						],

						"user_value": []

					},
					{
						"id": 46,

						"score": 25,

						"question_id": 65,

						"title": "你的名字叫什么",

						"remark": "问题解析",

						"type": "checkbox",

						"options": [
							"张三",
							"李四",
							"王五",
							"王五哈"
						],

						"user_value": []

					}
				],
			}
		},
		computed: {
			// 当前题目
			q() {
				return this.list[this.current - 1] || {}
			}

		},
		methods: {
			end() {
				console.log('自动提交试卷');
			},
			onPage(current) {
				this.current = current
			}
		}
	}
</script>

<style>

</style>