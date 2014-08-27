Ext.define('rcm.controller.Login', {
    extend: 'Ext.app.Controller', 
	
	requires : [
		'rcm.view.login.LoginAuth'
			
	],
	
	views: [
		'nav.AppHeader'
		,'dataentry.FormGagal'	
    ],

    stores: [
		'LoginAuth'
		,'UnsetSesi'
	],
    
    models: [
		'LoginAuth'
		,'UnsetSesi'
	],
	
	refs : [{
		ref: 'excelgrid',
		selector: 'cellEditingPlugin',
		xtype: 'excelgrid',
		}],
	
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
		// console.log('klik login tombol');
		var frm 	= btn.up('form').getForm(),
			userget = frm.getValues().username,
			passget	= frm.getValues().password;
		var data = new rcm.model.LoginAuth({userid:userget,pass:passget});
		// tFG = this.getTaskFormGagal();
		if (frm.isValid()) {
			data.save({
				success: function(respon, operation) {
					var res = operation.request.scope.reader.jsonData["rule"];
					Ext.MessageBox.show({
						title : 'Login Info',
						msg   : 'Selamat Datang '+res.session,
						buttons: Ext.MessageBox.OK,
						icon  : Ext.MessageBox.INFO
					});
					
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
					Ext.getCmp('t_welcome').setText('Selamat Datang '+res.session);
					// tFG.show();
				},
				failure : function(respon, operation){
					Ext.MessageBox.show({
						title : 'Login Info',
						msg   : 'Silahkan Login Kembali, Username atau Password tidak Terdaftar',
						buttons: Ext.MessageBox.OK,
						icon  : Ext.MessageBox.WARNING
					});
				}
			});
			// rcmSettings.aaaaa = pesan;	
			frm.reset();
		} 
		else {
            Ext.MessageBox.show({
				title : 'Login Error',
				msg   : 'Masukkan Username dan Password Anda',
				buttons: Ext.MessageBox.OK,
				icon  : Ext.MessageBox.ERROR
			});
		}
	},
	
	tblLogout : function(b_logout){
		// console.log('klik tombol logout');
		var delS = this.getUnsetSesiStore();
		Ext.MessageBox.show({
			title : 'Logout Info',
			msg   : 'Apakah Anda ingin Keluar ?',
			buttons: Ext.MessageBox.OKCANCEL,
			icon  : Ext.MessageBox.WARNING,
			fn	: function (blout){
				if (blout === 'ok'){ 
					
					delS.load({
						scope: this,
						callback: function(records, operation, success) {
							// var res = operation.request.scope.reader.jsonData["sesi"];
							rcmSettings.gggf = records;
							if (success){
								console.log('Session Unset');
								// Ext.getCmp('p_login').setVisible(false);
								// Ext.getCmp('p_logout').setVisible(true);
								// Ext.getCmp('t_welcome').setText('Selamat Datang '+res.nama);
							}
						}
					});
					
					Ext.getCmp('p_login').setVisible(true);
					Ext.getCmp('p_logout').setVisible(false);
				}
				else {
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
				}
			}
		});
	},
	onLaunch: function(){
		
	}
});