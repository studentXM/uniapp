<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<!-- 把当前点击图片的索引,传递到preview()处理函数中 -->
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>

		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">¥{{goods_info.goods_price}}</view>
			<!-- 商品信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名字 -->
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<!-- 商品收藏 -->
				<view class="favi">
					<view class="iconfont uni-iconshoucang"></view>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递:免运费
			</view>

			<rich-text :nodes="goods_info.goods_introduce"></rich-text>

			<!-- 商品导航组件 -->
			<view class="goods_nav">
				<my-bar 
				:options="options"
				>
					
				</my-bar>
			</view>

		</view>
	</view>
</template>

<script>
	import MyBar from '@/components/my-bar/my-bar.vue';
	export default {
		data() {
			return {
				goods_info: {
					goods_price: '加载中...',
					goods_introduce: '加载中...',
					goods_name: '加载中...'
				},
				options: [
					{
						icon: 'uni-iconshouye',
						text: '店铺',
						info: 2,
						infoBackgroundColor: '#007aff',
						infoColor: 'red'
					},
					{
						icon: 'uni-icongouwuche',
						text: '购物车',
						info: 2
					}
				],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		components:{
			MyBar
		},
		onLoad(options) {
			// 获取商品id
			const goods_id = options.goods_id
			// 调用请求商品详情数据的方式
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 定义请求商品数据的方式
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				// 使用正则 替换 img标签内容 添加style样式 从而解决图片之间缝隙问题
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp /g, 'jpg')
				// 为data中的数据赋值
				this.goods_info = res.message;

				console.log(this.goods_info)
			},
			// 实现轮播图预览效果
			preview(i) {
				uni.previewImage({
					current: i,
					// 因为在对象里面所以 我们使用map映射出来一个新数组给 预览组件 这样它才能
					// 实现滑动预览
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			//
			 onClick(e){
				 console.log(e)
				 if(e.content.text === '购物车'){
					 uni.switchTab({
						 url:'/pages/cat/cart'
					 })
				 }
			 }
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}
	
	.goods_nav{
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 99;
		left: 0;
	}
</style>
