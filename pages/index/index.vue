<template>
	<view>
		<view class="stepCon">
			<image src="../../static/images/stepBg.png" mode=""></image>
			<view class="stepNum">
				<text class="name">总步数</text>
				<text class="stepData">100000</text>
			</view>
			<text class="description">步数每日凌晨24点计算</text>
		</view>
		<view class="myData">
			<view class="title">我的数据</view?>
			<ul class="features">
				<li class="item">
					<text class="name">昨日步数(步)</text>
					<text class="data">2222</text>
				</li>
				<li class="item">
					<text class="name">消耗(千卡)</text>
					<text class="data">2222</text>
				</li>
				<li class="item">
					<text class="name">产金豆(个)</text>
					<text class="data">222啊2</text>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.stepCon {
		position: relative;
		width: 750rpx;
		height: auto;
		padding-bottom: 200rpx;
		background-color: @themeColor;
		border-radius: 0 0 20rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		image {
			width: 440rpx;
			height: 440rpx;
			margin: 20rpx 0;
		}
		.stepNum {
			position: absolute;
			width: auto;
			height: 60rpx;
			top: 210rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
			color: #FFFFFF;
			text {
				text-shadow: 0px 3px 1px #999;
			}
			.name {
				font-size: 25rpx;
			}
			.stepData {
				font-weight: @mainFontWeight;
				font-size: 30rpx;
			}
		}
		.description {
			font-size: 25rpx;
			color: #fff;;
		}
	}
	.myData {
		position: absolute;
		top: 600rpx;
		left: 0;
		right: 0;
		width: 710rpx;
		height: auto;
		border-radius: 20rpx;
		margin: 0 20rpx;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		background-color: #fff;
		z-index: 10;
		.title {
			width: 670rpx;
			height: auto;
			margin: 0 20rpx;
			font-size: 29rpx;
			font-weight: @mainFontWeight;
			color: @mainFontColor;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
		.features {
			width: 670rpx;
			height: auto;
			margin: 0 20rpx;
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-top: 1px solid @borderColor;
			li {
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				padding-top: 20rpx;
				.name {
					font-size: 25rpx;
					color: #898989;
				}
				.data {
					font-size: 25rpx;
					font-weight: @mainFontWeight;
					color: @mainFontColor;
				}
			}
		}
	}
</style>
