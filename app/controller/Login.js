Ext.define('rcm.controller.Login', {
    extend: 'Ext.app.Controller', 
	
	requires : [
		'rcm.view.login.LoginAuth',
		//'rcm.view.login.CobaUser'
	],
	
	views: [
		'nav.AppHeader'
    ],

    stores: [
		'LoginAuth',
		'CobaUser'
    ],
    
    models: [
		'LoginAuth',
		'CobaUser'
    ],
	
	init: function(){
		this.control({
			/*'authlogin button[action=login]' : {
				click : this.tblLogin
			}*/
			
			'#btn_login' : {
				click : this.tblLogin
			},
			'#btn_logout' : {
				click : this.tblLogout
			}
		
		});
	
	
	}, 
	
	tblLogin : function(btn){
		console.log('klik login tombol');
		
		var frm 	= btn.up('form').getForm(),
			userget = frm.getValues().username,
			passget	= frm.getValues().password;
		var datalogin = this.getCobaUserStore();
		
		var data = new rcm.model.LoginAuth({ 
				userid 	: userget,
				pass	: passget
        });
					
		// data.save().
		
		//console.log(datalogin.load());
		// rcmSettings.aaaaa = data;

		if (frm.isValid()) {
			// console.log(data),
			data.save({
				success: function(respon, operation) {
					var res = operation.request.scope.reader.jsonData["isAutenticated"];
					alert('user : '+res.session+' & level : '+res.level);
				
				// datalogin.reload();
				
				// me.getRunningHourStore().reload();
				}
				
			});
			
			//console.log(data);
			

			/*
			frm.submit({
				
				url : 'ci/index.php/AuthLogin/isLoggin',
				params: { username : userget , password : passget},
				success : function(resp){
					console.log ('username submit : '+userget+' & password : '+passget );
					var pesan = Ext.decode(resp.responseText);
					if (pesan.success){						
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
						
						// rcmSettings.aaaaa = pesan;	
				}
			});
				
				// getLoginAuthStore().load();
				
				
				/*
			
				Ext.Ajax.request({
					// url : '/daunbiru/portakemimut/ci/index.php/AuthLogin/isLoggin',
					url : 'ci/index.php/AuthLogin/isLoggin',
					params: { username : userget , password : passget},
					success : function(resp){
						var pesan = Ext.decode(resp.responseText);
						if (pesan.success){						
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
						
						*/// rcmSettings.aaaaa = pesan;	
		/*}
			
					
	/*});//*/
				//btn.getForm().reset();
				
				// btn.up('form').getForm().reset();
				frm.reset();
				
        } 
		else {
                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
		}
	

		
	},
	
	tblLogout : function(b_logout){
		console.log('klik tombol logout');
		Ext.MessageBox.show({
			title : 'Logout Info',
			msg   : 'Apakah Anda ingin Logout ?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon  : Ext.MessageBox.WARNING,
			fn	: function (blout){
				if (blout === 'ok'){ 
					Ext.getCmp('p_login').setVisible(true);
					Ext.getCmp('p_logout').setVisible(false);
				}
				else {
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
				}
			}
		});
	}
	
	
	
	});