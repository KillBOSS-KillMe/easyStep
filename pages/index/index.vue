<template>
	<view>
		<view class="stepCon">
			<image src="../../static/images/stepBg.png" mode=""></image>
			<view class="stepNum">
				<text class="name">总步数</text>
				<text class="stepData">100000</text>
			</view>
			<text class="description">步数每日凌晨24点计算</text>
		</view>
		<view class="myData">
			<view class="title">我的数据</view?>
				<ul class="features">
					<li class="item">
						<text class="name">昨日步数(步)</text>
						<text class="data">2222</text>
					</li>
					<li class="item">
						<text class="name">消耗(千卡)</text>
						<text class="data">2222</text>
					</li>
					<li class="item">
						<text class="name">产金豆(个)</text>
						<text class="data">222啊2</text>
					</li>
				</ul>
			</view>
			<!-- <getUserInfoButton /> -->
			<button open-type="getUserInfo" v-if="authorizationButton" id='getUserInfo' lang="zh_CN" @getuserinfo="onGotUserInfo"></button>
		</view>
</template>

<script>
	// 公共组件
	// import getUserInfoButton from "@/components/getUserInfoButton.vue";
	import Index from "./index-model.js";
	var index = new Index();
	export default {
		data() {
			return {
				title: 'Hello',
				authorizationButton: null
			}
		},
		// components: {
		//   // 获取用户信息组件
		//   getUserInfoButton
		// },
		onLoad() {
			this.onGetUserInfo()
			// 提示开通会员
			this.promptOpenVip()
		},
		methods: {
			// 用户信息获取
			onGetUserInfo() {
				// 查看是否授权
				index.show_loading('加载中...')
				uni.getSetting({
					success: res => {
						console.log(res)
						if (res.authSetting['scope.userInfo']) {
							this.$store.commit('updateAuthorizationButtonData', false);
							this.authorizationButton = this.$store.state.authorizationButton;
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							uni.getUserInfo({
								provider: 'weixin',
								success: res => {
									console.log(res)
									// 使用vuex获取原有的用户信息
									this.userInfo = this.$store.state.userInfo;
									// 数据合并
									this.userInfo = Object.assign(this.userInfo, res.userInfo)
									// 把数据更新到vuex  state
									this.$store.commit('updateUserInfo', this.userInfo);
									console.log(this.userInfo)
									// 用户信息保存服务器
									this.setUserInfo()
								}
							})
						} else {
							this.collectionStr = true
						}
					}
				})
			},
			// 用户信息保存服务器
			setUserInfo() {
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						console.log(loginRes.authResult);
						// 获取运动步数
						this.getRunData()
					}
				});
			},
			// 获取步数
			getRunData() {
				wx.getWeRunData({
					success: res => {
						console.log(res)
						let encryptedData = res.encryptedData
						let iv = res.iv
						index.hide_loading()
						// wepy.login().then(res => {
						// 	let code = res.code
						// 	// 提交步数(未解密)
						// 	wx.request({
						// 		url: `${this.$parent.globalData.requestUrl}/api/getStepInformation`,
						// 		method: 'POST',
						// 		header: {
						// 			AuthrizeOpenId: this.$parent.globalData.openId
						// 		},
						// 		data: {
						// 			code: code,
						// 			encryptedData: encryptedData,
						// 			iv: iv
						// 		},
						// 		success: data => {
						// 			if (data.data.success) {
						// 				this.todayStep = data.data.data.today_step
						// 				this.$parent.globalData.todayStep = this.todayStep
						// 				let getStep = data.data.data.get_step
						// 				let costStep = data.data.data.cost_step
						// 				this.$parent.globalData.total = this.todayStep + costStep - getStep
						// 				console.log(this.$parent.globalData.allStep)
						// 				this.$apply()
						// 			} else {
						// 				wx.showModal({
						// 					title: '',
						// 					content: data.data.errmsg
						// 				})
						// 			}
						// 		}
						// 	})
						// })
					}
				})
			},
			// 提示开通会员
			promptOpenVip() {
				uni.showModal({
					title: '系统提示',
					content: '检测到用户未开通会员，是否开通会员',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');
							let url = `/pages/vip/vip`
							uni.navigateTo({
								url: url
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	.stepCon {
		position: relative;
		width: 750rpx;
		height: auto;
		padding-bottom: 200rpx;
		background-color: @themeColor;
		border-radius: 0 0 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		image {
			width: 440rpx;
			height: 440rpx;
			margin: 20rpx 0;
		}

		.stepNum {
			position: absolute;
			width: auto;
			height: 60rpx;
			top: 210rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
			color: #FFFFFF;

			text {
				text-shadow: 0px 3px 1px #999;
			}

			.name {
				font-size: @descriptionSize;
			}

			.stepData {
				font-weight: @mainFontWeight;
				font-size: 30rpx;
			}
		}

		.description {
			font-size: @descriptionSize;
			color: #fff;
			;
		}
	}

	.myData {
		position: absolute;
		top: 600rpx;
		left: 0;
		right: 0;
		width: 710rpx;
		height: auto;
		border-radius: 20rpx;
		margin: 0 20rpx;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		background-color: #fff;
		z-index: 10;

		.title {
			width: 670rpx;
			height: auto;
			margin: 0 20rpx;
			font-size: @titleSize_1;
			font-weight: @mainFontWeight;
			color: @mainFontColor;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.features {
			width: 670rpx;
			height: auto;
			margin: 0 20rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid @borderColor;

			li {
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				padding-top: 20rpx;

				.name {
					font-size: @descriptionSize;
					color: #898989;
				}

				.data {
					font-size: @descriptionSize;
					font-weight: @mainFontWeight;
					color: @mainFontColor;
				}
			}
		}
	}
</style>
