puremvc.define({
	name : 'ejx4ui.model.proxy.OrgInfoManageProxy',
	parent : puremvc.Proxy
}, {
	stats:{},
	LOCAL_STORAGE_NAME:'ejx4ui-orginfomanageproxy',
	list:[],//数据模型
	onRegister:function(){
		orgInfoManageProxyObj = this;
	},
	
	xx:function(data){
	}
	
}, {
	NAME : 'OrgInfoManageProxy'
});