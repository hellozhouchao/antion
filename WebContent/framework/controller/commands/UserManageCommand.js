puremvc.define({
    name: 'ejx4ui.controller.command.UserManageCommand',
    parent: puremvc.SimpleCommand
}, {
    execute: function (note) {
        var userManageProxy = this.facade.retrieveProxy(ejx4ui.model.proxy.UserManageProxy.NAME);
        var body = note.getBody();
        switch (note.getName()) {
            case ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_REQUEST:	// 用户列表数据
                userManageProxy.listUserInfo(body);
                break;
            case ejx4ui.AppConstants.USERMANAGE_USERINFO_DATA_REQUEST:		// 用户信息数据
            	userManageProxy.getUserInfo(body);
            	break;
            case ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_REQUEST:		// 检测登入名
            	userManageProxy.checkUserName(body);
            	break;
            case ejx4ui.AppConstants.USERMANAGE_USERINFO_ADD_REQUEST:		// 添加用户数据
            	userManageProxy.addUserInfo(body);
            	break;
            case ejx4ui.AppConstants.USERMANAGE_USERINFO_DELETE_REQUEST:	// 删除用户数据
            	userManageProxy.deleteUserInfo(body);
            	break;
            case ejx4ui.AppConstants.USERMANAGE_USERINFO_UPDATE_REQUEST:	// 更新用户数据
            	userManageProxy.updateUserInfo(body);
            	break;
        }
    }
});
