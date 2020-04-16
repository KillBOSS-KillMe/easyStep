<template>
	<view>
		<view class="headBg"></view>
		<scroll-view scroll-y="true" >
			<view class="article">
				<image src="../../static/images/logo.png" mode=""></image>
				<view class="info">
					<text>夏日瘦身的N种方法</text>
					<p>炎热夏季，总有小伙伴抱怨肥肉太多不敢穿清凉美衣，那么现在你不用怕啦，贴心的多学多用为你准备N 种可以瘦的方法，总有一种让你瘦成一道闪电！</p>
				</view>
				<view class="shereButton">
					<button>立即分享</button>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
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
