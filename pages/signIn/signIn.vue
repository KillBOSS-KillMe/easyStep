<template>
	<view>
		<view class="head">
			<view class="dayNmu">
				<text class="title">连续签到</text>
				<view>
					{{continuousDays}}
					<text>天</text>
				</view>
			</view>
			<!-- 删除already属性，即为可点击状态 -->
			<view :class="'signinButton ' + signinClass" @tap="signin">{{signinStatus}}</view>
		</view>
		<view class="dayShow">
			<view :class="selShowData <= index?'list':'list dayShowSelected'" v-for="(item,index) in 7" :key="item">
				<view>第{{index + 1 }}天</view>
				<view>
					<image src="../../static/images/logo.png" mode=""></image>
				</view>
				<!-- <view>+{{reward[index]}}</view> -->
				<view>+20</view>
			</view>
		</view>

	</view>
</template>

<script>
	import SignIn from "./signIn-model.js";
	const signIn = new SignIn()
	export default {
		data() {
			return {
				userInfo: {},
				continuousDays: 0,
				signinStatus: '立即签到',
				signinClass: 'signin',
				selShowData: 0,
				reward: []
			};
		},
		components: {

		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				// 使用vuex获取原有的用户信息
				this.userInfo = this.$store.state.userInfo;
				// 签到信息查询
				this.getUserSignin()
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
				},
			// 签到
			signin() {
				wx.request({
					url: `${this.$parent.globalData.requestUrl}/api/userSignin`,
					method: 'PUT',
					header: {
						AuthrizeOpenId: this.$parent.globalData.openId
					},
					success: data => {
						if (data.data.success) {
							this.continuousDays = data.data.data.continuous_days
							if (this.continuousDays > 7) {
								this.selShowData = this.continuousDays % 7
							} else {
								this.selShowData = this.continuousDays
							}
							this.getBeans = data.data.data.get_beans
							this.signinStatus = '已签到'
							this.signinClass = 'already'
							this.$apply()
							wx.showModal({
								title: '',
								content: `${this.signinStatus}获得${this.getBeans}活力豆`
							})
							// 签到信息查询
							this.getUserSignin()
						} else {
							wx.showModal({
								title: '',
								content: data.data.errmsg
							})
						}
					}
				})
			},
			// 签到信息查询
			getUserSignin() {
				wx.request({
					url: `${this.$parent.globalData.requestUrl}/api/userSignInformation`,
					method: 'GET',
					header: {
						AuthrizeOpenId: this.$parent.globalData.openId
					},
					success: data => {
						if (data.data.success) {
							if (data.data.data.continuous_day.status === '已签到') {
								this.signinClass = 'already'
								this.signinStatus = '已签到'
							}
							let rewardData = data.data.data.setting_bean
							this.reward[0] = rewardData.first_day
							this.reward[1] = rewardData.second_day
							this.reward[2] = rewardData.third_day
							this.reward[3] = rewardData.fourth_day
							this.reward[4] = rewardData.fifth_day
							this.reward[5] = rewardData.sixth_day
							this.reward[6] = rewardData.seventh_day
							this.continuousDays = data.data.data.continuous_day.continuous_day
							if (this.continuousDays > 7) {
								this.selShowData = this.continuousDays % 7
							} else {
								this.selShowData = this.continuousDays
							}
							this.$apply()
						} else {
							wx.showModal({
								title: '',
								content: data.data.errmsg
							})
						}
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
			return activity.onShareAppMessage({});
		}
	}
</script>

<style lang='less'>
	@import url("../../static/css/variable.less");
	page {
		background-color: #fff;
	}

	.head {
		width: 670rpx;
		height: 92rpx;
		margin: 20rpx;
		padding: 40rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #DCF8E8;
		border-radius: 20rpx;
		.dayNmu {
			height: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;
			color: @themeColor;
			.title {
				font-size: @descriptionSize;
			}
			view{
				font-size: @titleSize_1;
				font-weight: @mainFontWeight;
				text{
					font-size: @descriptionSize;
				}
			}
		}
		.signinButton {
			width: 150rpx;
			height: 60rpx;
			font-size: @titleSize_1;
			border-radius: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.signin {
			background: @buttonGradient;
			color: #fff;
		}
		.already {
			background: @buttonGradient_2;
			color: @mainFontColor;
		}
	}


	.dayShow {
		margin-top: 20rpx;
		width: 750rpx;
		height: auto;
		background-color: #fff;
		padding-bottom: 20rpx;
	}

	.dayShow .list {
		height: 215rpx;
		display: inline-block;
		width: 150rpx;
		// border: 1rpx solid red;
	}

	.dayShow .list view:nth-child(2) {
		margin: 16rpx 34rpx;
		width: 76rpx;
		height: 76rpx;
		border-radius: 38rpx;
		border: 1rpx solid #eee;
		background-color: #eee;
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.dayShow .list image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 38rpx;
	}

	.dayShow .list view:nth-child(1),
	.dayShow .list view:nth-child(3) {
		font-size: 30rpx;
		color: #606060;
		text-align: center;
	}

	.dayShow .list view:nth-child(3) {
		font-size: 25rpx;
	}

	.dayShowSelected view:nth-child(1),
	.dayShowSelected view:nth-child(3) {
		color: #ff8000 !important;
	}

	.dayShowSelected view:nth-child(2) {
		background-color: #ff8000 !important;
	}
</style>
