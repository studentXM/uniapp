import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from '@/store/store.js'
// 分别暴露是为了按需倒入
import { $http } from '@escook/request-miniprogram'
// 挂载到全局对象上
uni.$http = $http
// 设置根路径
uni.$http.baseUrl = 'https://www.uinav.com'

// 请求失败处理
uni.$showMsg = function(title="数据加载失败!",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
}

// 请求拦截器
$http.beforeRequest = function(options){
	// options 请求相关配置
	// 微信上的api 都可以通过uni来进行调用
	// loading效果
	uni.showLoading({
		title:'数据加载中...',
	})
}
// 响应拦截器
$http.afterRequest = function(){
	uni.hideLoading()
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,

  }
}
// #endif