<template>
	<view class="border rounded px-3 py-2 mb-2 flex align-start " :class="checked?'border-main text-main':''"
		@click="$emit('click',index)">
		<text class="mr-2">{{index | formatIndex}}</text>
		<view class="">
			<mp-html :content='label'>
			</mp-html>
		</view>
	</view>
</template>

<script>
	const en = {
		0: 'A',
		1: "B",
		2: 'C',
		3: 'D',
		4: 'E',
		5: 'F'
	}
	export default {
		name: "test-option",
		props: {
			checked: {
				type: Boolean,
				default: false
			},
			index: {
				type: Number,
				default: 0
			},
			label: {
				type: String,
				default: ''
			}
		},
		filters: {
			formatIndex(index) {
				return en[index]
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>