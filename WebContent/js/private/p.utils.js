/**
 * 项目内所有的JS小方法。<br>
 *
 * @author DJQ
 * @updateData 2015年1月15日 00:32:09
 */
var utils = $.extend({}, utils);

//	去除所有空格:  
//    str   =   str.replace(/\s+/g,"");      
//    去除两头空格:  
//    str   =   str.replace(/^\s+|\s+$/g,""); 

/**
 * 自定义Ajax 的 Post方法<br>
 * 参数：<br>
 * sUrl：地址（以‘/’打头，不需要带项目名称）<br>
 * sSid：服务ID<br>
 * oJsonData:请求数据<br>
 * fSuccess:回调函数（操作成功）<br>
 * fFail：回调函数（操作失败）<br>
 */
utils.ajaxPost = function (sUrl, sSid, oJsonData, fSuccess, fFail) {
    var sJsonData = extUtil.json2Str(oJsonData);
    $.post(extUtil.getProjectName() + sUrl + "?" + utils.createUUID(), {
        _sid: sSid,
        json: sJsonData,
    }, function (data) {
        var oRes = extUtil.str2Json(data);
        if (oRes.success) {
            fSuccess(oRes.obj);
        } else {
            // TODO 失败的动作
            if (fFail) {
                fFail(oRes);
            }
        }
        extJQ.printMsg(oRes.msg);
    });
}

utils.getCheckboxValStr = function (domId, sVal) {
	var $domCheckbox =  $("#" + domId + " input[type=checkbox]")
	var sRes = '';
	if(sVal){
		var nLen = $domCheckbox.length;
		for (var int = 0; int < nLen; int++) {
			var sIsChecked = false;
			if(sVal.charAt(int) == staticParam.flag_true){
				sIsChecked = true;
			}
			$domCheckbox[int].checked = sIsChecked;
		}
	} else {
		$domCheckbox.each(function() {
			if (this.checked) {
				sRes += staticParam.flag_true;
			} else {
				sRes += staticParam.flag_false;
			}
		});
		return sRes;
	}
}

utils.userRoleSubDatagridDeleteRow = function(dataGridIdP, dataGridIdS, rowData) {
	var x = $('#' + dataGridIdP).datagrid('getRows');
	var sIndex = [];
	for (var i in rowData) {
		// 如果目标有包含要删除的数据，则进行取消选择动作
		if (x.length > 0) {
			for (var j in x) {
				if (rowData[i].roleCode == x[j].roleCode) {
					var index = $('#' + dataGridIdP).datagrid('getRowIndex', x[j]);
					if (index > -1) {
						sIndex.push(index);
					}
				}
			}
//			var index = $('#' + dataGridIdS).datagrid('getRowIndex', rowData[i]);
//			if (index > -1) {
//				$('#' + dataGridIdS).datagrid('deleteRow', index);
//			}
		} else {
			var index = $('#' + dataGridIdS).datagrid('getRowIndex', rowData[i]);
			$('#' + dataGridIdS).datagrid('deleteRow', index);
		}
	}
	for(var h in sIndex){
		$('#' + dataGridIdP).datagrid('unselectRow', sIndex[h]);
	}
};

/**
 * orderManage | taskManage
 * DataGrid加载数据，并且实现排序功能和分页功能
 * @param respData 响应数据，用于回填Datagrid
 * @param datagridId
 * @param paginationId
 * @param searchCon 搜索条件：数据请求和分页请求
 * @param mediatorObj Mediator对象
 * @param notice 通知变量
 */
utils.loadSortPaginationDataGrid = function (respData, datagridId, paginationId, searchCon, mediatorObj, notice) {
    $('#' + datagridId).datagrid('unselectAll');
    $('#' + datagridId).datagrid('uncheckAll');
    $('#' + datagridId).datagrid('loadData', respData.rows);
    $('#' + datagridId).datagrid({
        onSortColumn: function (sort, order) {
            var paginationParam = $('#' + paginationId).pagination("options");
            var pageSize = paginationParam.pageSize;
            var searchCondition = searchCon;
            //点击排序重新刷新到第一页
            $('#' + paginationId).pagination('refresh', {
                pageNumber: 1
            });
            var data = {
                pageGrid: utils.createPageGrid(searchCondition, null, pageSize)
            };
            mediatorObj.sendNotification(notice, data);
        }
    });
    $('#' + paginationId).pagination({
        pageList: [10, 20, 30],
        onSelectPage: function (pageNumber, pageSize) {
            $(this).pagination('loading');
            var searchCondition = searchCon;
            var data = {
                pageGrid: utils.createPageGrid(searchCondition, pageNumber, pageSize)
            };
            // 发送分页请求
            mediatorObj.sendNotification(notice, data);
            $(this).pagination('loaded');
        },
        onChangePageSize: function (pageSize) {
            var searchCondition = searchCon;
            var data = {
                pageGrid: utils.createPageGrid(searchCondition, null, pageSize)
            };
            // 发送分页请求
            mediatorObj.sendNotification(notice, data);
        }
    }).pagination('refresh', {
        total: respData.total
    });
};

/**
 * 新增记录后，为解决Index错乱问题，进行重新DataGrid的Reload操作。
 */
utils.reloadDataGrid = function (dataGridId, paginationId) {
    var pageSize/* 分页条内规定的页记录数 */ = $('#' + paginationId).pagination("options").pageSize;
    var rows/* 实际页记录数 */ = $('#' + dataGridId).datagrid('getRows');
    if (rows.length > pageSize) {
        $('#' + dataGridId).datagrid('deleteRow', rows.length - 1);
    }
    var newRows = $('#' + dataGridId).datagrid('getRows');
    $('#' + dataGridId).datagrid('loadData', newRows);
};

/**
 * 分页请求数据的封装
 */
utils.createPageGrid = function (searchCondition, page, rows) {
    var defaultPage = '1';
    var defaultRows = '10';
    if (page == null)
        page = defaultPage;
    if (rows == null)
        rows = defaultRows;
    if (searchCondition == null)
        searchCondition = {};
    var pageGrid/* 分页数据 */ = {
        page: page, // 页码
        rows: rows, // 每页记录数
        searchCondition: searchCondition // 条件
    };
    return pageGrid;
};

/**
 * 清空Grid数据，进行初始化。
 */
utils.clearGrid = function (dataGrid, pagination) {
    $('#' + dataGrid).datagrid('loadData', {total: 0, rows: []});
    $('#' + pagination).pagination('refresh', {
        total: 0,
        pageNumber: 0
    });
};

/**
 * 循环生成按钮HTML
 */
utils.createButtonS = function(btnsId, btnDef, o ) {
	var aBtns = [];
	for ( var i in o) {
		var sBtn = utils.createButtonA(o[i].resourceCode, o[i].resourceName,o[i].displayName, null);
		aBtns.push(sBtn);
	}
	return utils.createButtonDiv(btnsId, aBtns.concat(btnDef));
}

/**
 * 生成按钮的HTML数据。
 * @param 
 * 	id: 按钮ID
 * 	icon：按钮图标
 * 	title：按钮文字
 * 	display：是否隐藏
 */
utils.createButtonA = function(id, icon, title, display) {
	if (display) {
		display = 'none';
	} else {
		display = 'null';
	}
	var res = "";
	res += '<a id="'
			+ id
			+ '" style="display: '
			+ display
			+ ';" href="javascript:void(0)" class="easyui-linkbutton"  data-options="iconCls:\' '
			+ icon + '\'">' + title + '</a>';
	return res;
};

/**
 * 生成包含按钮的DIV页面数据。
 */
utils.createButtonDiv = function(id, htmlArray, px) {
	var sPx = 0;
	if (px) {
		sPx = px;
	}
	var html = '<div id="' + id
			+ '" class="dialog-button" style = "padding-right:' + sPx + 'px" >';
	for ( var key in htmlArray) {
		html += htmlArray[key];
	}
	html += '</div>';
	return html;
};

utils.random4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};
utils.createUUID = function () {
    return (utils.random4() + utils.random4() + "-" + utils.random4() + "-" + utils.random4() + "-" + utils.random4() + utils.random4());
};