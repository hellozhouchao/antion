puremvc.define({
    name: 'ejx4ui.controller.command.OrgInfoManageCommand',
    parent: puremvc.SimpleCommand
}, {
    execute: function (note) {
    	var orgInfoManageProxy = this.facade.retrieveProxy(ejx4ui.model.proxy.OrgInfoManageProxy.NAME);
    	var body = note.getBody();
    	switch (note.getName()) {
    	
    		case ejx4ui.AppConstants.xx:   
    			orgInfoManageProxy.xx(body);
    			break;
    			
    	}
    }
});
