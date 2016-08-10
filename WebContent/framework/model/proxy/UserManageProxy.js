puremvc.define({
	name : 'ejx4ui.model.proxy.UserManageProxy',
	parent : puremvc.Proxy
}, {
	stats : {},
	LOCAL_STORAGE_NAME : 'ejx4ui-usermanageproxy',
	list : [], // 数据模型
	onRegister : function() {
		userManageProxyObj = this;
	},
	/**
	 * 获取用户列表数据
	 */
	listUserInfo : function(data) {
		var pageGrid = extUtil.json2Str(data.pageGrid);
		$.post('ajax/ejx4web.action', {
			_sid : 'listUserInfo',
			json : pageGrid,
		}, function(data) {
			var res = extUtil.str2Json(data);
			userManageProxyObj.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_RESPONSE, res);
		});
	},

	/**
	 * 获取用户数据
	 */
	getUserInfo : function(data) {
		//
	},

	/**
	 * 检测用户统一登入名
	 */
	checkUserName : function(data) {
		var dataStr = extUtil.json2Str(data);
		$.post('ajax/ejx4web.action', {
			_sid : 'checkUserName',
			json : dataStr,
		}, function(data) {
			var res = extUtil.str2Json(data);
			userManageProxyObj.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_RESPONSE, res);
		});
		
	},

	/**
	 * 添加用户信息 
	 */
	addUserInfo : function(data) {
		var dataStr = extUtil.json2Str(data);
		$.post('ajax/ejx4web.action', {
			_sid : 'addUserInfo',
			json : dataStr,
		}, function(data) {
			var res = extUtil.str2Json(data);
			userManageProxyObj.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_ADD_RESPONSE, res);
		});
	},

	/**
	 * 删除用户信息 
	 */
	deleteUserInfo : function(data) {
		var dataStr = extUtil.json2Str(data);
		$.post('ajax/ejx4web.action', {
			_sid : 'deleteUserInfoByIds',
			json : dataStr,
		}, function(data) {
			var res = extUtil.str2Json(data);
			userManageProxyObj.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_DELETE_RESPONSE, res);
		});
	},

	/**
	 * 更新用户信息 
	 */
	updateUserInfo : function(data) {
		var dataStr = extUtil.json2Str(data);
		$.post('ajax/ejx4web.action', {
			_sid : 'updateUserInfo',
			json : dataStr,
		}, function(data) {
			var res = extUtil.str2Json(data);
			userManageProxyObj.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_UPDATE_RESPONSE, res);
		});
	}

}, {
	NAME : 'UserManageProxy'
});