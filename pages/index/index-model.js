import Base from '../../static/js/base'
class Index extends Base {
	constructor() {
		super();
	}
	// 登录
	login(data, callBack) {
		var that = this;
		var params = {
			url: 'auth/login',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 获取用户信息
	getUserInfo(data, callBack) {
		var that = this;
		var params = {
			url: 'auth/me',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 获取步数
	getRunData(data, callBack) {
		var that = this;
		var params = {
			url: 'step/getInfo',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 兑换步数
	exchangeBeans(data, callBack) {
		var that = this;
		var params = {
			url: 'step/exchangeBean',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default Index
