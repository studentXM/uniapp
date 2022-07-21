import Vue from 'vue'
import Vuex from 'vuex'
// 引入购物车vuex模块
import moduleCart from './cart.js'
// 引入收货地址vuex模块
import moduleUser from './user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		// 挂载购物车中的 vuex模块,模块内成员的访问路径被调整为 m_cart 
		//例如 购物车中的cart数组 访问路径是 m_cart/cart
		m_cart:moduleCart,
		m_user:moduleUser
	}
})

export default store