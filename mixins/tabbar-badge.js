import {
	mapGetters
} from 'vuex'


export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	// 页面刚显示时
	onShow() {
		this.setBadge()
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	methods: {
		setBadge() {
			// 调用 uni.getTabBarbadge 为购物车设置右上角的微标
			uni.setTabBarBadge({
				index: 2,
				text: this.total + '' //这里不能是数字,必须是String
			})
		}
	}
}
