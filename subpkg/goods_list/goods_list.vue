<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" 
			:key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-Goods>
			</view>

		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading:false
			}
		},
		onLoad(options) {
			// console.log(options)
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || ''

			this.getGoodsList()
		},
		methods: {
			// 获取商品列表
			async getGoodsList(callback) {
				// 节流 阻止同时多次发请求
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading = false
				// 请求完后 调用回调函数 这里是短路运算符 和if一样的
				callback && callback()
				
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				this.goodsList = [...this.goodsList , ...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},
		onReachBottom(){
			// 如果当前
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
			// 如果当前处于请求中
			if(this.isloading) return 
			// 当1页码值自增+1
			this.queryObj.pagenum ++
			this.getGoodsList()
		},
		// 上拉刷新 重置页面数 数据
		onPullDownRefresh(){
			// 重置关键数据
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isloading = false;
			this.goodsList = []
			
			// 重新发起请求
			this.getGoodsList(()=>{
				// 请求完成后 关闭下拉刷新的效果 一个回调函数
				uni.stopPullDownRefresh()
			})
		},
		componetns:{

		}
	}
</script>

<style lang="scss">

</style>
