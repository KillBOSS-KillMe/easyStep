<template>
	<view>
		<view class="headBg"></view>
		<scroll-view scroll-y="true" >
			<view class="pay">
				<view class="info">
					<view class="title">成为会员</view>
					<view class="setAmount">
						<input type="number" placeholder="99" disabled :value="amount" />
						<text>元</text>
					</view>
				</view>
				<view class="info">
					<view class="title">会员权益</view>
					<view class="description">开通会员即可参与步数换金豆</view>
				</view>
				<view class="shereButton">
					<button>立即支付</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Vip from "./vip-model.js";
	const vip = new Vip()
	export default {
		data() {
			return {
				userInfo: {},
				amount: 99,
			}
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				let userInfo = that.userInfo
				if (userInfo.expiration > 0) {
					let nowTime = Date.parse(new Date()) / 1000;
					if (userInfo.expiration > nowTime) {
						that.vipTime = userVIP.transformTime(userInfo.expiration * 1000)
						that.timeShow = true
					}
				} else {
					that.timeShow = false
				}
			},
			// 获取支付所需参数
			openVIP(e) {
				const that = this
				let type = userVIP.get_data_set(e, "type");
				userVIP.getPayInfo({
					openid: that.userInfo.openid,
					member_type: type
				}, (res) => {
					if (res.code == '4000') {
						that.payData = res.data
						// 执行支付
						that.runPay()
					}
					// callBack && callBack();
				})
			},
			runPay() {
				// 仅作为示例，非真实参数信息。
				const that = this
				const payData = that.payData
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: payData.timeStamp,
					nonceStr: payData.nonceStr,
					package: payData.package,
					signType: payData.signType,
					paySign: payData.paySign,
					success: function (res) {
						// console.log('success:' + JSON.stringify(res));
						// console.log(res)
						// if (res.errMsg == "requestPayment:ok") {
							that.getUserInfo()
						// }
						
					},
					fail: function (err) {
							console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			getUserInfo(callBack) {
				const that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						var code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								userVIP.login({
									code: code,
									role: that.userInfo.role, // 角色
									portrait: infoRes.userInfo.avatarUrl,
									nickname: infoRes.userInfo.nickName
								}, (res) => {
									// console.log(res)
									if (res.code == 4000) {
										that.userInfo = res.data
										that.$store.commit('updateUserInfo', that.userInfo);
										that._onLoad()
									}
									callBack && callBack();
								})
							}
						})
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
		//   that.getListData();
		// },
		// 分享
		onShareAppMessage() {
			let shareData = {
				title: '',
				path: `pages/index/index?${this.userInfo.id}`,
				imageUrl: ''
			}
			return vip.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	page {
		// background-color: #fff;
	}
	.headBg {
		background-color: @themeColor;
		width: 100%;
		height: 122rpx;
		border-radius: 0 0 20rpx 20rpx;
		z-index: 1;
	}
	scroll-view {
		position: absolute;
		top: 0;
		left: 0;
		width: 750rpx;
		height: auto;
	}
	.pay {
		.info:nth-child(2){
			border-radius: 0;
			margin-top: 30rpx;
			.description {
				width: 100%;
				height: auto;
				line-height: 40rpx;
				font-size: @descriptionSize;
				color: @fontColor_2;
			}
		}
		.info {
			width: 710rpx;
			height: auto;
			padding: 30rpx 20rpx;
			border-radius: 20rpx 20rpx 0 0;
			background-color: #fff;
			.title {
				font-size: @titleSize_1;
				font-weight: @mainFontWeight;
				color: @mainFontColor;
				padding-bottom: 30rpx;
			}
			.setAmount {
				width: 670rpx;
				height: 80rpx;
				padding: 0 20rpx;
				margin-top: 30rpx;
				margin-bottom: 50rpx;
				background-color: #F1F1F1;
				font-size: @descriptionSize;
				color: @mainFontColor;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				border-radius: 10rpx;
				input {
					width: 100%;
					height: 100%;
					text-align: right;
					padding: 0 20rpx;
				}
			}
		}
		.shereButton {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: auto; // 140rpx
			button {
				width: 710rpx;
				height: 80rpx;
				margin: 20rpx;
				background: @buttonGradient;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
