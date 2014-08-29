Ext.define('rcm.controller.Login', {
    extend: 'Ext.app.Controller', 
	
	requires : [
		'rcm.view.login.LoginAuth',
		'rcm.view.dataentry.DaftarGagal'
			
	],
	
	views: [
		'nav.AppHeader'
		,'dataentry.FormGagal'
		,'dataentry.DaftarGagal'
		// ,'dataentry.IsiTabForm'
		
    ],

    stores: [
		'LoginAuth'
		,'UnsetSesi'
		,'LoginSesi'
	],
    
    models: [
		'LoginAuth'
		,'UnsetSesi'
		,'LoginSesi'
	],
	
	refs : [{
			ref: 'taskFormGagal',
			selector: 'taskFormGagal',
			xtype: 'taskFormGagal'
		},{
			ref: 'excelgrid',
			selector: 'excelgrid'
		}],
	
	init: function(){
		this.control({
			/*'authlogin button[action=login]' : {
				click : this.tblLogin
			}*/
			/*'excelgrid': {
				recordedit: this.updateTGrid
				
			},*/
			
			'#btn_login' : {
				click : this.tblLogin
			},
			'#btn_logout' : {
				click : this.tblLogout
			},
			'actioncolumn#gridedit' : {
				click : this.handlegridedit
			}
		
		});
		
	}, 
	
	
	/*bfGagal : function(){
		// var FGagal 	= this.getTaskFormGagal();
		var DSesi	= this.getLoginSesiStore();
		DSesi.load({
						scope: this,
						callback: function(records, operation, success) {
							var res = operation.request.scope.reader.jsonData["sesi"];
							if (res.nama == 'Administrator'){
								console.log('masuk sebagai admin');
								// FGagal.show();
							}
							else{
								console.log('tidak jelas');
								FGagal.hide();
							}
							// the operation object
							// contains all of the details of the load operation
							console.log(res.nama);
						}
					});
	},*/
	handlegridedit :function(){
		// Ext.bind(me.hdlEditDGClick, me)
		
	},
	
	tblLogin : function(btn){
		// console.log('klik login tombol');
		// 
		
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
					Ext.getCmp('griddel').setVisible(true);
					Ext.getCmp('gridedit').setVisible(true);
					Ext.getCmp('btnUplBpm3').setDisabled(false);
					Ext.getCmp('bwbpm3').setDisabled(false);
					
					
					// rcmSettings.aaaaa = Ext.getCmp('grid_edit1111');	
					/*	var me 	= this,
							uFG = me.getTaskFormGagal();
							uFG.show();
					*/
					
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
							if (success){
								// console.log('Session Unset');
								Ext.MessageBox.show({
									title : 'Logout Info',
									msg   : 'Terimakasih',
									buttons: Ext.MessageBox.OK,
									icon  : Ext.MessageBox.INFO,
								});
								// alert('Login Info','Terimakasih');
							}
						}
					});
					
					Ext.getCmp('p_login').setVisible(true);
					Ext.getCmp('p_logout').setVisible(false);
					Ext.getCmp('griddel').setVisible(false);
					Ext.getCmp('gridedit').setVisible(false);
					Ext.getCmp('btnUplBpm3').setDisabled(true);
					Ext.getCmp('bwbpm3').setDisabled(true);
				}
				else {
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
				}
			}
		});
	},
	onLaunch: function(){
		// console.log('launch sesi login');
		var LSesi = this.getLoginSesiStore();
		LSesi.load({
			scope: this,
			callback: function(records, operation, success) {
				var res = operation.request.scope.reader.jsonData["sesi"];
				if (success){
					console.log('masuk sebagai admin');
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
					Ext.getCmp('t_welcome').setText('Selamat Datang '+res.nama);
					Ext.getCmp('griddel').setVisible(true);
					Ext.getCmp('gridedit').setVisible(true);
					Ext.getCmp('btnUplBpm3').setDisabled(false);
					Ext.getCmp('bwbpm3').setDisabled(false);
					
					
				}
				else{
					console.log('sesine ilang je');
					Ext.getCmp('p_login').setVisible(true);
					Ext.getCmp('p_logout').setVisible(false);
					Ext.getCmp('griddel').setVisible(false);
					Ext.getCmp('gridedit').setVisible(false);
					Ext.getCmp('btnUplBpm3').setDisabled(true);
					Ext.getCmp('bwbpm3').setDisabled(true);
				}
				// console.log(res.nama);
			}
		});
	}
});