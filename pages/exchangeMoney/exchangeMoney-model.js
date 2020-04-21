import Base from '../../static/js/base'
class Withdraw extends Base {
	constructor() {
		super();
	}
	// 提现
	exchange(data, callBack) {
		var that = this;
		var params = {
			url: 'step/exchangeWallet',
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
