puremvc.define({
	name : 'ejx4ui.view.mediator.UserManageMediator',
	parent : puremvc.Mediator
}, {
	listNotificationInterests : function() {
		return [ 
			ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_RESPONSE, 	// 响应用户列表数据
			ejx4ui.AppConstants.USERMANAGE_USERINFO_DATA_RESPONSE, 		// 响应获取用户个人信息
			ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_RESPONSE, 	// 响应检测统一登入名称
			ejx4ui.AppConstants.USERMANAGE_USERINFO_ADD_RESPONSE, 		// 响应添加用户个人信息
			ejx4ui.AppConstants.USERMANAGE_USERINFO_DELETE_RESPONSE, 	// 响应删除用户信息
			ejx4ui.AppConstants.USERMANAGE_USERINFO_UPDATE_RESPONSE, 	// 响应更新用户信息
			ejx4ui.AppConstants.USERMANAGE_PASSWORD_UPDATE_RESPONSE 	// 响应更新用户密码信息
		];
	},
	onRegister : function() {
		userManageMediator = this;
		/* #### 页面载入完成后的初始化渲染  ####*/
		// 绘制DataGrid表格
		drawPlugin.userInfoListDatagrid('userManage_userInfoDatagrid', 'userManage_userInfoDatagrid_toolbar');
		// 绘制Pagination分页条
		$('#userManage_userInfoDatagrid_pagination').pagination({
			pageList : [ 10, 20, 30 ],
			onSelectPage : function(pageNumber, pageSize) {
				var searchCondition/*查询参数搜集*/ = _userManageGetsearchCond();
				var data/*分页请求数据封装*/ = {
					pageGrid : utils.createPageGrid(searchCondition, pageNumber, pageSize)
				};
				userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_REQUEST, data);
			},
			onChangePageSize : function(pageSize) {
				var searchCondition/*查询参数搜集*/ = _userManageGetsearchCond();
				var data/*分页请求数据封装*/ = {
					pageGrid : utils.createPageGrid(searchCondition, null, pageSize)
				};
				userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_REQUEST, data);
			}
		});
		
		_userManageSearchUserInfoList(); // 默认搜索

		/* #### 页面载入界面按钮事件的绑定  ####*/
		$('#userManage_toolbar_search').bind('click', function() { // 搜索按钮
			_userManageSearchUserInfoList();
		});

		$('#userManage_toolbar_cleanSearch').bind('click', function() { // 清空查询条件
			$('#userManage_userInfoDatagrid_toolbar input').val('');// 清空文本框
			extJQ.removeDatagridBody('userManage_userInfoDatagrid', 'userManage_userInfoDatagrid_pagination');
		});

		$("#userManage_toolbar_addUser").bind('click', function() {
			addUserDialog = extJQ.dialog({
				title : '新增用户信息',
				href : 'pages/demo/user/userEdit.html',
				width : 650,
				height : 200,
				buttons : [ {
					text : '保存',
					iconCls : 'icon-add',
					handler : function() {
						var isValid/*Form内验证元素的状态*/ = $("#userEdit_form").form('validate');
						if (!isValid) {
							$.messager.alert("提示", "校验未通过，请检查输入项！");
							return;
						}
						var userManage_checkFlag = $('#userEdit_checkUserName_span').attr("checkFlag");
						if (userManage_checkFlag != "true") {
							$.messager.alert("提示", "请先进行统一登入名合法验证！");
							return;
						}
						var addCondition/*序列化表单数据*/ = extUtil.serializeObject($('#userEdit_form').form());
//						addCondition.orgCode = $('#orgName').attr("orgCode");
						userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_ADD_REQUEST, addCondition);
					}
				}, {
					text : '关闭',
					iconCls : 'icon-cancel',
					handler : function() {
						$('#userEdit_checkUserName_span').attr("checkFlag",false);
						addUserDialog.dialog('close');
					}
				} ],
				onLoad : function() { // Dialog加载完成后的执行体
					$('#userEdit_checkUserName_span').attr("checkFlag",false);
					$('#userEdit_checkUserName_btn').bind('click', function() {
						var $userName = $("#userEdit_table tr td").find("input[name='userName']");
						var username = $userName.val();
						username = username.replace(/\s+/g, "")
						if (username) {
							$("#userEdit_checkUserName_btn").linkbutton("disable"); // 禁用按钮
							$('#userEdit_checkUserName_span').html("正在检测中……");
							userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_REQUEST, {userName : username});
						} else {
							$('#userEdit_checkUserName_span').html("请输入正确统一登入名！");
							$userName.val('');
						}
					});
					// TODO 绘制机构表格
//					$('#userEdit_chooseOrg_btn').bind('click', function() {
//					});
					// 用来检测文本域文字输入状态 ,当状态改变的时候执行的函数
					function handle() {
						$('#userEdit_checkUserName_span').attr("checkFlag",false);
						$('#userEdit_checkUserName_span').html("请校验统一登入名。");
					}
					var x = document.getElementById("userName"); // 用来检测文本域文字输入状态
					if (window.addEventListener) // 非ie浏览器，比如Firefox
					{
						x.addEventListener("input", handle, false);
					} else // ie浏览器
					{
						x.attachEvent("onkeyup", handle);
					}
				}
			});
		});

		$("#userManage_toolbar_updateUser").bind('click', function() {
			var row = $('#userManage_userInfoDatagrid').datagrid('getSelections');
			if (row.length < 1) {
				parent.extJQ.messagerAlert('提示', '请勾选要编辑的用户记录！', 'error');
				return;
			} else if (row.length > 1) {
				parent.extJQ.messagerAlert('提示', '不可同时编辑多条用户记录！', 'error');
				return;
			}
			$('#userEdit_checkUserName_span').attr("checkFlag",false);
			updateUserDialog = extJQ.dialog({
				title : '更新用户信息',
				href : 'pages/demo/user/userEdit.html',
				width : 650,
				height : 200,
				buttons : [ {
					text : '保存',
					iconCls : 'icon-add',
					handler : function() {
						var isValid/*Form内的校验状态*/ = $("#userEdit_form").form('validate');
						if (!isValid) {
							$.messager.alert("提示", "校验未通过，请检查输入项！");
							return;
						}
						userManage_checkFlag = $('#userEdit_checkUserName_span').attr("checkFlag");
						if (userManage_checkFlag != "true") {
							$.messager.alert("提示", "请先进行统一登入名合法验证！");
							return;
						}
						var updateCondition/*序列化表单数据*/ = extUtil.serializeObject($('#userEdit_form').form());
//						updateCondition.orgCode = $('#orgName').attr("orgCode");
						userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_UPDATE_REQUEST, updateCondition);
					}
				}, {
					text : '关闭',
					iconCls : 'icon-cancel',
					handler : function() {
						updateUserDialog.dialog('close');
					}
				} ],
				onLoad : function() { // 动态加载，数据填充
					$('#userEdit_checkUserName_span').attr("checkFlag",true);
					var $userName = $("#userEdit_table tr td").find("input[name='userName']");
					$('#userEdit_checkUserName_btn').bind('click', function() {
						var username = $userName.val();
						if ($.trim(username)) {
							$("#userEdit_checkUserName_btn").linkbutton("disable"); // 禁用按钮
							$('#userEdit_checkUserName_span').html("正在检测中……");
							userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_REQUEST, {userName : username});
						} else {
							$('#userEdit_checkUserName_span').html("请输入正确统一登入名！");
							$userName.val('');
						}
					});

					// TODO 机构选择
//					$('#userEdit_chooseOrg_btn').bind('click', function() {
//					});

					$('#userEdit_form').form('load', row[0]);
//					$('#orgName').attr("orgCode", row[0].orgCode);
					var orginalUserName/* 初始状态数据 */= row[0].userName;
					// 用来检测文本域文字输入状态 ,当状态改变的时候执行的函数
					function handle() {
						if (orginalUserName) {
							if ($userName.val() == orginalUserName) {
								$('#userEdit_checkUserName_span').attr("checkFlag",true);
								$('#userEdit_checkUserName_span').html("统一登入名未变更。");
								return;
							}
						}
						$('#userEdit_checkUserName_span').attr("checkFlag", false);
						$('#userEdit_checkUserName_span').html("请校验统一登入名。");
					}
					var x = document.getElementById("userName"); // 用来检测文本域文字输入状态
					if (window.addEventListener) // 非ie浏览器
					{
						x.addEventListener("input", handle, false);
					} else // ie浏览器
					{
						x.attachEvent("onkeyup", handle);
					}
					// TODO 考虑修改自身状态的情况

				}
			});
		});

		$("#userManage_toolbar_deleteUser").bind('click', function() {
			// TODO 需要考虑删除自身的情况
			var rows = $('#userManage_userInfoDatagrid').datagrid('getSelections');
			var userIds = [];
			if (rows.length > 0) {
				extJQ.messagerConfirm('请确认', '您要删除当前所选记录？', function(r) {
					if (r) {
						for (var i = 0; i < rows.length; i++) {
								userIds.push(rows[i].userId);// 保存到ids数组中
						}
						userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFO_DELETE_REQUEST, {
							userIds : userIds.join(',')
						});
					}
				});
			} else {
				extJQ.messagerAlert('提示', '请勾选要删除的记录！', 'error');
			}
		});


	},

	handleNotification : function(note) {
		var body = note.getBody();
		switch (note.getName()) {
		/**
		 * 加载用户列表信息
		 */
		case ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_RESPONSE:
			$('#userManage_userInfoDatagrid').datagrid('uncheckAll');
			$('#userManage_userInfoDatagrid').datagrid('loadData', body.rows); // 加载Datagrid数据
			$('#userManage_userInfoDatagrid_pagination').pagination('refresh', {
				total : body.total
			});
			break;
		/**
		 * 反馈统一登入名的检测结果
		 */
		case ejx4ui.AppConstants.USERMANAGE_USERNAME_CHECK_RESPONSE:
			$("#userEdit_checkUserName_btn").linkbutton("enable"); // 检验按钮
			$('#userEdit_checkUserName_span').attr("checkFlag",body.success);
			$('#userEdit_checkUserName_span').html(body.msg);
			break;
		/**
		 * 反馈添加用户数据
		 */
		case ejx4ui.AppConstants.USERMANAGE_USERINFO_ADD_RESPONSE:
			if (body.success) {
				extJQ.printMsg("添加用户成功！");
				$('#userManage_userInfoDatagrid').datagrid("insertRow", {
					index : 0,
					row : body.obj.user
				});
				addUserDialog.dialog('close');
			} else {
				extJQ.printMsg("添加用户失败！");
			}
			break;
		/**
		 * 响应删除用户信息
		 */
		case ejx4ui.AppConstants.USERMANAGE_USERINFO_DELETE_RESPONSE:
			if (body.success) {
				extJQ.printMsg("删除用户成功！");
				_userManageSearchUserInfoList();
			} else {
				extJQ.printMsg("删除用户失败！");
			}
			break;
		/**
		 * 响应更新用户信息
		 */
		case ejx4ui.AppConstants.USERMANAGE_USERINFO_UPDATE_RESPONSE:
			if (body.success) {
				extJQ.printMsg("更新用户信息成功！");
				updateUserDialog.dialog('close');
				var rows = $('#userManage_userInfoDatagrid').datagrid('getSelections');
				if (rows.length = 1) {
					var index = $('#userManage_userInfoDatagrid').datagrid('getRowIndex', rows[0]);
					$('#userManage_userInfoDatagrid').datagrid('updateRow', {
						index : index,
						row : body.obj.user
					});
				} else {
					_userManageSearchUserInfoList();
				}
			} else {
				extJQ.printMsg("更新用户信息失败！");
			}
			break;
		}
	}
}, {
	NAME : 'UserManageMediator'
});

// 搜索用户列表数据
function _userManageSearchUserInfoList() {
	var userManage_searchParam = _userManageGetsearchCond();
	$('#userManage_userInfoDatagrid').datagrid('uncheckAll');
	var pageNumber = $('#userManage_userInfoDatagrid_pagination').pagination('options').pageNumber;
	var pageSize = $('#userManage_userInfoDatagrid_pagination').pagination('options').pageSize;
	var data = {
		pageGrid : utils.createPageGrid(userManage_searchParam, pageNumber, pageSize)
	};
	userManageMediator.sendNotification(ejx4ui.AppConstants.USERMANAGE_USERINFOLIST_DATA_REQUEST, data);
}

// 获取搜素条件
function _userManageGetsearchCond() {
	var searchCondition = extUtil.serializeObject($('#userManage_userInfoDatagrid_toolbar_searchForm'));
	// 循环searchCondition，若内key值为“”则置为null
	for ( var key in searchCondition) {
		if (searchCondition[key] == "") {
			searchCondition[key] = null;
		}
	}
	var searchByDim/* 模糊查询标志 */= $("#userManage_search_by_dim").prop("checked");
	if (searchByDim) {
		searchCondition.userName = null;
		searchCondition.userNameLike = $('#userManage_toolbar_userName').val();
	}
	return searchCondition;
}