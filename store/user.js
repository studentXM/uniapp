export default{
	 namespaced:true,
	 
	 state:()=>({
		 // 首先从全局存储中查找,如果没有则给一个空对象
		 address:JSON.parse(uni.getStorageSync('address')||'{}'),
		 token:uni.getStorageSync('token') || '',
		 // 用户信息对象
		 userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}')
	 }),
	 
	 mutations:{
		 // 更新地址
		 updateAddress(state,address){
			 state.address = address;
			 // 调用存储
			 this.commit('m_user/saveAddressToStorage')
		 },
		 //存储
		 saveAddressToStorage(state) {
		 	uni.setStorageSync('address', JSON.stringify(state.address))
		 },
		 updateUserInfo(state,userinfo){
			 state.userinfo = userinfo
			 
			 // 调用存储
			 this.commit('m_user/saveUserInfoToStorage')
		 },
		 // 存储用户信息
		 saveUserInfoToStorage(state){
			 uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		 },
		 updateToken(state,token){
			 state.token = token
			 this.commit('m_user/saveTokenStorage')
		 },
		 saveTokenStorage(state){
			 uni.setStorageSync('token',state.token)
		 }
		 
	 },
	 
	 getters:{
		 addstr(state){
		 	if(!state.address.provinceName) return ''
		 	return  state.address.provinceName 
		 	+ state.address.cityName + state.address.detailInfo 
		 }
	 }
}