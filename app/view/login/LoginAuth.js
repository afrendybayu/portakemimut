Ext.define('rcm.view.login.LoginAuth', {
	extend: 'Ext.form.Panel',
	xtype: 'authlogin',
	layout: 'hbox',
	frame : true,
	id	: 'p_login',	
	items: [{
				xtype : 'textfield',
				//id : 'userid',
				name: 'username',
				itemid : 'userid',
				//fieldLabel: 'Username'
				allowBlank: false,
				emptyText : 'Username'
			
			},{
				xtype : 'textfield',
				inputType: 'password',
				name: 'password',
				itemid : 'passid',
				//fieldLabel: 'Username'
				allowBlank: false,
				emptyText : 'Password'
			},{
				xtype : 'button',
				text : 'Login',
				id	: 'btn_login',
				action : 'login',
				
								
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