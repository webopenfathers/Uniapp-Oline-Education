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
		<uni-card isFull extra="移除" note="Tips" v-for="(item,index) in form" :key="index">
			<textarea v-model="item.text" placeholder=" 请填写帖子内容" class="bg-light font-md rounded p-2"
				style="width: 100%;box-sizing: border-box;" />

			<!-- 多图组件 -->
			<view class="">
				上传组件
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
				menus: ['123', '321'],
				form: [{
					text: '',
					images: []
				}]
			}
		},
		methods: {
			addForm() {
				this.form.push({
					text: '',
					images: []
				})
			},
			handleChange(e) {
				this.activeIndex = e.detail.value
			}
		}
	}
</script>

<style>

</style>