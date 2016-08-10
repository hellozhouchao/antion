puremvc.define({
	name : 'ejx4ui.view.mediator.OrgInfoManageMediator',
	parent : puremvc.Mediator
}, {
	listNotificationInterests : function() {
		return [ 
			ejx4ui.AppConstants.xx  	// xx
		];
	},
	onRegister : function() {
		orgInfoManageMediator = this;
		
		$('#xx').bind('click', function() { 
		});
		
	},

	handleNotification : function(note) {
		var body = note.getBody();
		switch (note.getName()) {
		
			case ejx4ui.AppConstants.xx:
				break;

		}
	}
}, {
	NAME : 'OrgInfoManageMediator'
});

function _xx() {
}
