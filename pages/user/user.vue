<template>
	<view>
		<view class="headBg"></view>
		<view class="userInfo">
			<image :src="userInfo.avatar" mode=""></image>
			<text class="userNamer">{{userInfo.nickname}}</text>
			<ul class="features">
				<li class="item" @tap="goExchangeMoney">
					<text class="name">金豆(个)</text>
					<text class="data">{{userInfo.bean}}</text>
				</li>
				<li class="item" @tap="goBalancePage">
					<text class="name">金额(元)</text>
					<text class="data">{{userInfo.wallet}}</text>
				</li>
			</ul>
		</view>
		<ul class="featuresList">
			<button open-type='contact' session-from=''>
				<li class="item">
					<view class="name">
						<icon class="iconfont iconkefu"></icon>
						客服
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</li>
			</button>
			<li class="item" @tap="goHelpPage">
				<view class="name">
					<icon class="iconfont iconbangzhu"></icon>
					帮助中心
				</view>
				<icon class="iconfont iconxiangyou"></icon>
			</li>
			<li class="item" @tap="goVIP" v-if="userInfo.type != 'member'">
				<view class="name">
					<icon class="iconfont iconbangzhu"></icon>
					开通会员
				</view>
				<icon class="iconfont iconxiangyou"></icon>
			</li>
		</ul>
	</view>
</template>

<script>
	import User from "./user-model.js";
	var user = new User();
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onShow() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				// 使用vuex获取原有的用户信息
				this.userInfo = this.$store.state.userInfo;
				// console.clear()
				// console.log('------------')
				// console.log(this.userInfo)
			},
			// 进入豆子兑换页
			goExchangeMoney() {
				user.navigate_to("/pages/exchangeMoney/exchangeMoney");
			},
			// 进入余额页
			goBalancePage(e) {
				user.navigate_to("/pages/balance/balance");
			},
			// 进入帮助页
			goHelpPage(e) {
				user.navigate_to("/pages/help/help");
			},
			goVIP() {
				user.navigate_to("/pages/vip/vip");
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
			return user.onShareAppMessage(shareData);
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

	.userInfo {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 710rpx;
		height: auto;
		border-radius: 20rpx;
		margin: 0 20rpx;
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		background-color: #fff;
		z-index: 10;

		image {
			width: 110rpx;
			height: 110rpx;
			border-radius: 110rpx;
			margin: 20rpx;
		}

		.userNamer {
			font-size: 29rpx;
			font-weight: @mainFontWeight;
			color: @mainFontColor;
		}

		.features {
			width: 670rpx;
			height: auto;
			margin: 0 20rpx;
			margin-top: 50rpx;
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
					font-size: 25rpx;
					color: #898989;
				}

				.data {
					font-size: 25rpx;
					font-weight: @mainFontWeight;
					color: @mainFontColor;
				}
			}
		}
	}

	.featuresList {
		width: 670rpx;
		height: auto;
		padding: 0 20rpx;
		margin: 0 20rpx;
		margin-top: 260rpx;
		background-color: #fff;
		border-top: 1px solid @borderColor;
		border-radius: 20rpx;

		.item:nth-child(1) {
			border-bottom: 1px solid @borderColor;
		}

		.item {
			width: 100%;
			height: 70rpx;
			padding: 15rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			view {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 29rpx;
				font-weight: @mainFontWeight;
				color: @mainFontColor;

				.iconfont {
					margin-right: 20rpx;
					color: @themeColor;
				}
			}

			.iconfont {
				display: flex;
				align-items: center;
				justify-content: center;
				color: @fontColor_2;
			}
		}
	}
</style>
