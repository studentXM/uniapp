<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item) in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>

		</swiper>

		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="item in navList" :key="item.name" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 每一个楼层的item项 -->
			<view class="floor-item" v-for="item in floorList" :key="item.floor_title.name" >
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				
				<view class="floor-img-box">
					<!-- 左侧大图 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" class="left-big-img"></image>
					</navigator>
					<!-- 右侧图 -->
					<view class="right-img-box">
						<navigator 
						class="right-img-Box" 
						v-for="itemx in item.product_list.slice(1)" :url="itemx.url">
							<image :src="itemx.image_src" class="right-img"></image>
						</navigator>
					</view>
				</view>	
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮博图
				swiperList: [],
				// 分类列表
				navList: [],
				// 楼层的数据
				floorList: [],
			}
		},
		onLoad() {
			//获取轮播图
			this.getSwiperlist();
			this.getNavList();
			this.getFloorList()
		},
		methods: {
			async getSwiperlist() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求失败 调用封装好的失败处理函数
				if (res.meta.status !== 200) return uni.$showMsg();
				this.swiperList = res.message
				// uni.$showMsg('请求成功')
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message;
				console.log(res)
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res.message)
				// 对数据进行处理
				res.message.forEach(floor => {
					console.log(floor , 'xxxxxxx')
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},


			// 切换分类
			navClickHandler(item) {
				console.log(item)
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			}
		},


	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}
	
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	
	.floor-img-box{
		display: flex;
		justify-content: space-around;
		// align-items: center;
		.left-big-img{
			width: 100%;
		}
		.left-img-box{
			width: 36%;
			flex-shrink: 0;
		}
		.right-img-box{
			width: 62%;
			flex-shrink: 0;
			display: flex;
			flex-wrap: wrap;
			.right-img-Box{
				width: 48%;
				display: flex;
				flex-wrap: wrap;
			}
			.right-img{
				width: 97%;
				height: 97%;
			}
		}
	}
</style>
