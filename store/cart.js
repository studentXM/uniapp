export default {
	namespaced: true,

	// state数据
	state: () => ({
		// 购物车的数组,用来存储购物车中的每个商品的信息对象
		// 每个商品的信息对象,都包含如下6个属性
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	// 模块化的mutations方法
	mutations: {
		addToCart(state, goods) {
			// console.log('vuex----')
			// console.log(goods)
			// 这里接收到的是个引用类型,所以下面修改也会该对应内存地址对象
			const findResult = state.cart.find((x) => {
				return x.goods_id === goods.goods_id
			})
			// 为undefin的时候 代表没有 则可以添加
			if (!findResult) {
				state.cart.push(goods)
			} else {
				// 如果购物车有这件商品,则只更新数量即可 这是个对象 是引用类型
				findResult.goods_count++
			}
			console.log(state.cart)
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车勾选状态
		updateGoodsState(state, goods) {
			// 根据goods_id查询购物车中对应商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)



			//有对应的商品信息对象
			if (findResult) {
				// 更新对应商品勾选状态
				findResult.goods_state = goods.goods_state
				// 持久化存储本地
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state, goods) {
			// 根据goods_id查询购物车中对应商品信息对象
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				// 更新对应商品数量
				findResult.goods_count = goods.goods_count
				// 持久化存储
				this.commit('m_cart/saveToStorage')
			}
		},
		// 删除购物车商品
		removeGoodsById(state,goods_id){
			// 使用filter 返回一个新数组 这个数组不存在我们删除的数组
			console.log(goods_id)
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			// 持久化存储本地
			this.commit('m_cart/saveToStorage')
			
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state,newState){
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(x => x.goods_state = newState)
			// 存储
			this.commit('m_cart/saveToStorage')
		}

	},

	// getter计算属性
	getters: {
		total(state) {

			// let c = 0;
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			
			return state.cart.reduce((total,item)=> total += item.goods_count,0)
			
		},
		// 勾选商品的总数量
		checkedCount(state){
			// 先使用 filter方法,从购物车中过滤器已勾选的商品
			// 再使用reduce方法,将已勾选的商品总数量进行累加
			// reduce 返回值就是已勾选的商品总数量
			return state.cart.filter( x => x.goods_state).reduce(
			(total,item) => total += item.goods_count,0 )
		},
		
		// 已勾选商品的总价格
		checkedGoodsAmount(state){
			// 先使用 filter方法,从购物车中过滤已勾选的商品
			// 再使用reduce方法,将已勾选的商品数量*价格 进行累加
			// reduce()的返回值是已勾选的商品的总价
			// 最后调用toFixed(2) 方法保留两位小数
			return state.cart.filter( x => x.goods_state )
					.reduce( (total,item) => total += item.goods_count * item.goods_price,0)
					.toFixed(2)
		}
		
	}


}
