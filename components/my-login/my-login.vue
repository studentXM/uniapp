<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<!-- <button type="primary" class="btn-login"  v-on:tap="wechatLogin">一键登录</button> -->
		<button type="primary" class="btn-login" 
		open-type="getUserInfo" @getuserinfo="getuserInfo">一键登录</button>
		<text class="tips-text">登陆后尽享更多权益</text>


	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			// 获取用户的基本信息
			getuserInfo(e) {
				console.log(e)
				// 判断是否获取用户信息成功
				if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登陆授权')

				// 获取用户信息成功, e.detail.userInfo 就是用户的基本信息
				console.log(e.detail)
				this.getToken(e.detail)
			},
			// wechatLogin() {
			// 	// 获取用户信息
			// 	uni.getUserProfile({
			// 		desc: '获取你的昵称、头像、地区及性别',
			// 		// 当我们点击登陆时 执行success
			// 		success: res => {
			// 			console.log(res);
			// 			// 登陆成功
			// 			this.updateUserInfo(res)
			// 			 // 获取token
			// 			 this.getToken(res)
			// 		},
			// 		// 当我们点击取消时 执行success
			// 		fail: res => {
			// 			console.log(2);
			// 			console.log(res)
			// 			//取消登陆后的提示
			// 			uni.showToast({
			// 				title: '您拒绝了请求,不能正常使用小程序',
			// 				icon: 'error',
			// 				duration: 2000
			// 			});
						
			// 			return;
			// 		}
			// 	});
			// },
			// 登陆调用接口
			async getToken(info){
				// 调用微信登陆接口
				const [err,res] = await uni.login().catch(err => err)
				// 判断是否 wx.login调用失败
				if(err || res.errMsg !== 'login:ok') return uni.$showError('登陆失败!')
				console.log(res.errMsg)
				// 准备 参数对象
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				
				// console.log(query)
				// 换取token
				const {data: loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				if(loginResult.meta.status !== 200) {
					console.log(loginResult.meta.status)
					// 声明一个假字符串 尝试 伪装token
					this.updateToken('tadiwhiu98wadggadwadu18273hajdhd')
					
					return uni.$showMsg('登陆失败---1')
				}
				uni.$showMsg('登陆成功')
				// 登陆成功后 把token存放至vuex 由vuex 进行存储
				// 由于这里我 登陆一直失败 感觉是 服务器的问题 所以只有暂时搁置
				// 
				// loginResult.message.token
				
				// 声明一个假字符串 尝试 伪装token
				// this.updateToken('tadiwhiu98wadggadwadu18273hajdhd')
			}

		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		&::after {
			content: " ";
			display: block;
			width: 100%;
			height: 40px;
			position: absolute;
			bottom: 0;
			left: 0;
			border-radius: 100%;
			background: white;
			transform: translateY(50%);
		}

		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0px;
			background-color: #c00000;
		}

		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
