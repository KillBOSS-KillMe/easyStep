<template>
	<view>
		<view class="stepCon">
			<image src="../../static/images/stepBg.png" mode=""></image>
			<view class="stepNum">
				<text class="name">总步数</text>
				<text class="stepData">{{weRunData.todayStep}}</text>
			</view>
			<text class="description">点击上方按钮兑换金豆</text>
		</view>
		<view class="myData">
			<view class="title">我的数据</view?>
				<ul class="features">
					<li class="item">
						<text class="name">昨日步数(步)</text>
						<text class="data">{{weRunData.lastDayStep}}</text>
					</li>
					<li class="item">
						<text class="name">消耗(千卡)</text>
						<text class="data">{{weRunData.calorie}}</text>
					</li>
					<li class="item">
						<text class="name">产金豆(个)</text>
						<text class="data">{{weRunData.bean}}</text>
					</li>
				</ul>
			</view>
			<!-- <getUserInfoButton /> -->
			<button open-type="getUserInfo" v-if="authorizationButton" id='getUserInfo' lang="zh_CN" @getuserinfo="_onLoad"></button>
		</view>
</template>

<script>
	// 公共组件
	// import getUserInfoButton from "@/components/getUserInfoButton.vue";
	import Index from "./index-model.js";
	const index = new Index();
	export default {
		data() {
			return {
				options: {},
				title: 'Hello',
				authorizationButton: null,
				userInfo: {},
				userInfoAll: {},
				weRunData: {
					calorie: "0", // 昨日消耗卡路里
					lastDayStep: 0, // 昨日步数
					todayStep: 0 // 今日步数
				}
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		onShow() {
			// 获取已授权类别
			const that = this
			uni.getSetting({
				success(res) {
					if (res.authSetting['scope.userInfo']) {
						// 隐藏授权按钮
						that.authorizationButton = false;
						that.$store.commit('updateAuthorizationButtonData', false);
					}
				},
				fail() {
					console.log("获取授权信息授权失败")
				}
			})
			// let token = index.get_storage('token_type', callBack);
			// if(token) {
			// 	that.getUserInfo(() => {
			// 		that.getRunData(() => {
			// 			callBack && callBack();
			// 		})
			// 	})
			// }
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				that.wx_login(() => {
					that.getUserInfo(() => {
						if (that.userInfo.type == 'member') {
							// 会员进入兑换步数
							that.getRunData(() => {
								that.runExchangeBeans(() => {
									callBack && callBack();
								})
							})
						} else {
							// 提示用户非会员
							that.promptOpenVip()
						}
					})
				})
			},
			exchangeBeans(callBack) {
				const that = this
				that.runExchangeBeans(() => {
					that.getRunData(() => {
						callBack && callBack();
					})
				})
			},
			wx_login(callBack) {
				const that = this;
				that.authorizationButton = that.$store.state.authorizationButton;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						var code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								that.userInfoAll = infoRes
								that.$store.commit('updateUserInfo', that.userInfo);
								that.$store.commit('updateAuthorizationButtonData', false);
								index.login({
									code: code,
									share_id: that.options.id,
									headimgurl: infoRes.userInfo.avatarUrl,
									nickname: infoRes.userInfo.nickName,
									sex: infoRes.userInfo.gender
								}, (res) => {
									if (res.status_code == 'ok') {
										index.set_storage('token', res.access_token);
										index.set_storage('token_type', res.token_type);
									}
									callBack && callBack();
								})
							}
						})
					}
				});
			},
			// 用户信息获取
			getUserInfo(callBack) {
				const that = this
				index.getUserInfo({}, (res) => {
					if (res.status_code == 'ok') {
						let userInfo = that.$store.state.userInfo;
						that.userInfo = Object.assign(userInfo, res.data)
						that.$store.commit('updateUserInfo', that.userInfo);
						that.$store.commit('updataSettingsInfo', res.settings);
					}
					callBack && callBack();
				})
			},
			// 获取步数
			getRunData(callBack) {
				wx.getWeRunData({
					success: res => {
						const that = this
						index.getRunData({
							iv: res.iv,
							encryptedData: res.encryptedData,
							signature: that.userInfoAll.signature,
							rawData: that.userInfoAll.rawData
						}, (res) => {
							if (res.status_code == 'ok') {
								that.weRunData = res.data
							}
							callBack && callBack();
						})
					}
				})
			},
			
			// 兑换步数
			runExchangeBeans(callBack) {
				const that = this
				index.exchangeBeans({}, (res) => {
					// 提示
					index.show_tips(res.message)
					if (res.status_code == 'ok') {
						that.weRunData.bean = res.bean
					}
					// setTimeout(function() {
					// 	// callBack && callBack();
					// }, 2000)
				})
			},
			// 提示开通会员
			promptOpenVip(callBack) {
				uni.showModal({
					title: '系统提示',
					content: '系统检测到用户未开通会员，是否开通会员',
					success: res => {
						if (res.confirm) {
							index.navigate_to(`/pages/vip/vip`);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.page = 1;
			that._onLoad(() => {
				uni.stopPullDownRefresh();
			});
		},
		//上拉加载更多
		// onReachBottom() {
		//   var that = this;
		//   if (that.last_page == that.page) {
		//     return;
		//   }
		//   that.page += 1;
		//   that.get_product_list();
		// },
		// 分享
		onShareAppMessage() {
			let shareData = {
				title: '',
				path: `pages/index/index?${this.userInfo.id}`,
				imageUrl: ''
			}
			return index.onShareAppMessage(shareData);
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
