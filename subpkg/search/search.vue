<template>
	<view>
		<view class="search-box">
			<view class="my-search-container" @click="showInput">
				<view class="my-search-box">
					<!-- iconfont 图标库 -->
					<view class="iconfont uni-iconsousuo"></view>
					
					<text v-if="!showInp" class="placeholder">请输入搜索内容</text>
					<input ref="myInput" v-if="showInp" :focus="showInp" class="placeholder input" type="text" @input="searInp">
					<text v-if="showInp" class="close" @tap.stop="close">x</text>
					

				</view>
				
			</view>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index"  @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<view class="iconfont uni-iconyoubianjiantou">
					
				</view>
			</view>	
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else="searchResults.length == 0">
			<!-- 标题区 -->
			<view class="history-title">
				<text>搜索历史</text>	
				<view class="iconfont uni-iconshanchu1" @click="clean"></view>
			</view>	
			
			<!-- 列表区 -->
			<view class="history-list">
				<text class="t_list" v-for="(item,i) in historys" :key="i"
				@click="gotoGoodsList(item)">{{item}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				showInp: false,
				// 接收宏任务函数
				timer:null,
				kw:'',
				// 搜索到的结果列表
				searchResults:[],
				// 搜索的历史记录
				historyList:[]
			};
		},
		onLoad(){
			// 取得数据持久化的数据
			this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods: {
			gotoDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
				
			showInput() {
				this.showInp = true;
			},
			close() {
				this.showInp = false;
				this.kw = '';
				this.searchResults = []
			},
			async getSearchList(){
				if(this.kw.length === 0){
					this.searchResults = []
					return 
				}
				// 追加历史搜索,判断搜索的词条在历史当中是否存在 不存在 则加入
				this.saveSearchHistory()
				
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
			},
			searInp(v) {
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = v.detail.value
					this.getSearchList()	 	
				},500)
			},
			saveSearchHistory(){
				// set有唯一性
				const set = new Set(this.historyList)
				// 这里这么做是因为 要删除掉原来有的值
				set.delete(this.kw)
				// 然后把最新搜索的值加入到末尾 之后通过计算属性重新排序 
				set.add(this.kw)
				// 然后再转换成数组
				this.historyList = Array.from(set)
				// 对搜索历史数据,进行持久化的存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			// 清除历史
			clean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			// 搜索记录进行跳转
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
			}
		},
		computed:{
			historys(){
				// 因为想要数组
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="css">
	@import url("../../static/css/iconfont.css");

	.my-search-container {
		height: 50px;
		/* background: #c00000; */
		display: flex;
		align-items: center;
		padding: 0px 10px;

	}

	.my-search-box {
		height: 36px;
		background: #f3f3f3;
		border-radius: 18px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #ccc;
	}

	.iconfont {
		color: #9499a0;
	}

	.placeholder {
		font-size: 15px;
		margin-left: 5px;
		color: #9499a0;
	}

	.input {
		width: 78%;
	}

	.close {
		width: 20px;
		background-color: #d3d3d3;
		text-align: center;
		border-radius: 50%;
		color: white;
		height: 20px;
		line-height: 20px;
		margin: 0px 10px;
	}
	
	.sugg-item{
		height: 50px;
		margin: 10px 20px;
		/* padding: 0px px; */
		display: flex;
		align-items: center;
		/* border-top: 1px solid silver; */
		border-bottom: 1px solid #dfdfdf;
	}
	.goods-name{
		    text-overflow: ellipsis;
		    overflow: hidden;
		    /* width: 200px; */
		    height: 20px;
			white-space: nowrap;
	}
	.uni-iconyoubianjiantou{
		font-weight: 600;
	}
	
	.history-title{
		display: flex;
		justify-content: space-between;
		margin:0px 20px;
		border-bottom: 1px solid #dfdfdf;
		padding: 10px 0px;
		font-size: 14px;
		font-weight: 500;
	}
	.uni-iconshanchu1{
		font-size: 20px;
		color: #c00000;	
		
	}
	.t_list{
		background: #e8eff5;
		margin-right: 10px;
		padding: 2px 5px;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	.history-list{
		margin:0px 20px;
		padding: 10px 0px;
		display: flex;
		flex-wrap: wrap;
	}
</style>
