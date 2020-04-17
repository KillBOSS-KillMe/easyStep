import Base from '../../static/js/base'
class Help extends Base{
	constructor() {
		super();
	}
	// 加载帮助文档
	getHelpsList(data,callBack) {
		console.log('===============')
		console.log(data)
		console.log(callBack)
		var that = this;
		var params = {
		  url: 'helps/getHelpsList',
		  method:'GET',
		  data:data,
		  sCallBack: function (res) {
			callBack && callBack(res.data);
		  }
		};
		that.request(params);
	};
}

export default Help	