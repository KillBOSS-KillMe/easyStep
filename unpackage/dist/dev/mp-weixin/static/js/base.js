import Config from './config'
class Base {
	constructor() {
		this.base_qequest_url = Config.requset_url;
		this.base_wx_login_url = Config.wx_login_url;
		this.base_wx_order_pay_url = Config.wx_order_pay_url;
		this.apikey = Config.apikey;
	}
	//提示
	show_loading(message) {
		if (uni.showLoading) {
			// 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
			uni.showLoading({
				title: message,
				mask: true
			});
		} else {
			// 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
			uni.showToast({
				title: message,
				icon: 'loading',
				mask: true,
				duration: 20000
			});
		}
	}
	//隐藏
	hide_loading() {
		if (uni.hideLoading) {
			// 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
			uni.hideLoading();
		} else {
			uni.hideToast();
		}
	}
	//网络请求
	request(params) {
		var that = this;
		that.show_loading('加载中...');
		var url = that.base_qequest_url + params.url;
		var token = '';
		var token_type = '';
		that.get_storage('token', (res) => {
			token = res;
			that.get_storage('token_type', (res) => {
				token_type = res;
				uni.request({
					url: url,
					data: params.data || {},
					header: {
						'content-type': 'application/json',
						'apikey': that.apikey,
						'Authorization': token_type + ' ' + token
					},
					method: params.method || 'GET',
					success: function (ret) {
						console.log('++++++++++++++++++++++||||||||||||||||||||||||||||||++++++++++++++++++++')
						console.log(ret)
						var code = ret.statusCode.toString().charAt(0);
						if (code == '2' || code == '4') {
							that.hide_loading();
							if (ret.data.status_code == 500) {
								that.refresh_token(params); return;
							}

							params.sCallBack && params.sCallBack(ret); return;
						}

					},
					fail: function (err) {
						that.remove_storage('token');
						that.remove_storage('token_type');
						//that.hide_loading();
					}
				})
			})
		})
	}
	//图片上传
	upload(count, callBack) {
		var that = this;
		var url = that.base_qequest_url + 'upload/upload_file';
		var token = '';
		var token_type = '';
		that.get_storage('token', (res) => {
			token = res;
			that.get_storage('token_type', (res) => {
				token_type = res;
				uni.chooseImage({
					count: count,
					success: function (res) {
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							uni.uploadFile({
								url: url,
								filePath: res.tempFilePaths[i],
								name: 'file',
								header: {
									'apikey': that.apikey,
									'Authorization': token_type + ' ' + token
								},
								success: function (uploadFileRes) {
									var data = JSON.parse(uploadFileRes.data);
									if (data.code == 1001 || data.code == 1002 || data.code == 1004) {
										that.show_modal({ content: ret.data.msg }, (res) => {
											if (res.confirm) {
												that.switch_tab('../../pages/my/my'); return;
											}
										})
									} else if (data.code == 1003) {
										that.request({
											url: 'login/refresh',
											method: 'PUT',
											sCallBack: function (res) {
												if (res.data.code == 8888) {
													that.set_storage('token', res.data.data.token);
													that.set_storage('token_type', res.data.data.token_type);
												} else {
													that.show_modal({ content: '请先登录！' }, (res) => {
														if (res.confirm) {
															that.navigate_to('../../pages/login/login'); return;
														}
													})
												}
											}
										}); return;
									} else if (data.code == 4444) {
										that.show_tips({ title: ret.data.msg }); return;
									}
									callBack(data);
								}
							});
						}
					}
				});
			})
		})
	}
	//刷新token
	refresh_token(params) {
		var that = this;
		that.request({
			url: 'auth/refresh',
			method: 'PUT',
			sCallBack: function (res) {
				if (res.data.code == 8888) {
					that.set_storage('token', res.data.data.token);
					that.set_storage('token_type', res.data.data.token_type);
				} else {
					that.remove_storage('token');
					that.remove_storage('token_type');
				}
				that.request(params);
			}
		});
	}
	//跳转tab
	switch_tab(url) {
		uni.switchTab({
			url: url
		})
	}
	//跳转页面
	navigate_to(url) {
		uni.navigateTo({
			url: url
		})
	}
	//页面返回
	navigate_back(delta) {
		uni.navigateBack({
			delta: delta || 1,
		});
	}
	//设置缓存
	set_storage(key, value) {
		uni.setStorage({
			key: key,
			data: value
		});
	}
	//获取缓存
	get_storage(key, callBack) {
		uni.getStorage({
			key: key,
			success: function (res) {
				callBack(res.data);
			},
			fail: function (e) {
				callBack('');
			}
		});
	}
	//删除缓存
	remove_storage(key) {
		uni.removeStorage({
			key: key
		});
	}

	//弹出框
	show_modal(params, callBack) {
		uni.showModal({
			title: params.title || '提示',
			content: params.content || '网络错误...',
			showCancel: params.showCancel === false ? false : true,
			cancelText: params.cancelText || '取消',
			success: function (res) {
				callBack(res);
			}
		});
	}
	//获取标签中的参数
	get_data_set(event, key) {
		return event.currentTarget.dataset[key];
	};
	//获取input的值
	get_input_val(event) {
		return event.target.value;
	};
	//数组去重
	unique_arr(arr) {
		var hash = [];
		for (var i = 0; i < arr.length; i++) {
			if (hash.indexOf(arr[i]) == -1) {
				hash.push(arr[i]);
			}
		}
		return hash;
	}
	//判断是否为手机号
	is_phone_number(tel) {
		var reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
		return reg.test(tel);
	}
	//判断验证码是否正确
	is_code_number(code) {
		var reg = /^[0-9]{6}$/;
		return reg.test(code);
	}

	//提示框
	show_tips(options) {
		uni.showToast({
			title: options.title || '加载中...',
			icon: 'none',
			duration: 2000
		});
	}
	//根据下标删除数组元素
	delete_arr_index(arr, index) {
		arr.splice(index, 1);
		return arr;
	}
	//图片预览
	previewImage(urls) {
		uni.previewImage({
			urls: urls
		})
	}
	//打电话
	make_phone_call(phoneNumber) {
		uni.makePhoneCall({
			phoneNumber: phoneNumber.toString()
		});
	}
	//分享
	onShareAppMessage(data) {
		return {
			title: data.title || '万小二',
			path: data.path || 'pages/index/index'
		};
	}
}
export default Base