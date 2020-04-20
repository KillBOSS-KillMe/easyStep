<template>
	<view>
		<view class="headBg"></view>
		<scroll-view scroll-y="true" >
			<view class="pay">
				<view class="info">
					<view class="title">充值金额</view>
					<ul class="optionsList">
						<li :class="item == defaultAmount?'active':''" v-for="(item,index) in amountList" :key="item">
							<view>{{item}}</view>
							<view>元</view>
						</li>
					</ul>
					<view class="title">自定义金额</view>
					<view class="setAmount">
						<input type="number" placeholder="请输入自定义金额" value="" />
						<text>元</text>
					</view>
				</view>
				<view class="shereButton">
					<button>充值</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Pay from "./pay-model.js";
	const pay = new Pay()
	export default {
		data() {
			return {
				userInfo: {},
				defaultAmount: 100,
				amountList: [100, 200, 300, 400, 500, 600]
			}
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				// 使用vuex获取原有的用户信息
				this.userInfo = this.$store.state.userInfo;
				console.clear()
				console.log('1111111111------------')
				console.log(this.userInfo)
				that.getListData(() => {
					callBack && callBack();
				})
			},
			getListData() {
				const that = this
				accountDetails.getListData({}, (res) => {
					if (res.status_code == 'ok') {
						let userInfo = that.$store.state.userInfo;
						that.userInfo = Object.assign(userInfo, res.data)
						that.$store.commit('updateUserInfo', that.userInfo);
					}
					callBack && callBack();
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
			return activity.onShareAppMessage({});
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
				// padding: 30rpx 0;
			}
			.optionsList {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				padding: 30rpx 0;
				li {
					width: 215rpx;
					height: 80rpx;
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: @mainFontColor;
					background-color: #f1f1f1;
					border-radius: 10rpx;
					view:nth-child(1){
						font-size: @titleSize_1;
						font-weight: @mainFontWeight;
					}
					view:nth-child(2){
						font-size: @descriptionSize;
					}
				}
				.active {
					background-color: @themeColor;
					color: #fff;
				}
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
