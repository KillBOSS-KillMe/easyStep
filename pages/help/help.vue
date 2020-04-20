<template>
	<view>
		<view class="titleImg">
			<image src="../../static/images/logo.png" mode=""></image>
		</view>
		<view class="list">
			<view class="listCon">
				<!-- ===================列表中加入listHide  描述信息隐藏====================== -->
					<view :class="selId == item.id?'con':'con listHide'" :data-id="item.id" v-for="(item,index) in helpList" :key="item" @tap="selShow">
						<view class="listShow">
							<view>{{index + '.' + item.title}}</view>
							<icon class="iconfont iconxiangyou"></icon>
						</view>
						<view class="listShowSon">{{item.content}}</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Help from "./help-model.js";
	const help = new Help()
	export default {
		data() {
			return {
				helpList: [],
				selId: null,
				imgUrl: ''
			};
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods:{
			_onLoad(callBack) {
				const that = this
				that.getHelpsList(() => {
					callBack && callBack();
				})
			},
			// 用户信息获取
			getHelpsList(callBack) {
				const that = this
				help.getHelpsList({}, (res) => {
					if (res.status_code == 'ok') {
						that.helpList = res.data
					}
					callBack && callBack();
				})
			},
			selShow(e) {
			    this.selId = help.get_data_set(e, "id");
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
			return help.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	.titleImg {
		width: 750rpx;
		height: 380rpx;
		background-color: #fff;
		image {
			width: 750rpx;
			height: 360rpx;
		}
	}
	.list {
		min-height: 700rpx;
		margin-top: 20rpx;
		margin-bottom: 110rpx;
	}

	.list,
	.con {
		width: 750rpx;
		height: auto;
		background-color: #fff;
	}

	.con .iconfont {
		transform: rotate(90deg);
	}

	.listShow {
		width: 750rpx;
		min-height: 80rpx;
		line-height: 80rpx;
		color: #333;
		font-size: 30rpx;
		border-bottom: 1rpx solid #e5e5e5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.listShow image {
		width: 20rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}

	.listShow view {
		width: 650rpx;
		font-weight: 700;
	}

	.listShowSon {
		height: auto;
		line-height: 45rpx;
		padding: 20rpx 50rpx;
		color: #333;
		font-size: 25rpx;
	}

	.listHide .listShowSon {
		display: none;
	}

	.listHide .iconfont {
		transform: rotate(0deg) !important;
	}
</style>
