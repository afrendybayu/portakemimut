Ext.define('rcm.view.login.LogoutInfo', {
	extend: 'Ext.form.Panel',
	xtype: 'authlogout',
	layout: 'hbox',
	frame : true,
	id	: 'p_logout',	
	
	items: [{
				margin: '5 10 0 10',
				xtype : 'text',
				text : 'welcome administrator'
/*			
			},{
				xtype : 'textfield',
				inputType: 'password',
				name: 'password',
				itemid : 'passid',
				//fieldLabel: 'Username'
				allowBlank: false,
				emptyText : 'Password'
//*/
			},{
				xtype : 'button',
				text : 'Logout',
				id	: 'btn_logout',
				// action : 'logout',
				
								
			}]
	/*		
	initComponent : function(){
		this.buttons = [{
			name : 'login_btn',
			text : 'Login',
			action : 'login',
			id : 'btn_login'
		
		},{
			name : 'logout_btn',
			text : 'LogOut',
			action : 'logout',
			id : 'btn_logout',
			hidden : true
		}];
	
		this.callParent(arguments);
	} //*/
			
});
