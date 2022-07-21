<template>

		<view class="goods-item">
			<!-- 左侧盒子 -->
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" 
				color="#c00000" v-if="showRadio"
				@click="radioClickhandler"></radio>
				<image :src="goods.goods_small_logo||defaultPic" class="goods-pic" mode=""></image>
			</view>
			<!-- 右侧的盒子 -->
			<view class="goods-item-right">
				<!-- 商品名称 -->
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="gooods-info-box">
					<view class="goods-price">¥{{goods.goods_price | tofixed}}</view>
					<uni-section v-if="showNum"
					:value="goods.goods_count"
					@change="numChangeHandler"
					></uni-section>
				</view>
			</view>
		</view>
	
</template>

<script>
	import UniSection from '@/components/uni-section-num/uni-section.vue'
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		components:{
			UniSection
		},
		data() {
			return {
				// 默认图片
				defaultPic: '../../static/test.jpg',
			};
		},
		// 过滤器
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioClickhandler(){
				// 传递当前组件的id 和 当前的勾选状态
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			// 之所以 不用事件总线 是因为 这里要传给vuex 所以还需要传递
			// 商品的id  那么用事件总线的话 在uni-section没有id 所以传不了
			numChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:val - 0 //以防不是number
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
			}

			.goods-info-box {
				
			}
		}
	}
	.gooods-info-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.goods-price {
		color: #c00000;
		font-size:16px
	}
</style>