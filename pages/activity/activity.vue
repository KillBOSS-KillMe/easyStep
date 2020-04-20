<template>
	<view>
		<ul class="list">
			<li class="item">
				<image src="../../static/images/logo.png" mode=""></image>
				<view class="description">
					<view class="info">
						<text class="title">夏日瘦身的N种方法</text>
						<text>参与签到活动，领取更多金豆</text>
					</view>
					<button @tap="goSignIn" :data-id="1">立即签到</button>
				</view>
			</li>
			<li class="item">
				<image src="../../static/images/logo.png" mode=""></image>
				<view class="description">
					<view class="info">
						<text class="title">夏日瘦身的N种方法</text>
						<text>参与签到活动，领取更多金豆</text>
					</view>
					<button @tap="goShere" :data-id="1">立即分享</button>
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	import Activity from "./activity-model.js";
	const activity = new Activity()
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		onLoad() {
			// const that = this
			// that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				that.getListData(() => {
					callBack && callBack();
				})
			},
			// 获取列表
			getListData(callBack) {
				const that = this
				activity.getListData({}, (res) => {
					if (res.status_code == 'ok') {
						let userInfo = that.$store.state.userInfo;
						that.userInfo = Object.assign(userInfo, res.data)
						that.$store.commit('updateUserInfo', that.userInfo);
					}
					callBack && callBack();
				})
			},
			
			goSignIn(e) {
				// const that = this;
				// const id = activity.get_data_set(e, "id");
				activity.navigate_to(`/pages/signIn/signIn`);
			},
			goShere(e) {
				// const that = this;
				// const id = activity.get_data_set(e, "id");
				activity.navigate_to(`/pages/shere/shere`);
			},
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
			return activity.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.list {
		width: 100vw;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.item {
			width: 710rpx;
			height: auto;
			background-color: #fff;
			border-radius: 20rpx;
			margin-top: 30rpx;
			image {
				width: 100%;
				height: 190rpx;
				border-radius: 20rpx 20rpx 0 0;
			}
			.description {
				width: 670rpx;
				height: auto;
				padding: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-between !important;
				.info {
					height: 70rpx;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					flex-direction: column;
					text{
						font-size: @descriptionSize;
						color: @fontColor_2;
					}
					.title {
						font-size: @titleSize_1;
						font-weight: @mainFontWeight;
						color: @mainFontColor;
					}
				}
				button {
					width: auto;
					height: auto;
					line-height: 26rpx;
					font-size: 26rpx;
					color: #fff;
					padding: 20rpx 30rpx;
					border-radius: 50rpx;
					background: @buttonGradient;
					margin: 0;
				}
			}
		}
	}
</style>
