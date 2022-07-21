<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio">
			<radio color="#c00000" @click="updateAllGoodsState(!isGullCheck)" :checked="isGullCheck"/> <text>全选</text>
		</label>
		
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<!-- 结算按钮 -->
		<view class="btn-settle">结算({{checkedCount}})
		</view>
		
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState'])
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			// 是否全选
			isGullCheck(){
				return this.total === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container{
		z-index: 20;
		position: fixed;
		bottom: 0;
		left:0;
		width: 100%;
		height: 50px;
		background-color:white ;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		.radio{
			display: flex;
			align-items: center;
		}
		
		.amount-box{
			.amount{
				color: #c00000;
				font-weight: bold;
			}
		}
		
		.btn-settle{
			background-color:#c00000;
			color: white;
			height: 50px;
			line-height: 50px;
			padding: 0px 10px;
			min-width: 100px;
			text-align: center;
		}
		
	}
	
	
</style>