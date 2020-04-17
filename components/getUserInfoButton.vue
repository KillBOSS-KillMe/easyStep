<template>
	<view>
		123123123123
		<button open-type="getUserInfo" v-if="authorizationButton" id='getUserInfo' lang="zh_CN" @getuserinfo="onGotUserInfo"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				authorizationButton: true
			};
		},
		methods: {
			onGotUserInfo() {
				// 获取用户信息
				uni.getUserInfo({
					provider: 'weixin',
					success: res => {
						console.log(res)
						// login.login({
						// 	encryptData:res.encryptedData,
						// 	iv:res.iv,
						// 	code:code,
						// 	type:2,
						// 	provider:1
						// },(res)=>{
						// 	if(res.code == 8888){
						// 		login.set_storage('token',res.data.token);
						// 		login.set_storage('token_type',res.data.token_type);
						// 		login.navigate_back();	
						// 	}
						// })
					}
				})
			}
		}
	}
</script>

<style lang="less">
	#getUserInfo {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
	}
</style>
