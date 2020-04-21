<template>
	<view class="cashOut">
		<view class="cash">
			<text class="cashMoney">兑换金额</text>
			<view class="cashInput">
				<label>
					<icon class="iconfont icondouzi"></icon>
				</label>
				<input type="number" value="" @input="getExchangeNum" :placeholder="'最少兑换'+settings.beanToWallet+'个'" />
			</view>
			<view class="displayCash">
				<view class="item">
					可兑换豆子<text>{{userInfo.bean}}</text>，{{settings.beanToWallet}}豆起兑
				</view>
			</view>
			<button type="" class="cashButton" @tap="runWithdraw">确认兑换</button>
		</view>
	</view>
</template>

<script>
	import ExchangeMoney from "./exchangeMoney-model.js";
	const exchangeMoney = new ExchangeMoney()
	export default {
		data() {
			return {
				settings: {},
				userInfo: {},
				exchangeNum: '',
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
				that.settings = that.$store.state.settings;
			},
			// 兑换数量设置
			getExchangeNum(e) {
				const that = this
				that.exchangeNum = exchangeMoney.get_input_val(e)
			},
			// 兑换
			runWithdraw() {
				const that = this
				if (that.exchangeNum == '') {
					exchangeMoney.show_tips('请输入兑换数量')
					return false
				}
				if(!/^[0-9]+$/.test(that.exchangeNum)) {
					exchangeMoney.show_tips('请输入正整数')
					return false
				}
				if (that.exchangeNum < that.settings.beanToWallet) {
					exchangeMoney.show_tips('兑换数量未达到最少兑换数')
					return false
				}
				exchangeMoney.exchange({
					bean: that.exchangeNum
				}, (res) => {
					exchangeMoney.show_tips(res.message)
					if (res.status_code == 'ok') {
						setTimeout(function(){
							exchangeMoney.navigate_back()
						}, 2000)
					}
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
		width: 588rpx;
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
		color: @themeColor;
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
		border-radius: 10rpx;
		padding: 4rpx 0;
	}
</style>
