puremvc.define({
    name: 'ejx4ui.controller.command.CommonCommand',
    parent: puremvc.SimpleCommand
}, {
    execute: function (note) {
        var body = note.getBody();
        var commonProxy = this.facade.retrieveProxy(ejx4ui.model.proxy.CommonProxy.NAME);
        switch (note.getName()) {
            case ejx4ui.AppConstants.COMMON_SESSION_DATA_REQUEST: // 获取菜单列表信息
                commonProxy.getSessionData(body);
                break;
            case ejx4ui.AppConstants.COMMON_MAINTABS_ADD_REQUEST: // 添加Tab选项卡，加载特定页面
                commonProxy.addTab(body);
                break;
            case ejx4ui.AppConstants.COMMON_PASSWORD_UPDATE_REQUEST: // 请求修改用户个人密码
            	commonProxy.updateUserPwd(body);
            	break;
            case ejx4ui.AppConstants.COMMON_NOTICE_DATA_REQUEST: // 请求通知数据
            	commonProxy.getNoticeData(body);
            	break;
        }
    }
});
