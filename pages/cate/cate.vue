<template>
	<view>
		<!-- 自定义搜索组件 -->
		<my-search></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:wh+'px'}">
				<block v-for="(item,i) in cateList" :key="item.cat_name">
					<view :class="['left-scroll-view-item',i === active ? 'active':'']" @click="activeChanged(i)">
						{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-lvv2" v-for="(item2,i2) in cateLevel2" :key="item2.cat_id">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">
						/{{item2.cat_name}}/
					</view>
					<!-- 二级分类下的列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" 
						v-for="(item3,i3) in item2.children" 
						@click="gotoGodsList(item3)"
						:key="item3.cat_id">
							<!-- 三级分类的图片 -->
							<image :src="item3.cat_icon"></image>
							<!-- 三级分类的文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import MySearch from '../../components/my-search/my-search.vue'
	export default {
		data() {
			return {
				wh: 0, //当前设备可用高度
				cateList: [], //一级分类
				active: 0,
				cateLevel2: [], //二级分类
				scrollTop:0,
			}
		},
		onLoad() {
			const sysinfo = uni.getSystemInfoSync()
			console.log(sysinfo);
			this.wh = sysinfo.windowHeight;

			this.getCateList()
		},
		components:{
			MySearch
		},
		methods: {
			// 获取分类列表
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message;
				this.cateLevel2 = res.message[0].children
			},
			// 切换active值为当前点击元素的索引
			activeChanged(i) {
				this.active = i;
				this.cateLevel2 = this.cateList[i] .children;
				// 重置顶部偏移值 选择0和1 是因为重复赋值一个值 会失效 所以在0-1之间取反
				this.scrollTop = this.scrollTop === 0 ? 1 : 0;
			}, 
			// 跳转页面函数
			gotoGodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?cid='+item.cat_id
				})
			},

		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			// 因为这里需要固定宽度,所以不用rpx
			width: 120px;
		}

		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background: white;
				position: relative;

				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;
			.cate-lv3-item {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 33.33%;
				margin-bottom: 10px;
 
				image {
					width: 60px;
					height: 60px;
				}

				text {
					font-size: 12px;
				}
			}
		}
	}
</style>
