<template>
	<view>
		<ul class="list">
			<li class="item" v-for="(item,index) in 5" :key="item">
				<image src="../../static/images/logo.png" mode=""></image>
				<view class="description">
					<view class="info">
						<text class="title">夏日瘦身的N种方法</text>
						<text>参与签到活动，领取更多金豆</text>
					</view>
					<button @tap="goDetails" :data-id="1">立即签到</button>
					<!-- <button>立即分享</button> -->
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	// import Activity from "./activity-model.js";
	// var activity = new Activity()
	export default {
		data() {
			return {
			};
		},
		methods: {
			goDetails(e) {
				let url = `/pages/shere/shere?id=${e.currentTarget.dataset.id}`
				console.log(url)
				uni.navigateTo({
					url: url
				})
				// const that = this;
				// const id = activity.get_data_set(e, "id");
				// activity.navigate_to(`pages/shere/shere?id=${id}`);
			}
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
