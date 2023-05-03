<template>
	<view>
		<post-list :item="detail" iscontent></post-list>
	</view>
</template>

<script>
	export default {
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
				}
			}
		},
		onLoad(e) {
			if (!e.id) {
				this.$toast('非法参数')
				return uni.navigateBack({
					delta: 1
				});
			}

			this.$api.readPost({
				id: e.id
			}).then(res => {
				this.detail = res
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>