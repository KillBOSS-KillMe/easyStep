import Base from '../../static/js/base'
class Withdraw extends Base {
	constructor() {
		super();
	}
	// 签到
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
}

export default Withdraw
