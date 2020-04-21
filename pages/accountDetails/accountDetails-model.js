import Base from '../../static/js/base'
class AccountDetails extends Base {
	constructor() {
		super();
	}
	// 获取列表
	getListData(data, callBack) {
		var that = this;
		var params = {
			url: 'cash_withdrawal/cashWithdrawalRecord',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default AccountDetails
