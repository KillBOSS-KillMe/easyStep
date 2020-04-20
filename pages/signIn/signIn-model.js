import Base from '../../static/js/base'
class SignIn extends Base{
	constructor() {
		super();
	}
	// 获取签到信息
	getUserSignin(data,callBack) {
		var that = this;
		var params = {
		  url: 'sign_in/getSignInInfo',
		  method:'POST',
		  data:data,
		  sCallBack: function (res) {
			callBack && callBack(res.data);
		  }
		};
		that.request(params);
	};
	// 签到
	runSignin(data,callBack) {
		var that = this;
		var params = {
		  url: 'sign_in/SignIn',
		  method:'POST',
		  data:data,
		  sCallBack: function (res) {
			callBack && callBack(res.data);
		  }
		};
		that.request(params);
	};
}

export default SignIn	