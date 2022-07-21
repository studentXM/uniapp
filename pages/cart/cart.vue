<template>
	<view style="padding-bottom:50px;">
		<!-- 收货地址组件 -->
		<my-address></my-address>
		
		
		<view class="cart-title">
			<!-- 左侧图标 -->
			<text class="iconfont uni-iconshouye"></text>
			<!-- 右侧文本区域 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<uni-swipe-action>
			<!-- 循环渲染 渲染商品列表信息-->
			<block v-for="(item,i) in cart" :key="i">

					<uni-swipe-action-item :right-options="options" 
					@click="swipeItemClickhandler(item)">
						<my-goods
						:goods="item" :show-radio="true" 
						:show-num="true" 
						@radio-change="radioChangeHandler"
							@num-change="numberChangeHandler">
							</my-goods>
					</uni-swipe-action-item>
			</block>
			
		</uni-swipe-action>
		
		<view class="empty-carrt" v-if="cart.length === 0">
			<image class="empty-img" src="/static/nothing.png" ></image>
			<text class="tpi-text">空空如也~</text>
		</view>
		
		<!-- 自定义结算组件 -->
		<my-settle></my-settle>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import MyGoods from '@/components/my-goods/my-goods.vue'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options:[
					{
						text:'删除',
						style:{
							backgroundColor:'#c00000'
						}
					}
				]
			}
		},
		methods: {
			radioChangeHandler(e) {
				console.log(e)
				this.updateGoodsState(e)
			},
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
			numberChangeHandler(e) {
				console.log(e)
				this.updateGoodsCount(e)
			},
			swipeItemClickhandler(item){
				console.log(item)
				this.removeGoodsById(item.goods_id)
			},
			test(){
				
			}
		}



	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	
	.empty-carrt{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		.empty-img{
			width: 120px;
			height: 120px;
		}
		.tpi-text{
			
		}
	}

</style>
