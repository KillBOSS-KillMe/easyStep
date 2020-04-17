<template>
	<view>
		<view class="headBg"></view>
		<scroll-view scroll-y="true" >
			<view class="pay">
				<view class="info">
					<view class="title">提现至微信</view>
					<view class="setAmount">
						<text>￥</text>
						<input type="number" placeholder="提现金额" value="" />
					</view>
					<view class="description">可提现金额20159.00元，今日最低限额1000.00元，最高限额 10000.00元</view>
				</view>
				<view class="shereButton">
					<button>提现</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				defaultAmount: 100,
				amountList: [100, 200, 300, 400, 500, 600]
			}
		},
		methods: {
			
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
				border-bottom: 1rpx solid @borderColor;
				padding-bottom: 30rpx;
			}
			.setAmount {
				width: 670rpx;
				height: 80rpx;
				padding: 0 20rpx;
				margin-top: 30rpx;
				margin-bottom: 50rpx;
				// background-color: #F1F1F1;
				// font-size: @descriptionSize;
				font-size: 40rpx;
				color: @mainFontColor;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				border-bottom: 1rpx solid @borderColor;
				padding-bottom: 30rpx;
				text {
					font-size: 40rpx;
					color: @mainFontColor;
				}
				input {
					width: 100%;
					height: 100%;
					// text-align: right;
					padding: 0 20rpx;
				}
			}
			.description {
				width: 100%;
				height: auto;
				line-height: 40rpx;
				// padding: 30rpx 0;
				font-size: @descriptionSize;
				color: @fontColor_2;
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
