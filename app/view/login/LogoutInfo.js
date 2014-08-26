Ext.define('rcm.view.login.LogoutInfo', {
	extend	: 'Ext.form.Panel',
	xtype	: 'authlogout',
	layout	: 'hbox',
	frame 	: true,
	id		: 'p_logout',	
	//store	: 'LoginAuth',
	
	items: [{
				xtype : 'text',
				text : 'welcome '
			
			},{
				xtype : 'button',
				text : 'Logout',
				id	: 'btn_logout',
				// action : 'logout',
				
								
			}],
			
	 initComponent : function(){
		
	
		this.callParent(arguments);
	} //*/
			
});