Ext.define('rcm.view.login.LogoutInfo', {
	extend	: 'Ext.form.Panel',
	xtype	: 'authlogout',
	layout	: 'hbox',
	frame 	: true,
	id		: 'p_logout',	
	//store	: 'LoginAuth',
	
	items: [{
				margin: '5 10 0 10',
				xtype : 'text',
				id	: 't_welcome'
			
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
