<template>
	<view>
		<post-list :item="detail" iscontent></post-list>

		<view class="px-2">
			<!--评论列表 -->
			<view class="comment-list" v-for="(item,index) in comments" :key="index">
				<image class="face" :src="item.user.avatar" mode="aspectFill"></image>
				<view class="flex-1">
					<view class="top">
						<text>{{item.user.name}}</text>
					</view>
					<view class="content">
						{{item.content}}
					</view>
					<view class="date">
						{{item.created_time | formatTime }}
					</view>

					<!-- 回复部分 -->
					<view class="bg-light px-2 mt-2" v-if="item.post_comments && item.post_comments.length>0">
						<view class="comment-list" v-for="(item2,index2) in item.post_comments" :key="index2">
							<image class="face" :src="item2.user.avatar" mode="aspectFill"></image>
							<view class="flex-1">
								<view class="top">
									<text>{{item2.user.name}}</text>
								</view>
								<view class="content">
									{{item2.content}}
								</view>
								<view class="date">
									{{item2.created_time | formatTime }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>


			<button type="default" class="my-2" size="mini" style="width: 100%;" @click="loadMore"
				:disabled="loadStatus!=='more'">
				{{loadStatus==='more'?'点击加载更多':(loadStatus=='noMore'?'没有更多了':'加载中...')}}
			</button>
		</view>


		<view style="height: 50px;"></view>
		<!-- 底部操作条 -->
		<view style="height: 50px;z-index: 1;" class="fixed-bottom bg-white flex align-center px-3">
			<!-- 输入框样式 -->
			<view class=" border rounded flex-1 px-2 py-1 text-light-muted bg-light mr-2">说一句吧</view>
			<!-- 点赞按钮 -->
			<view class="flex align-center" :class="detail.issupport?'text-danger':''">
				<text class="iconfont icon-dianzan2" style="font-size: 20px;"></text>
				<text class="ml-1">{{detail.support_count||'点赞'}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import tool from '@/common/tool.js'
	export default {
		filters: {
			formatTime(value) {
				return tool.getHumanTime(value)
			}
		},
		data() {
			return {
				detail: {
					"id": 0,

					"content": [],

					"user_id": 0,

					"comment_count": 0,

					"support_count": 0,

					"is_top": 0,

					"created_time": "2021-03-02 00:00:00",

					"user": {
						"id": 0,

						"avatar": "",

						"sex": "未知",

						"name": ""

					},

					"issupport": false
				},
				page: 1,
				comments: [],
				loadStatus: 'more'
			}
		},
		onLoad(e) {
			if (!e.id) {
				this.$toast('非法参数')
				return uni.navigateBack({
					delta: 1
				});
			}
			this.detail.id = e.id
			this.$api.readPost({
				id: e.id
			}).then(res => {
				this.detail = res
			})

			this.getCommentList()
		},
		methods: {
			loadMore() {
				if (this.loadStatus != 'more') {
					return
				}

				this.page = this.page + 1
				this.getCommentList()
			},
			getCommentList() {
				this.loadStatus = 'loading'
				this.$api.getPostComments({
					post_id: this.detail.id,
					page: this.page
				}).then(res => {
					let {
						rows
					} = res
					this.comments = this.page == 1 ? rows : [...this.comments, ...rows]
					this.loadStatus = rows.length < 10 ? 'noMore' : 'more'
				}).catch(err => {
					this.loadStatus = 'more'
					if (this.page > 1) {
						this.page = this.page - 1
					}
				})
			}
		}
	}
</script>

<style>
	.comment-list {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		padding: 20rpx 0;

	}

	.comment-list .face {
		border-radius: 100%;
		width: 70rpx;
		height: 70rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
		background-color: #eee;
	}

	.comment-list .top {
		color: #007aff;
		font-size: 24rpx;
	}

	.comment-list .content {
		padding: 8rpx 0;
	}

	.comment-list .date {
		color: #666;
		font-size: 24rpx;
	}
</style>