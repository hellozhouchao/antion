puremvc.define({
	name : 'ejx4ui.view.mediator.CommonMediator',
	parent : puremvc.Mediator
}, {
	listNotificationInterests : function() {
		return [ 
			ejx4ui.AppConstants.COMMON_SESSION_DATA_RESPONSE,	// 加载登入用户菜单
			ejx4ui.AppConstants.COMMON_MAINTABS_ADD_RESPONSE,	// 响应Tab页面加载
			ejx4ui.AppConstants.COMMON_PASSWORD_UPDATE_RESPONSE, // 响应个人密码修改
			ejx4ui.AppConstants.COMMON_NOTICE_DATA_RESPONSE	// 加载通知数据
		];
	},
	onRegister : function() {
		commonMediatorObj = this;
		$(document).on('click', '#north_pfMenu_changePwd', function() {
			userPwdEditDialog = extJQ.dialog({
				title : '用户密码修改',
				href : 'pages/admin/user/userPwdForm.html',
				width : 500,
				height : 200,
				buttons : [ {
					text : '确认变更',
					iconCls : 'icon-ok',
					handler : function() {
						var isValid = $("#userPwdForm_form").form('validate');
						if (!isValid) {
							$.messager.alert("提示", "校验未通过，请检查输入项！");
							return;
						}
						if (loginInfo.userInfo == null) {
							$.messager.alert("提示", "当前用户信息不存在，请重新登入后再执行本操作！");
							return;
						}
						extJQ.messagerConfirm("提示", "是否确认变更用户密码！操作将不可逆转！", function(r) {
							if (r) {
								var updatePwdCondition = extUtil.serializeObject($('#userPwdForm_form').form());
								updatePwdCondition.userId = loginInfo.userInfo.userId;
								commonMediatorObj.sendNotification(ejx4ui.AppConstants.COMMON_PASSWORD_UPDATE_REQUEST, updatePwdCondition);
							}
						});
					}
				}, {
					text : '关闭',
					iconCls : 'icon-cancel',
					handler : function() {
						userPwdEditDialog.dialog('close');
					}
				} ],
				onLoad : function() {
				}
			});
		});
	},
	handleNotification : function(note) {
		var body = note.getBody();
		switch (note.getName()) {
		/**
		 * 加载用户功能菜单<br>
		 * 菜单点击事件：打开菜单Tab页面
		 */
		case ejx4ui.AppConstants.COMMON_SESSION_DATA_RESPONSE:
			loginInfo = body.loginInfo;
			$('#layout_west_ctrlTree').tree({
				onClick : function(node) { /* 菜单点击事件：打开菜单Tab页面 */
					if (!$('#layout_west_ctrlTree').tree('isLeaf', node.target)) {
						if (node.state == 'closed') {
							$('#layout_west_ctrlTree').tree('expand', node.target);
						} else {
							$('#layout_west_ctrlTree').tree('collapse', node.target);
						}
						return false;
					}
					commonMediatorObj.sendNotification(ejx4ui.AppConstants.COMMON_MAINTABS_ADD_REQUEST, node);
				}
			});
			$('#layout_west_ctrlTree').tree('loadData', loginInfo.mainMenu);
			$('#loginUserName').html(loginInfo.userInfo.userName);
			$('#loginIpAddr').html(loginInfo.userIp);
		break;
		/**
		 * 加载菜单的Tab页面<br>
		 * 添加Tabs，具体页面内的事件与功能，交由页面根据自身需要功能进行加载
		 * Tab页面若已经打开，则跳转到并选中该Tab。<br>
		 */
		case ejx4ui.AppConstants.COMMON_MAINTABS_ADD_RESPONSE:
			// 若tab页已存活，则选中，否则打开tab
			if ($('#layout_center_tabs').tabs('exists', body.text)) {
				$('#layout_center_tabs').tabs('select', body.text);
			} else {
				var $centerTabs = $('#layout_center_tabs');
				var sHref/*默认为出错页面的链接*/ = 'pages/error/err.html'+ "?" + utils.createUUID();
				if(body.attributes){
					var sWebModel/*展示模式*/ = body.attributes.model;
					if(sWebModel){
						var sHref1 = body.attributes.uri + "?" + utils.createUUID();
						if(sHref1){
							if(sWebModel == staticParam.webModel_iframe){ // iframe
								var sContent = '<iframe src="'+sHref1+'" allowTransparency="true" style="border: 0; width: 100%; height: 99%;" frameBorder="0"></iframe>';  
								$centerTabs.tabs('add', {
									id : body.id,
									title : body.text,
									closable : true,
									iconCls : body.iconCls,
									content : sContent,
									tools : [ {
										iconCls : 'icon-mini-refresh',
										handler : function() {
											refreshTab(body.text);
										}
									} ]
								});
								return;
							} else if(sWebModel == staticParam.webModel_pureMVC){ // href
								sHref = sHref1;
							}
						}
						$('#layout_center_tabs').tabs('add', {
							id : body.id,
							title : body.text,
							closable : true,
							iconCls : body.iconCls,
							href : sHref,
							tools : [ {
								iconCls : 'icon-mini-refresh',
								handler : function() {
									refreshTab(body.text);
								}
							} ]
						});
					}
				}
			}
			break;
		case ejx4ui.AppConstants.OMMON_PASSWORD_UPDATE_RESPONSE:
			userPwdEditDialog.dialog('close');
			break;
		case ejx4ui.AppConstants.COMMON_NOTICE_DATA_RESPONSE:
			if(body.npFlag == "0"){
				$('#portal1_datagrid').datagrid('loadData',body.tnpLst);
			}
			if(body.npFlag == "1"){
				$('#portal2_datagrid').datagrid('loadData',body.tnpLst);
			}
			break;
			
		}
	}
}, {
	NAME : 'CommonMediator'
});

function viewDetail(data){
	portalDetailDialog = extJQ.dialog({
		title : '详细内容',
		href : 'pages/layout/portal/portalDetail.html',
		width : 500,
		height : 220,
		buttons : [ {
			text : '关闭',
			iconCls : 'icon-cancel',
			handler : function() {
				portalDetailDialog.dialog('close');
			}
		} ],
		onLoad : function() {
			$('#portalDetail_form').form('load', data);
		}
	});
};
