import Base from '../../static/js/base'
class Shere extends Base{
	constructor() {
		super();
	}
	// 获取文章详情
	getDetailsData(data,callBack) {
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

export default Shere	