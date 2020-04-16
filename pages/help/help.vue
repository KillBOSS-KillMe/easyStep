<template>
	<view>
		<view class="titleImg">
			<image src="../../static/images/logo.png" mode=""></image>
		</view>
		<view class="list">
			<view class="listCon">
				<!-- ===================列表中加入listHide  描述信息隐藏====================== -->
					<view :class="selId == item.id?'con':'con listHide'" :data-id="item.id" v-for="(item,index) in helpData" :key="item" @tap="selShow">
						<view class="listShow">
							<view>{{index + '.' + item.name}}</view>
							<icon class="iconfont iconxiangyou"></icon>
						</view>
						<view class="listShowSon">{{item.articleCon}}</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				helpData: [{
						'id': 1,
						'name': '什么是益步步？',
						'articleCon': '益步步是以微信运动步数为基础的运动奖励计划，通过微信运动步数可免费兑换活力豆，活力豆可以在游戏标签内的所有娱乐游戏中进行消耗获得，累计获得的活力豆可以在商城内兑换各种超值奖品。益步步抓住大众这个缺乏有效运动驱动力的痛点，用物质激励为用户提供了锻炼的理由，以一个顺从人性的“支点”撬动了这件反人性的事。同时，将运动和公益相结合，可以将微信运动步数进行捐赠，我们将向公益组织或公益活动捐赠相对应的公益资金。'
					},
					{
						'id': 2,
						'name': '什么是活力豆？',
						'articleCon': '活力豆在益步步小程序中这可以通过运动步数按照兑换比例兑换、点击充值按钮充值和小程序内的其他方式方法获得，它可以在益步步小程序中兑换商城中商品兑换消耗。'
					},
					{
						'id': 3,
						'name': '我的步数增加了，为什么不能兑换活力豆？',
						'articleCon': '有可能是以下情况：A、增加的步数换算为活力豆不足0.1，所以没有不能兑换；B、每日步数兑换活力豆的次数超过三次C、当天的兑换总步数超过3万步，目前系统步数兑换的上限为3万步，超过3万步以3万步计算。'
					},
					{
						'id': 4,
						'name': '我邀请了好友，为什么没有获得活力豆奖励？',
						'articleCon': '有可能是以下情况：A、您邀请的好友并不是新用户，所以未获得邀请奖励；B、您的每日邀请已经达到上限了，也不会再获得活力豆奖励；C、为规避作弊行为，系统判定你邀请的用户并非有效邀请。'
					},
					{
						'id': 5,
						'name': '为什么显示微信步数获取失败，获取不到步数？',
						'articleCon': 'A、检查手机是否支持微信运动；B、检查微信运动是否已授权，如未授权则可重新授权；C、如仍未解决，请退回微信主界面点击发现-小程序，找到益步步小程序，长按（安卓）或者左滑（IOS）删除，然后搜索益步步小程序重新进入。'
					},
					{
						'id': 6,
						'name': '活力豆是否可以提现？',
						'articleCon': '活力豆不支持提现，但是可以在益步步小程序内消耗与获得，可以在兑换中兑换购买。'
					},
					{
						'id': 7,
						'name': '兑换商城中兑换购买的商品什么时候发货？',
						'articleCon': '一般情况下，会在72小时内发货'
					},
					{
						'id': 8,
						'name': '兑换商城兑换购买的商品可以修改收货地址吗？',
						'articleCon': '不支持修改地址。'
					},
					{
						'id': 9,
						'name': '兑换商城兑换的商品，支持七天无理由退换货吗？',
						'articleCon': '这个暂时是不支持的'
					},
					{
						'id': 10,
						'name': '没有用过微信运动怎么办？',
						'articleCon': '在微信内直接搜索“微信运动”就可以找到，进去后点击启用，然后进入益步步进行授权，就可以记录并显示您每天的运动步数了。'
					},
					{
						'id': 11,
						'name': '运动步数和活力豆的兑换比例是多少？',
						'articleCon': '步数与活力豆的兑换比例是不固定的，会视平台整体收益进行阶段性调整，当前的兑换比例为100：1。'
					},
					{
						'id': 12,
						'name': '步数挑战是怎么玩的？',
						'articleCon': '步数挑战活动目前报名需要契约金，当天报名，第二天活动才开始执行，第三天会发放活力豆。'
					},
					{
						'id': 13,
						'name': '为什么我进入不了益步步了，而且会闪退？',
						'articleCon': '那是因为我们平台检测到你有作弊行为，对你的账号进行了封停，禁止使用第三方辅助软件修改数据！一旦发现永久封号哦，希望大家保持运动的初心。'
					},
					{
						'id': 14,
						'name': '我能用多个微信账号兑换吗？',
						'articleCon': '我们不允许同一个用户使用多个账号轮流兑换的行为，如果有恶意兑换行为，我们会对此类用户进行封停。'
					},
					{
						'id': 15,
						'name': '知识答题是怎么玩的？题目类型只是某一种题型吗？',
						'articleCon': '知识挑战题目会不定期更新题库，题型包含但不限于文学、生活、体育、娱乐等等，答题过程中会随机出现各种不同类型题目，必须在规定时间内答题，否则将会直接跳转至下一题，直至此轮知识答题结束。'
					},
					{
						'id': 16,
						'name': '步数挑战怎么同步数据，为什么步数达标了没有发放奖励？',
						'articleCon': '参与步数挑战的步数，需要进入报名的对应的活动模块进行步数同步，比如你报名参加的挑战是10000步，进入10000步模块提交步数即可，未在对应页面上传当日实际步数，将无法成功上报数据。'
					},
					{
						'id': 17,
						'name': '步数挑战契约金是怎么分成的？',
						'articleCon': '步数挑战成功后的用户会平均分成参加报名当前步数挑战的所有用户的契约金。挑战步数失败的用户无任何奖励。'
					},
					{
						'id': 18,
						'name': '为什么不能偷取微信好友步数？',
						'articleCon': '可以把小程序分享给微信好友，微信好友授权登录之后就可以在排行榜看到微信好友的步数，可以点击偷的手势进行偷取好友步数。'
					},
					{
						'id': 19,
						'name': '玩大转盘怎么扣除的活力豆数量不对？',
						'articleCon': '大转盘分为 100、200、300、500四个不同的倍数区域，每个区域所扣除的活力豆是不同的。'
					},
					{
						'id': 20,
						'name': '兑换商城的物品就这么多吗？',
						'articleCon': '我们会不断地筛选不错的产品到兑换商城中，每个用户可以按照自己的喜好选择不同的商品，每个商品的库存是不同的，兑完即止！'
					},
					{
						'id': 21,
						'name': '活力豆兑换商品每个人兑换有限制吗？',
						'articleCon': '每人每天最多仅可兑换1件商品(相同账号、手机号、收货地址视为同一人)'
					},
					{
						'id': 22,
						'name': '《步数的力量》提倡健康运动、公平兑换',
						'articleCon': '《步数的力量》提倡健康运动、公平兑换。若出现恶意刷步数行为，《益步步》有权判定你的部分或全部兑换礼品无效，并对你的账号进行暂时或永久性封号。'
					}

				],
				selId: null,
				imgUrl: ''
			};
		},
		methods:{
			selShow(e) {
			    this.selId = e.currentTarget.dataset.id
			  }
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
		line-height: 30rpx;
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
