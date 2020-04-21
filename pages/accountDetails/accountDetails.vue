<template>
	<view class="list">
		<view :class="item.type == 2?'item withdraw':'item topUp'" :data-id="item.id" v-for="(item,index) in listData" :key="index">
			<view class="info">
				<icon class="iconfont iconchongzhi" v-if="item.type == 1"></icon>
				<icon class="iconfont iconchongzhi1" v-if="item.type == 2"></icon>
				<icon class="iconfont icondouzi" v-if="item.type == 3"></icon>
				<view class="details">
					<view>{{item.title}}</view>
					<text>{{item.time}}</text>
				</view>
			</view>
			<text class="amount">{{item.money}}</text>
		</view>
	</view>
</template>

<script>
	import AccountDetails from "./accountDetails-model.js";
	const accountDetails = new AccountDetails()
	export default {
		data() {
			return {
				userInfo: {},
				listData: [],
			};
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				// 使用vuex获取原有的用户信息
				that.userInfo = that.$store.state.userInfo;
				that.getListData(() => {
					callBack && callBack();
				})
			},
			getListData(callBack) {
				const that = this
				accountDetails.getListData({}, (res) => {
					if (res.status_code == 'ok') {
						that.listData = res.data
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
			let shareData = {
				title: '',
				path: `pages/index/index?${this.userInfo.id}`,
				imageUrl: ''
			}
			return accountDetails.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	page {
		background-color: #fff;
	}
	.list {
		width: 750rpx;
		height: auto;
		.item {
			width: 710rpx;
			height: 60rpx;
			padding: 20rpx 0;
			margin: 0 20rpx;
			border-bottom: 1px solid @borderColor;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.info {
				display: flex;
				align-items: center;
				justify-content: space-between;
				.details {
					height: 60rpx;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					flex-direction: column;
					view {
						font-size: @titleSize_1;
						font-weight: @mainFontWeight;
						color: @mainFontColor;
					}
					text {
						font-size: @descriptionSize;
						color: @fontColor_2;
					}
				}
				.iconfont {
					width: 56rpx;
					height: 56rpx;
					border-radius: 56rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 40rpx;
					color: #fff;
					margin-right: 20rpx;
				}
			}
			.amount {
				font-size: @titleSize_1;
			}
		}
		.topUp {
			.iconfont {
				background-color: @themeColor;
			}
			.amount {
				color: @themeColor;
			}
		}
		.withdraw {
			.iconfont {
				background-color: @fontColor_2;
			}
			.amount {
				color: @fontColor_2;
			}
		}
	}
	
</style>
