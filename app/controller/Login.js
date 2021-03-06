Ext.define('rcm.controller.Login', {
    extend: 'Ext.app.Controller', 
	
	requires : [
		'rcm.view.login.LoginAuth'
	],
	
	views: [
		'nav.AppHeader'
    ],

    stores: [
		'LoginAuth'
    ],
    
    models: [
		'LoginAuth'
    ],
	
	init: function(){
		this.control({
			/*'authlogin button[action=login]' : {
				click : this.tblLogin
			}*/
			
			'#btn_login' : {
				click : this.tblLogin
			}
		
		});
	
	
	}, 
	
	tblLogin : function(btn){
		console.log('klik login tombol');
		
		var frm 	= btn.up('form').getForm(),
			userget = frm.getValues().username,
			passget	= frm.getValues().password;
		
		if (frm.isValid()) {
				console.log ('username : '+userget+' & password : '+passget );
				Ext.Ajax.request({
					url : 'ci/index.php/AuthLogin/isLoggin',
					params: { username : userget , password : passget},
					success : function(resp){
						var pesan = Ext.decode(resp.responseText);
												
						if(pesan.status === 'success') {
							Ext.MessageBox.show({
								title : 'Login Info',
								msg   : 'User is Authenticated.',
								buttons: Ext.MessageBox.OK,
								icon  : Ext.MessageBox.INFO
							});
							//Ext.getCmp('btn_login').setVisible(false);
							//Ext.getCmp('btn_logout').setVisible(true);
							Ext.getCmp('p_login').setVisible(false);
							Ext.getCmp('p_logout').setVisible(true);
						}
						else {
							Ext.MessageBox.show({
							  title : 'Login Info',
							  msg   : 'Username or Password no valid',
							  buttons: Ext.MessageBox.OK,
							  icon  : Ext.MessageBox.WARNING
							});
						
						}
						
						rcmSettings.aaaaa = pesan;	
					}
					
				});//*/
				//btn.getForm().reset();
				
				// btn.up('form').getForm().reset();
				frm.reset();
				
        } 
		else {
                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
		}
	

		
	},
	
	
	
});
