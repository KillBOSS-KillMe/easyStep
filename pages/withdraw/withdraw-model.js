import Base from '../../static/js/base'
class Withdraw extends Base{
	constructor() {
		super();
	}
	// 获取列表
	getListData(data,callBack) {
		var that = this;
		var params = {
		  url: 'auth/me',
		  method:'POST',
		  data:data,
		  sCallBack: function (res) {
			callBack && callBack(res.data);
		  }
		};
		that.request(params);
	};
}

export default Withdraw