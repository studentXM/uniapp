export default{
	 namespaced:true,
	 
	 state:()=>({
		 // 首先从全局存储中查找,如果没有则给一个空对象
		 address:JSON.parse(uni.getStorageSync('address')||'{}')
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
	 },
	 
	 getters:{
		 addstr(state){
		 	if(!state.address.provinceName) return ''
		 	return  state.address.provinceName 
		 	+ state.address.cityName + state.address.detailInfo 
		 }
	 }
}