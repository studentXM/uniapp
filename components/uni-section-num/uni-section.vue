<template>
	<view class="uni-section">
		<view @click="reduce">-</view>
		<input v-model="num" @blur="numr"/>
		<view @click='add'>+</view>
	</view>
</template>

<script>



	export default {
		name: 'UniSection',
		emits:['click'],
		props: {
			value:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				num:this.value,
			}
		},
		watch: {
			
		},
		methods: {
			add(){
				this.$emit('change',++this.num)
			},
			reduce(){
				if(this.num>0){
					this.$emit('change',--this.num)
				}
			},
			numr(){
				if(this.num>0 && !!parseInt(this.num) && String(this.num).indexOf('.') === -1){
					this.$emit('change',this.num)
				}else{ 
					this.num = 1
					this.$emit('change',this.num)
				}
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-section{
		border-radius: 5px;
		border: 1px solid #e3e3e3;
		display: flex;
		height: 26px;
		width: 160rpx;
		line-height: 26px;
		justify-content: space-between;
		// align-items: center;
		input{
			width: 30%;
			text-align: center;
			font-size: 14px;
		}
		view{
			height: 26px;
			line-height: 26px;
			width: 40%;
			border-radius: 0;
			background: #f4f4f4;
			text-align: center;
		}
		view:active{
			background: #e3e3e3;
		}
	}
</style>
