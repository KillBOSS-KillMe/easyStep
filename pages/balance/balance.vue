<template>
	<view>
		<view class="headBg"></view>
		<view class="info">
			<image src="../../static/images/balanceBg.png" mode=""></image>
			<view class="details">
				<view class="data">
					<text>我的余额</text>
					<text class="num">26591.00</text>
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
