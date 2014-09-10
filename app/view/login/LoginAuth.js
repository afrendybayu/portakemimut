Ext.define('rcm.view.login.LoginAuth', {
	extend: 'Ext.form.Panel',
	xtype: 'authlogin',
	layout: 'hbox',
	//frame : true,
	margin: '5 5 5 5',
	id	: 'p_login',
	level: 10,
	
	items: [{
				xtype : 'textfield',
				name: 'username',
				itemid : 'userid',
				width: 70,
				allowBlank: false,
				emptyText : 'Username'
			},{
				xtype : 'tbspacer'
			},{
				xtype : 'textfield',
				inputType: 'password',
				name: 'password',
				itemid : 'passid',
				width: 70,
				allowBlank: false,
				emptyText : 'Password'
			},{xtype : 'tbspacer'},{
				xtype : 'button',
				text : 'Login',
				id	: 'btn_login',
				action : 'login'
			}]
			
	/*initComponent : function(){
		
		
		
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
