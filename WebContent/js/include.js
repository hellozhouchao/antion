/**
 * 集中加载项目内所有的JS和CSS文件。<br>
 * （浏览器信息的采集）<br>
 * @updateData 2015年1月14日
 */
var browser/*浏览器信息采集*/ = {
    appCodeName: navigator.appCodeName,// 浏览器代码名称
    appName: navigator.appName,// 浏览器的名称
    appVersion: navigator.appVersion,// 浏览器的平台和版本信息
    cookieEnabled: navigator.cookieEnabled,// 浏览器中是否启用cookie的布尔值
    platform: navigator.platform,// 运行浏览器的操作系统平台
    userAgent: navigator.userAgent, // 由客户机发送服务器的 user-agent 头部的值
    isIe: false,
    ieVersion: '',
    isChrome: false,
    isFirefox: false
};
if (browser.userAgent.indexOf('MSIE') > -1) {
	// IE浏览器
	browser.isIe = true;
	if (browser.userAgent.indexOf('MSIE 10') > -1) {
		// IE10
		browser.ieVersion = 10;
	} else if (browser.userAgent.indexOf('MSIE 9') > -1) {
		// IE9
		browser.ieVersion = 9;
	} else if (browser.userAgent.indexOf('MSIE 8') > -1) {
		// IE8
		browser.ieVersion = 8;
	} else if (browser.userAgent.indexOf('MSIE 7') > -1) {
		// IE7
		browser.ieVersion = 7;
	} else if (browser.userAgent.indexOf('MSIE 6') > -1) {
		// IE6
		browser.ieVersion = 6;
	} else {

	}
} else if (browser.userAgent.indexOf('Chrome') > -1) {
	// 谷歌浏览器
	browser.isChrome = true;
} else if (browser.userAgent.indexOf('Firefox') > -1) {
	// 火狐浏览器
	browser.isFirefox = true;
} else {
	// 其他浏览器
}

// EasyUI CSS 样式
importFile("../js/themes/gray/easyui.css");
importFile("../js/themes/icon.css");

// JQuery EasyUI / PureMVC 
importFile("../js/jquery-1.9.1.js");
importFile("../js/jquery.easyui-1.3.5.min.js");
importFile("../js/locale/easyui-lang-zh_CN.js"); //国际化
importFile("../js/puremvc-1.0.1.min.js");

importFile("../js/support/jquery.cookie.js");
importFile("../js/support/jquery.validatebox.fixed.js");

// Bootstrap *CSS样式会与EasyUI的css造成干扰
//importFile("bootstrap/css/bootstrap.min.css");
//if(browser.isIe && browser.ieVersion < 9){
//	importFile("bootstrap/html5shiv.min.js");
//	importFile("bootstrap/respond.min.js");
//}
//importFile("bootstrap/../js/bootstrap.min.js");

// JavaScript 插件/脚本
importFile("../js/ext/tienon.ext.base.js");
importFile("../js/ext/tienon.ext.jquery.js");
importFile("../js/ext/tienon.ext.util.js");
importFile("../js/ext/tienon.ext.easyui.js");
importFile("../css/tienon.extCss.css");

// 插件库 
importFile("../js/plugins/jquery-easyui-portal/portal.css");
importFile("../js/plugins/jquery-easyui-portal/jquery.portal.js");
importFile("../js/plugins/My97DatePicker/WdatePicker.js");
importFile("../js/plugins/qtip/jquery.qtip.css");
importFile("../js/plugins/qtip/jquery.qtip.js");

// 私有Js脚本 （绘制EasyUI组件工具类；项目特有工具类）
importFile("../js/private/p.drawPlugins.js");
importFile("../js/private/p.utils.js");

function importFile(argument) // 函数可以单独引入一个js或者css
{
	var file = argument;
	if (file.match(/.*\.js$/)) // 以任意开头但是以.js结尾正则表达式
	{
		document.write('<script type="text/javascript" src="' + file + '"></script>');
	} 
	else if (file.match(/.*\.css$/)) {
		if(file.indexOf("easyui.css") > -1 ){ // 若为EasyUI 的样式CSS 则添加ID
			document.write('<link id="easyuiTheme" rel="stylesheet" href="' + file + '" type="text/css" />');
		} else {
			document.write('<link rel="stylesheet" href="' + file + '" type="text/css" />');
		}
	}
}


