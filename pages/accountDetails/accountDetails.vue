<template>
	<view class="list">
		<view class="item topUp">
			<view class="info">
				<icon class="iconfont iconchongzhi"></icon>
				<view class="details">
					<view>充值到账</view>
					<text>09-12 13：22</text>
				</view>
			</view>
			<text class="amount">+2566</text>
		</view>
		<view class="item withdraw">
			<view class="info">
				<icon class="iconfont iconchongzhi1"></icon>
				<view class="details">
					<view>充值到账</view>
					<text>09-12 13：22</text>
				</view>
			</view>
			<text class="amount">-2566</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
