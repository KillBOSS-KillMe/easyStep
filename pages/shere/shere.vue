<template>
	<view>
		<view class="headBg"></view>
		<scroll-view scroll-y="true">
			<view class="article">
				<image src="../../static/images/logo.png" mode=""></image>
				<view class="info">
					<text>夏日瘦身的N种方法</text>
					<p>炎热夏季，总有小伙伴抱怨肥肉太多不敢穿清凉美衣，那么现在你不用怕啦，贴心的多学多用为你准备N 种可以瘦的方法，总有一种让你瘦成一道闪电！</p>
				</view>
				<view class="shereButton">
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share">立即分享</button>
					<!-- #endif -->
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Shere from "./shere-model.js";
	const shere = new Shere()
	export default {
		data() {
			return {
				userInfo: {},
			}
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.getDetailsData(() => {
					callBack && callBack();
				})
			},
			// 获取列表
			getDetailsData(callBack) {
				const that = this
				shere.getDetailsData({}, (res) => {
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
		// 分享
		onShareAppMessage() {
			return shere.onShareAppMessage({});
		}
		// onShareAppMessage(res) {
		// 	var shareObj = {
		// 		title: "转发的标题", // 默认是小程序的名称(可以写slogan等)
		// 		path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
		// 		imageUrl: '../../static/images/stepBg.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		// 		success: function(res) {
		// 			// 转发成功之后的回调
		// 			if (res.errMsg == 'shareAppMessage:ok') {}
		// 		},
		// 		// fail: function() {
		// 		// 	// 转发失败之后的回调
		// 		// 	if (res.errMsg == 'shareAppMessage:fail cancel') {
		// 		// 		// 用户取消转发
		// 		// 	} else if (res.errMsg == 'shareAppMessage:fail') {
		// 		// 		// 转发失败，其中 detail message 为详细失败信息
		// 		// 	}
		// 		// },
		// 		// complete: fucntion() {
		// 		// 	// 转发结束之后的回调（转发成不成功都会执行）
		// 		// }
		// 	};
		// 	// 来自页面内的按钮的转发
		// 	// if (options.from == 'button') {
		// 	// 	var eData = options.target.dataset;
		// 	// 	console.log(eData.name); // shareBtn
		// 	// 	// 此处可以修改 shareObj 中的内容
		// 	// 	shareObj.path = '/pages/index/index?btn_name=' + eData.name;
		// 	// }
		// 	return shareObj;
		// }
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	page {
		background-color: #fff;
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

	.article {
		image {
			width: 100%;
			height: 480rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.info {
			width: 710rpx;
			height: auto;
			padding: 20rpx;
			padding-bottom: 160rpx;
			font-size: @titleSize_1;
			color: @fontColor_2;

			text {
				font-size: 31rpx;
				font-weight: @mainFontWeight;
				color: @mainFontColor;
				padding-bottom: 20rpx;
			}

			p {
				margin-top: 20rpx;
				line-height: 40rpx;
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
