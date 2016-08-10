/**
 * Draw EasyUI Plugins<br>
 * 项目内所有需要显示的EasyUI组件，如：Grid数据表格，都在这里实现绘制。<br>
 *
 * @author DJQ
 * @updateData 2015年3月1日
 */
var drawPlugin = $.extend({}, drawPlugin);

// 私有
function cellStyler(value, row, index) {
    if (value == '02') {
        return 'color:red;font-weight:bold;';
    }
    if (value == '03') {
        return 'color:blue;font-weight:bold;';
    }
}

function rowStyler(index, row) {
    if (row.sex == "03") {
        return 'background-color:#FFDFCE;';
    }
}

/**
 * 绘制公告列表Datagrid
 */
drawPlugin.announcementDatagrid = function (options, tool_bar) {
    var announcement_datagrid;
    announcement_datagrid = $('#' + options).datagrid({
        idField: 'npNo', 
        view: extEU.defaultView,
        striped: true,
        checkOnSelect: true,
        selectOnCheck: true,
        rownumbers: true,
        fitColumns:true,
        columns: [[
			{
			    width: '100',
			    title: '公告编号',
			    field: 'npNo'
			},
			{
			    width: '80',
			    title: '公告日期',
			    field: 'npDate',
			    sortable: true
			},
			{
			    width: '100',
			    title: '录入人员',
			    field: 'enterUser',
			    sortable: true
			},
			{
                width: '150',
                title: '公告内容',
                field: 'npContent'
            },{
    			title : '',
    			field : 'info',
    			width : 10,
    			formatter:function(value,rowObj){
    				return "<a href='javascript:void(0);' onclick='viewDetail("+extUtil.json2Str(rowObj)+");'>查看</a>";
    			}
    		}
            ]
        ],
        toolbar: '#' + tool_bar,
        onLoadSuccess: function () {
        	$('#' + options).datagrid('uncheckAll');
        },
        onSelect : function(rowIndex, rowData){
        	$('#' + options).datagrid("unselectRow",rowIndex);
        }
    });
    return announcement_datagrid;
};

/**
 * 绘制通知列表Datagrid
 */
drawPlugin.noticeDatagrid = function (options, tool_bar) {
    var notice_datagrid;
    notice_datagrid = $('#' + options).datagrid({
        idField: 'npNo',
        view: extEU.defaultView,
        striped: true,
        checkOnSelect: true,
        selectOnCheck: true,
        rownumbers: true,
        fitColumns:true,
        columns: [[
			{
			    width: '100',
			    title: '通知编号',
			    field: 'npNo'
			},
			{
			    width: '80',
			    title: '通知日期',
			    field: 'npDate',
			    sortable: true
			},
			{
			    width: '100',
			    title: '录入人员',
			    field: 'enterUser',
			    sortable: true
			},
			{
                width: '150',
                title: '通知内容',
                field: 'npContent'
            },{
    			title : '',
    			field : 'info',
    			width : 10,
    			formatter:function(value,rowObj){
    				return "<a href='javascript:void(0);' onclick='viewDetail("+extUtil.json2Str(rowObj)+");'>查看</a>";
    			}
    		}
            ]
        ],
        toolbar: '#' + tool_bar,
        onLoadSuccess: function () {
        	$('#' + options).datagrid('uncheckAll');
        },
        onSelect : function(rowIndex, rowData){
        	$('#' + options).datagrid("unselectRow",rowIndex);
        }
    });
    return notice_datagrid;
};

/**
 * 绘制用户管理的用户列表Datagrid
 */
drawPlugin.userInfoListDatagrid = function (options, tool_bar) {
    var userInfo_list_datagrid;
    userInfo_list_datagrid = $('#' + options).datagrid({
        striped: true,
        fit: true,
        idField: 'userId',
        view: extEU.defaultView,
        frozenColumns: [
            [
                {
                	field : 'ck',
                	checkbox : true
                }, 
                {
                    width: '100',
                    title: '用户编号',
                    field: 'userId'
                },
                {
                    width: '100',
                    title: '登录名',
                    field: 'loginName'
                },
                {
                    width: '80',
                    title: '用户姓名',
                    field: 'userName'
                }
            ]
        ],
        columns: [
            [
                {
                    width: '100',
                    title: '机构编号',
                    field: 'orgNo'
                },
                {
                    width: '100',
                    title: '机构名',
                    field: 'orgName'
                },{
                    width: '100',
                    title: '联系电话',
                    field: 'phone'
                },
                {
                    width: '100',
                    title: '电子信箱',
                    field: 'email'
                },
                {
                    width: '100',
                    title: '启用日期',
                    field: 'enableDate',
                    sortable: true
                },
                {
                    width: '100',
                    title: '失效日期',
                    field: 'invalidDate',
                    sortable: true
                },
                {
                    width: '100',
                    title: '添加日期',
                    field: 'addDate',
                    sortable: true
                },
                {
                    width: '80',
                    title: '启用标识',
                    field: 'enable',
                    sortable: true,
                    formatter: function (value, row) {
                        var resStr = "异常状态";
                        switch (value) {
                            case "0":
                                resStr = "停用";
                                break;
                            case "1":
                                resStr = "启用";
                                break;
                        }
                        return resStr;
                    }
                }
            ]
        ],
        toolbar: '#' + tool_bar,
        onBeforeLoad: function (param) {
            parent.$.messager.progress({
                text: '数据加载中....'
            });
        },
        onLoadSuccess: function (data) {
            parent.$.messager.progress('close');
        }
    });
    return userInfo_list_datagrid;
};

/**
 * 绘制用户管理-密码管理-用户列表Datagrid
 */
drawPlugin.userInfoListSubDatagrid = function (options, tool_bar) {
    var userInfo_list_sub_datagrid;
    userInfo_list_sub_datagrid = $('#' + options).datagrid({
        idField: 'userId', // 主键名称（记得写，不然选择行时，会有取不到的情况。且可以跨页选择。）
        view: extEU.defaultView,
        striped: true,
        fit: true, // 窗体自适应
        checkOnSelect: true,
        selectOnCheck: true,
        columns: [[
			{
			    width: '100',
			    title: '用户编号',
			    field: 'userId'
			},
			{
			    width: '100',
			    title: '登录名',
			    field: 'loginName',
			    sortable: true
			},
			{
			    width: '80',
			    title: '用户姓名',
			    field: 'userName',
			    sortable: true
			},
			{
                width: '100',
                title: '联系电话',
                field: 'phone'
            },
            {
                width: '100',
                title: '电子信箱',
                field: 'email'
            }
            ]
        ],
        toolbar: '#' + tool_bar,
        onLoadSuccess: function () {
        	$('#' + options).datagrid('uncheckAll');
        },
        onSelect : function(rowIndex, rowData){
        	$('#' + options).datagrid("unselectRow",rowIndex);
        }
    });
    return userInfo_list_sub_datagrid;
};

/**
 * 绘制用户管理的机构列表Datagrid
 */
drawPlugin.userOrgListDatagrid = function (options, tool_bar) {
    var userInfo_org_list_datagrid;
    userInfo_org_list_datagrid = $('#' + options).datagrid({
        striped: true,
        fit: true,
        idField: 'orgNo',
        checkOnSelect: true,
        selectOnCheck: true,
        singleSelect: true,
        view: extEU.defaultView,
        columns: [
            [
                {
                    width: '100',
                    title: '机构编号',
                    field: 'orgNo'
                },
                {
                    width: '100',
                    title: '机构名',
                    field: 'orgName',
                    sortable: true
                },
                {
                    width: '80',
                    title: '机构类型',
                    field: 'orgType',
                    sortable: true,
                    formatter: function (value, row) {
                        var resStr = "异常状态";
                        switch (value) {
                            case "01":
                                resStr = "银联";
                                break;
                            case "02":
                                resStr = "商户";
                                break;
                            case "03":
                                resStr = "银行";
                                break;
                        }
                        return resStr;
                    }
                }
            ]
        ],
        toolbar: '#' + tool_bar
    });
    return userInfo_org_list_datagrid;
};

/**
 * 绘制机构管理的机构列表Datagrid
 */
drawPlugin.orgInfoListDatagrid = function (options, tool_bar) {
    var orgInfo_list_datagrid;
    orgInfo_list_datagrid = $('#' + options).datagrid({
        striped: true,
        fit: true,
        idField: 'orgNo',
        checkOnSelect: true,
        selectOnCheck: true,
//        rownumbers: true,
        view: extEU.defaultView,
        columns: [
            [
				{
					field : 'ck',
					checkbox : true
				},
                {
                    width: '100',
                    title: '机构编号',
                    field: 'orgNo'
                },
                {
                    width: '100',
                    title: '机构名',
                    field: 'orgName',
                    sortable: true
                },
                {
                    width: '80',
                    title: '机构类型',
                    field: 'orgType',
                    sortable: true,
                    formatter: function (value, row) {
                        var resStr = "异常状态";
                        switch (value) {
                            case "01":
                                resStr = "银联";
                                break;
                            case "02":
                                resStr = "商户";
                                break;
                            case "03":
                                resStr = "银行";
                                break;
                        }
                        return resStr;
                    }
                },
                {
                    width: '100',
                    title: '机构状态',
                    field: 'orgState',
                    sortable: true,
                    formatter: function (value, row) {
                        var resStr = "异常状态";
                        switch (value) {
                            case "0":
                                resStr = "停用";
                                break;
                            case "1":
                                resStr = "启用";
                                break;
                        }
                        return resStr;
                    }
                },
                {
                    width: '80',
                    title: '复核状态',
                    field: 'verifyState',
                    sortable: true,
                    formatter: function (value, row) {
                        var resStr = "异常状态";
                        switch (value) {
                            case "0":
                                resStr = "待审核";
                                break;
                            case "1":
                                resStr = "审核通过";
                                break;
                            case "2":
                                resStr = "审核未通过";
                                break;
                        }
                        return resStr;
                    }
                }
            ]
        ],
        toolbar: '#' + tool_bar,
        onBeforeLoad: function (param) {
            parent.$.messager.progress({
                text: '数据加载中....'
            });
        },
        onLoadSuccess: function (data) {
            parent.$.messager.progress('close');
        }
    });
    return orgInfo_list_datagrid;
};

/**
 * 角色和服务资源的绑定
 */
drawPlugin.roleServiceResBindDatagrid = function (options, tool_bar) {
    var role_serviceResBind_Datagrid;
    role_serviceResBind_Datagrid = $('#' + options).datagrid({
        striped: true,
        fit: true,
        idField: 'id',
        checkOnSelect: true,
        selectOnCheck: true,
        view: extEU.defaultView,
        columns : [ [
				{
					field : 'id',
					checkbox : true
				},
				{
					field : 'actionId',
					title : '服务请求ID',
					width : 150
				},
				{
					field : 'serviceIds',
					title : '服务ID',
					width : 150
				},
				{
					field : 'description',
					title : '服务请求描述',
					width : 400
				} ] ],
		onLoadSuccess : function(data) {
			for ( var i in data.rows) {
				if (data.rows[i].checked === true){
					$('#' + options).datagrid('checkRow', i);
				}
			}
		},
        toolbar: '#' + tool_bar
    });
    return role_serviceResBind_Datagrid;
};

/**
 * 角色和页面资源的绑定
 */
drawPlugin.rolePageResBindDatagrid = function (options, tool_bar) {
    var role_pageResBind_Datagrid;
    role_pageResBind_Datagrid = $('#' + options).datagrid({
        striped: true,
        fit: true,
        idField: 'id',
        checkOnSelect: true,
        selectOnCheck: true,
        view: extEU.defaultView,
		columns : [ [
			{
				field : 'id',
				checkbox : true
			},
			{
				field : 'displayName',
				title : '显示名称',
				width : 150
			},
			{
				field : 'functionUrl',
				title : '功能URL',
				width : 280
			}] ],
		onLoadSuccess : function(data) {
			for ( var i in data.rows) {
				if (data.rows[i].checked === true){
					$('#' + options).datagrid('checkRow', i);
				}
			}
		},
        toolbar: '#' + tool_bar
    });
    return role_pageResBind_Datagrid;
};
