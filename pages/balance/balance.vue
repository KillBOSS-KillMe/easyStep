<template>
	<view>
		<view class="headBg"></view>
		<view class="info">
			<image src="../../static/images/balanceBg.png" mode=""></image>
			<view class="details">
				<view class="data">
					<text>我的余额</text>
					<text class="num">{{userInfo.wallet}}</text>
				</view>
				<view class="button" @tap="goAccountDetails">
					<view>账户明细</view>
				</view>
			</view>
		</view>
		<view class="operating">
			<view @tap="goPay">充值</view>
			<view @tap="goWithdraw">提现</view>
		</view>
	</view>
</template>

<script>
	import Balance from "./balance-model.js";
	var balance = new Balance();
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				// 使用vuex获取原有的用户信息
				const that = this
				that.userInfo = that.$store.state.userInfo;
				console.clear()
				console.log('1111111111------------')
				console.log(this.userInfo)
			},
			// 充值
			goPay(e) {
				balance.navigate_to(`/pages/pay/pay`);
			},
			goWithdraw() {
				balance.navigate_to(`/pages/withdraw/withdraw`);
			},
			// 账户明细
			goAccountDetails() {
				balance.navigate_to(`/pages/accountDetails/accountDetails`);
			},
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
			return balance.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.headBg {
		background-color: @themeColor;
		width: 100%;
		height: 122rpx;
		border-radius: 0 0 20rpx 20rpx;
		z-index: 1;
	}
	.info {
		position: absolute;
		top: 0;
		left: 20rpx;
		width: 710rpx;
		height: 270rpx;
		z-index: 2;
		// margin: 0 20rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.details{
			position: absolute;
			top: 0;
			left: 0;
			width: 670rpx;
			height: 190rpx;
			padding: 40rpx 20rpx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			.data {
				width: auto;
				height: 90rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				text {
					font-size: @descriptionSize;
					color: @fontColor_2;
				}
				.num {
					font-size: 35rpx;
					font-weight: @mainFontWeight;
					color: @mainFontColor;
				}
			}
			.button {
				width: auto;
				height: auto;
				background: @buttonGradient;
				padding: 2rpx;
				border-radius: 50rpx;
				view {
					font-size: @titleSize_1;
					color: @themeColor;
					padding: 9rpx 19rpx;
					background-color: #fff;
					border-radius: 50rpx;
				}
			}
		}
	}
	.operating {
		position: absolute;
		top: 225rpx;
		left: 115rpx;
		width: 520rpx;
		height: 90rpx;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		z-index: 3;
		view {
			width: 50%;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: @descriptionSize;
			color: @mainFontColor;
		}
		view:nth-child(1){
			border-right: 1px solid @borderColor;
		}
		view:nth-child(2){
			border-left: 1px solid @borderColor;
		}
	}
</style>
