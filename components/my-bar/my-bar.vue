<template>
	<view class="bar">
	<!-- 123123 -->
		<view class="item-Bar">
			<view class="bar_item"
			 @click="activesomething(item.text)"
			v-for="(item,i) in options" :key="i">
			   <view class="iconfont" :class="item.icon"></view>
			   <view v-if="item.icon == 'uni-icongouwuche'" 
			   class="border-num">
					{{item.info}}
			   </view>
			    <text>{{item.text}}</text>
			</view>
		</view>	
	
	    <view class="bar_item1" style="background-color: #FC8A05;">
	        <text>加入购物车</text>
	    </view>
	
	    <view class="bar_item1" style="background-color: #DB0F0F;">
	        <text>立即购买</text>
	    </view>
	
	</view>
</template>

<script>
	export default {
		name:"my-bar",
		props:{
			options:{
				type:Array,
				default:[]
			},
		},
		data() {
			return {
				Cname:'iconfont'
			};
		},
		methods:{
			activesomething(e){
				console.log(e)
				if(e==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			}
		}
		
	}
</script>

<style lang="scss">
.bar {
    height: 50px;
    display: flex;
	.item-Bar{
		// width: 50%;
		background: white;
		flex: 1;
		display: flex;
		justify-content: space-around;
	}
    .bar_item {
        // width: 14%;
        padding: 8px 0px 12px;
        text-align: center;
        font-size: 10px;
        color:dimgray;
        display: flex;
        flex-direction: column; //修改轴方向
        align-items: center; //上下居中
		background: white;
		position: relative;
        image {
            width: 15px;
            height: 15px;
        }
    }

    .bar_item1 {
		flex: 1;
        font-size: 14px;
        color: white;
        text-align: center;
        line-height: 50px;
    }
	
	.border-num{
		background: orangered;
		color: white;
		width: 15px;
		border-radius: 50%;
		position: absolute;
		right: 0px;
		top: 2px;
	}

}
</style>