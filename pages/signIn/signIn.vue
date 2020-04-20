<template>
	<view>
		<view class="head">
			<view class="dayNmu">
				<text class="title">连续签到</text>
				<view>
					{{signInInfo.continuity}}
					<text>天</text>
				</view>
			</view>
			<!-- 删除already属性，即为可点击状态 -->
			<view class="signinButton already" @tap="signin" v-if="signInInfo.today == 1">已签到</view>
			<view class="signinButton signin" @tap="signin" v-else>立即签到</view>
		</view>
		<view class="dayShow">
			<view :class="item.str == true?'list dayShowSelected':'list'" v-for="(item,index) in signInInfo.list" :key="item">
				<view>第{{index + 1 }}天</view>
				<view>
					<!-- 已经签到图 -->
					<image src="../../static/images/logo.png" data-aa="1" v-if="item.str"></image>
					<!-- 未签到图 -->
					<image src="../../static/images/logo.png" data-aa="2" v-else></image>
				</view>
				<view>+{{item.signInBean}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import SignIn from "./signIn-model.js";
	const signin = new SignIn()
	export default {
		data() {
			return {
				userInfo: {},
				signInInfo: {
					list: [
						{str: false, signInBean: 0},
						{str: false, signInBean: 0},
						{str: false, signInBean: 0},
						{str: false, signInBean: 0},
						{str: false, signInBean: 0},
						{str: false, signInBean: 0},
						{str: false, signInBean: 0}
						],
					continuity: 0,
					today: 0
				}
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
				const that = this
				that.userInfo = that.$store.state.userInfo;
				// 签到信息查询
				that.getUserSignin(() => {
					callBack && callBack();
				})
			},
			signin() {
				const that = this
				if (that.signInInfo.today == 1) {
					signin.show_tips('今天已签到')
					return false
				}
				that.runSignin(() => {
					that.getUserSignin(() => {
						callBack && callBack();
					})
				})
			},
			// 签到
			runSignin(callBack) {
				const that = this
				signin.runSignin({}, (res) => {
					if (res.status_code == 'ok') {
						callBack && callBack();
					}
				})
			},
			// 签到信息查询
			getUserSignin(callBack) {
				const that = this
				signin.getUserSignin({}, (res) => {
					let data = res.data
					let cycleDays = data.continuity % 7
					let cycleList = []
					let signInBean = parseInt(data.startSignInBean)
					let increase = parseInt(data.increase)
					for (let i = 0; i < 7; i++) {
						let dayInfo = {}
						if (i >= cycleDays) {
							dayInfo['str'] = false
						} else {
							dayInfo['str'] = true
						}
						dayInfo['signInBean'] = signInBean + increase * i
						cycleList.push(dayInfo)
					}
					that.signInInfo = {
						list: cycleList,
						continuity: data.continuity,
						today: data.today
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
			return signIn.onShareAppMessage(shareData);
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
