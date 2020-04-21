import Base from '../../static/js/base'
class Withdraw extends Base {
	constructor() {
		super();
	}
	// 提现
	runWithdraw(data, callBack) {
		var that = this;
		var params = {
			url: 'cash_withdrawal/cashWithdrawalApply',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 上传图片
	getCard(data, callBack) {
		var that = this;
		var params = {
			url: 'cash_withdrawal/cashWithdrawalApply',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res);
			}
		};
		that.upload(params);
	};
}

export default Withdraw
