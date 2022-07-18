<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="gotoSearch">
		<view class="my-search-box" :style="{'border-radius' : radius +'px'}">
			<!-- iconfont 图标库 -->
			<view class="iconfont uni-iconsousuo" >
				
			</view>	
			
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>

	export default {
		name:"my-search",
		props:{
			// 背景颜色
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			// 点击搜索`进入搜索页面
			gotoSearch(){
				uni.navigateTo({
					url:'../../subpkg/search/search'
				})
			}
		}

	}
</script>

<style lang="css">
	@import url("../../static/css/iconfont.css");
	.my-search-container{
		height: 50px;
		/* background: #c00000; */
		display: flex;
		align-items: center;
		padding: 0px 10px;
		
	}
	.my-search-box{
		height: 36px;
		background: #ffffff;
		/* border-radius: 18px; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	
	.placeholder{
		font-size: 15px;
		margin-left:5px ;
	}
</style>