<template>
	<view>
		<view class="fixed-top bg-white">
			<!-- 手机状态栏 -->
			<view style="height: 50px;"></view>
			<!-- 导航栏 -->
			<view class="flex align-center" style="44px">
				<!-- 按钮 -->
				<view class="flex align-center justify-center" style="height: 44px;height: 44px;" @click="back">
					<uni-icons type="arrowleft" size="20"></uni-icons>
				</view>
				<!-- 搜索框 -->
				<input :value="value" @input="$emit('input',$event.detail.value)" type="text"
					style="height: 35px;width: 400rpx;" placeholder="请输入关键词" class="rounded-circle px-3 bg-light"
					@confirm="$emit('confirm')" />
			</view>
		</view>
		<!-- 占位 -->
		<view class="" style="height: 94px;"></view>

	</view>
</template>

<script>
	export default {
		name: "search-bar",
		props: {
			value: {
				type: [Number, String],
				default: ''
			},
		},
		model: {
			prop: 'value',
			event: 'input'
		},
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>