<template>
	<view class="cashOut">
		<view class="cash">
			<text class="cashMoney">提现金额</text>
			<view class="cashInput">
				<label for="">￥</label>
				<input type="digit" value="" @input="getWithdrawNum" placeholder="请输入提现金额" />
			</view>
			<view class="displayCash">
				<view class="item">
					可提现金额<text>￥{{userInfo.wallet}}</text>
				</view>
			</view>
		</view>
		<view class="cash">
			<text class="cashMoney">选择提现账户</text>
			<view>
				<radio-group @change="radioChange" style="width: 690rpx;display: flex;">
					<view class="item">
						<label class="radio">
							<radio class="itemRadio" value="1" />
							<text>支付宝</text>
						</label>
					</view>
					<view class="item">
						<label class="radio">
							<radio class="itemRadio" value="2" />
							<text>微信</text>
						</label>
					</view>
				</radio-group>
				<view @tap="getCard">
					<image class="cashImg" v-if="imgAlipayShow == ''" src="../../static/images/imgLost.png" mode=""></image>
					<image class="cashImg" v-else :src="imgAlipayShow" mode=""></image>
				</view>
				<text class="tip" v-if="types == '1'">请上传支付宝收款码</text>
				<text class="tip" v-else-if="types == '2'">请上传微信收款码</text>
				<text class="tip" v-else>请选择提现方式</text>
			</view>
			<button type="" class="cashButton" @tap="runWithdraw">确认提现</button>
		</view>
	</view>
</template>

<script>
	import Withdraw from "./withdraw-model.js";
	const withdraw = new Withdraw()
	export default {
		data() {
			return {
				userInfo: {},
				withdrawNum: '',
				imgAlipayShow: '',
				types: ''
			}
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
			},
			// 上传图片
			getCard(callBack) {
				const that = this
				if (that.types == '') {
					withdraw.show_tips('请选择收款方式')
					return false
				}
				withdraw.getCard(1, (res) => {
					if (res.status_code == 'ok') {
						that.imgAlipayShow = res.data
						withdraw.show_tips(res.message)
					} else {
						withdraw.show_tips(res.message)
					}
				})
			},
			// 收款方式选择
			radioChange(e) {
				const that = this
				that.types = withdraw.get_input_val(e)
			},
			// 提现金额设置
			getWithdrawNum(e) {
				const that = this
				that.withdrawNum = withdraw.get_input_val(e)
			},
			// 提现
			runWithdraw() {
				const that = this
				if (that.withdrawNum == '') {
					withdraw.show_tips('请输入提现金额')
					return false
				}
				if (that.imgAlipayShow == '') {
					withdraw.show_tips('请上传收款码')
					return false
				}
				if (that.types == '') {
					withdraw.show_tips('请选择收款方式')
					return false
				}
				withdraw.runWithdraw({
					money: that.withdrawNum,
					qrcode: that.imgAlipayShow,
					type: that.types
				}, (res) => {
					withdraw.show_tips(res.message)
				})
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
			return withdraw.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	.cashOut {
		width: 690rpx;
		padding: 30rpx;
	}

	.cash {
		width: 638rpx;
		padding: 26rpx;
		margin-bottom: 30rpx;
		/* height: 214rpx; */
		background: #ffffff;
		border: 1rpx solid #ffffff;
		box-shadow: 0rpx 10rpx 35rpx 0rpx rgba(228, 228, 228, 0.4);
		border-radius: 14rpx;
	}

	.cash .cashMoney {
		font-size: 24rpx;
		font-weight: 700;
		color: #333333;
	}

	.cash .cashInput {
		width: 638rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #D2D2D2;
		margin: 10rpx 0 18rpx;
		height: 70rpx;
	}

	.cash .cashInput label {
		font-size: 32rpx;
		font-weight: 700;
		color: #666666;
		margin-right: 10rpx;
	}

	.cash .cashInput input {
		font-size: 24rpx;
		font-weight: 500;
		color: #999;
	}

	.cash .displayCash {
		display: flex;
		align-content: center;
	}

	.cash .displayCash .item {
		display: flex;
		align-content: center;
		margin-right: 20rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}

	.cash .displayCash .item text {
		color: #2390DC;
	}

	.radio {
		display: flex;
		align-items: center;
		margin-right: 18rpx;
	}

	.radio text {
		font-size: 24rpx;
		font-weight: 700;
		color: #666666;
	}

	.itemRadio {
		transform: scale(.7);
	}

	.cashImg {
		width: 147rpx;
		height: 147rpx;
		border-radius: 14rpx;
		overflow: hidden;
		margin: 10rpx 0;
	}

	.tip {
		font-size: 20rpx;
		font-weight: 500;
		color: #999999;
	}

	.cashButton {
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		width: 690rpx;
		background: @themeColor;
		box-shadow: 0rpx 10rpx 45rpx 0rpx rgba(35, 144, 220, 0.6);
		font-size: 32rpx;
		font-weight: 700;
		color: #ffffff;
		border: none;
		border-radius: 60rpx;
		padding: 4rpx 0;
	}

	// page {
	// 	// background-color: #fff;
	// }
	// .headBg {
	// 	background-color: @themeColor;
	// 	width: 100%;
	// 	height: 122rpx;
	// 	border-radius: 0 0 20rpx 20rpx;
	// 	z-index: 1;
	// }
	// scroll-view {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	width: 750rpx;
	// 	height: auto;
	// }
	// .pay {
	// 	.info {
	// 		width: 710rpx;
	// 		height: auto;
	// 		padding: 30rpx 20rpx;
	// 		border-radius: 20rpx 20rpx 0 0;
	// 		background-color: #fff;
	// 		.title {
	// 			font-size: @titleSize_1;
	// 			font-weight: @mainFontWeight;
	// 			color: @mainFontColor;
	// 			border-bottom: 1rpx solid @borderColor;
	// 			padding-bottom: 30rpx;
	// 		}
	// 		.setAmount {
	// 			width: 670rpx;
	// 			height: 80rpx;
	// 			padding: 0 20rpx;
	// 			margin-top: 30rpx;
	// 			margin-bottom: 50rpx;
	// 			// background-color: #F1F1F1;
	// 			// font-size: @descriptionSize;
	// 			font-size: 40rpx;
	// 			color: @mainFontColor;
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: flex-start;
	// 			border-bottom: 1rpx solid @borderColor;
	// 			padding-bottom: 30rpx;
	// 			text {
	// 				font-size: 40rpx;
	// 				color: @mainFontColor;
	// 			}
	// 			input {
	// 				width: 100%;
	// 				height: 100%;
	// 				// text-align: right;
	// 				padding: 0 20rpx;
	// 			}
	// 		}
	// 		.description {
	// 			width: 100%;
	// 			height: auto;
	// 			line-height: 40rpx;
	// 			// padding: 30rpx 0;
	// 			font-size: @descriptionSize;
	// 			color: @fontColor_2;
	// 		}
	// 	}
	// 	.shereButton {
	// 		position: fixed;
	// 		left: 0;
	// 		bottom: 0;
	// 		width: 100%;
	// 		height: auto; // 140rpx
	// 		button {
	// 			width: 710rpx;
	// 			height: 80rpx;
	// 			margin: 20rpx;
	// 			background: @buttonGradient;
	// 			color: #fff;
	// 			display: flex;
	// 			align-items: center;
	// 			justify-content: center;
	// 		}
	// 	}
	// }
</style>
