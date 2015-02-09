Ext.define('rcm.controller.Login', {
    extend: 'Ext.app.Controller', 
	
	requires : [
		'rcm.view.login.LoginAuth'
		,'rcm.view.dataentry.DaftarGagal'
		,'rcm.view.dataentry.ExcelGrid'
		,'rcm.view.laporan.GridContract'
	],
	
	views: [
		'nav.AppHeader'
		,'dataentry.FormGagal'
		,'dataentry.DaftarGagal'
		,'laporan.Chart'
		,'Content'
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
		},{
			ref: 'tGridContract',
			selector: 'tGridContract'
		},{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'content',
			selector: 'content'
		},{
			ref : 'authlogin',
			selector : 'authlogin'
		},{
			ref : 'iConMon',
			selector : 'iConMon'
		},{
			ref : 'iOverHaul',
			selector : 'iOverHaul'
		}],
	
	init: function(){
		this.control({
			/*'authlogin button[action=login]' : {
				click : this.tblLogin
			}*/
			/*'excelgrid': {
				recordedit: this.updateTGrid
				
			},*/
			'authlogin textfield' : {
				specialkey: this.enterLogin
			},
			'#btn_login' : {
				click : this.tblLogin
			},
			'#btn_logout' : {
				click : this.tblLogout
			}
		
		});
		
	},
	
	enterLogin : function(f,e){  
		if(e.getKey()==e.ENTER){  
			// console.log('Login dengan enter');
			this.tblLogin();
		}
	},  
	
	tblLogin : function(){
		//console.log('klik login tombol');
		
		var me = this, frm = me.getAuthlogin().getForm(),
			login 	= Ext.create('rcm.model.LoginAuth',frm.getValues());

		if (frm.isValid()) {
			login.save({
				success: function(login, operation) {
					var res = operation.request.scope.reader.jsonData["rule"],
					priviledge = res.level;
					
					//console.log(res);
					/*
					Ext.MessageBox.show({
						title : 'Login Info',
						msg   : 'Selamat Datang '+res.session,
						buttons: Ext.MessageBox.OK,
						icon  : Ext.MessageBox.INFO
					});
					//*/
					me.getAuthlogin().level = res.level;
					
					if (priviledge == 0){
							//alert ('login sebagai super');
							Ext.getCmp('p_login').setVisible(false);
							Ext.getCmp('p_logout').setVisible(true);
							Ext.getCmp('t_welcome').setText('Selamat Datang '+res.session);
							Ext.getCmp('griddel').setVisible(true);
							Ext.getCmp('gridedit').setVisible(true);
							Ext.getCmp('btnUplBpm3').setDisabled(false);
							Ext.getCmp('bwbpm3').setDisabled(false);
							//Ext.fly('idGridCM').ngedit = 1;
							//console.log(Ext.getCmp('idGridCM'));
							Ext.getCmp('idGridCM').ngedit = 1;
							Ext.getCmp('idGridKontrak').ngedit = 1;
							//Ext.fly('idGridCM').ngedit = 1;
							//Ext.getCmp('conmondel').setDisabled(false);
							//Ext.getCmp('cmform').setDisabled(false);
							
							
							// Ext.getCmp('tu_kf').setDisabled(false);
							
							//Ext.getCmp('conmondel').setEnabled(false);
							
							//me.getIConMon().ngedit = 1;
							me.getExcelgrid().ngedit = 1;
							me.getTGridContract().ngedit = 1;

							me.getContent().showKonfig(true);
							me.getContent().showSapu(true);
							me.getTabChart().showInput(true);
							Ext.getCmp('idUpOh').setDisabled(false);
							
							Ext.getCmp('ohdel').setDisabled(false);
							//Ext.getCmp('ohform').setDisabled(false);
							
							
							
						}
					else if (priviledge == 1){
							//alert ('login sebagai admin');
							Ext.getCmp('p_login').setVisible(false);
							Ext.getCmp('p_logout').setVisible(true);
							Ext.getCmp('t_welcome').setText('Selamat Datang '+res.session);
							Ext.getCmp('griddel').setVisible(true);
							Ext.getCmp('gridedit').setVisible(true);
							Ext.getCmp('btnUplBpm3').setDisabled(false);
							Ext.getCmp('bwbpm3').setDisabled(false);
							//Ext.fly('idGridCM').ngedit = 1;
							//console.log(Ext.getCmp('idGridCM'));
							Ext.getCmp('idGridCM').ngedit = 1;
							Ext.getCmp('idGridKontrak').ngedit = 1;
							//Ext.fly('idGridCM').ngedit = 1;
							//Ext.getCmp('conmondel').setDisabled(false);
							//Ext.getCmp('cmform').setDisabled(false);
							
							
							// Ext.getCmp('tu_kf').setDisabled(false);
							
							//Ext.getCmp('conmondel').setEnabled(false);
							
							//me.getIConMon().ngedit = 1;
							me.getExcelgrid().ngedit = 1;
							me.getTGridContract().ngedit = 1;

							me.getContent().showKonfig(true);
							//me.getContent().showSapu(true);
							me.getTabChart().showInput(true);
							Ext.getCmp('idUpOh').setDisabled(false);
							
							Ext.getCmp('ohdel').setDisabled(false);
							//Ext.getCmp('ohform').setDisabled(false);
							
						}
					else if (priviledge > 1){
							//alert ('login sebagai admin');
							Ext.getCmp('p_login').setVisible(false);
							Ext.getCmp('p_logout').setVisible(true);
							Ext.getCmp('t_welcome').setText('Selamat Datang '+res.session);
							Ext.getCmp('griddel').setVisible(true);
							Ext.getCmp('gridedit').setVisible(true);
							Ext.getCmp('btnUplBpm3').setDisabled(false);
							Ext.getCmp('bwbpm3').setDisabled(false);
							//Ext.fly('idGridCM').ngedit = 1;
							//console.log(Ext.getCmp('idGridCM'));
							Ext.getCmp('idGridCM').ngedit = 1;
							Ext.getCmp('idGridKontrak').ngedit = 1;
							//Ext.fly('idGridCM').ngedit = 1;
							//Ext.getCmp('conmondel').setDisabled(false);
							//Ext.getCmp('cmform').setDisabled(false);
							
							
							// Ext.getCmp('tu_kf').setDisabled(false);
							
							//Ext.getCmp('conmondel').setEnabled(false);
							
							//me.getIConMon().ngedit = 1;
							me.getExcelgrid().ngedit = 1;
							me.getTGridContract().ngedit = 1;

							//me.getContent().showKonfig(true);
							//me.getContent().showSapu(true);
							me.getTabChart().showInput(true);
							Ext.getCmp('idUpOh').setDisabled(false);
							
							Ext.getCmp('ohdel').setDisabled(false);
							//Ext.getCmp('ohform').setDisabled(false);
							
						}
						
					
					
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
		var me = this;
		var delS = me.getUnsetSesiStore();
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
							/*
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
							//*/
						}
					});
						

					//me.getIConMon().ngedit = 0;
					me.getExcelgrid().ngedit = 0;
					me.getTGridContract().ngedit = 0;
					me.getAuthlogin().level = 10;
					Ext.getCmp('p_login').setVisible(true);
					Ext.getCmp('p_logout').setVisible(false);
					Ext.getCmp('griddel').setVisible(false);
					Ext.getCmp('gridedit').setVisible(false);
					Ext.getCmp('btnUplBpm3').setDisabled(true);
					Ext.getCmp('bwbpm3').setDisabled(true);
					//Ext.getCmp('conmondel').setDisabled(true);
					//Ext.getCmp('cmform').setDisabled(true);
					
					
					// Ext.getCmp('tu_kf').setDisabled(true);
					Ext.getCmp('idGridCM').ngedit = 0;
					Ext.getCmp('idGridKontrak').ngedit = 0;
					//Ext.fly('idGridCM').ngedit = 0;
					
					me.getContent().showKonfig(false);
					me.getContent().showSapu(false);
					me.getTabChart().showInput(false);
					Ext.getCmp('idUpOh').setDisabled(true);
					//Ext.getCmp('ConMonSave').setDisabled(true);
					
					//Ext.getCmp('ohform').setDisabled(true);
					Ext.getCmp('ohdel').setDisabled(true);
				}
				else {
					Ext.getCmp('p_login').setVisible(false);
					Ext.getCmp('p_logout').setVisible(true);
				}
			}
		});
	},
	
	updateClock: function()	{
		//console.log(Ext.Date.format(new Date(), "g:i:s A"));
		Ext.fly('lblClk').update(Ext.Date.format(new Date(), "l, j M Y G:i:s"));
	},
	
	onLaunch: function(){
		// console.log('launch sesi login');
		var me = this;
		//*
		var LSesi = this.getLoginSesiStore();
		
		var runner = new Ext.util.TaskRunner();
		var task = runner.start({
			run: this.updateClock,
			//interval: 1000
			interval: 10
		});

		
		LSesi.load({
			scope: this,
			callback: function(records, operation, success) {
				var res = operation.request.scope.reader.jsonData["sesi"];
				
				priviledge = res.akses;
				//console.log('yang sedang akses adalah : ' + priviledge);
				
				if (priviledge == 0 && success){
						//alert ('sebagai superadmin');
						//console.log('masuk sebagai admin');
						me.getExcelgrid().ngedit = 1;
						Ext.getCmp('p_login').setVisible(false);
						Ext.getCmp('p_logout').setVisible(true);
						Ext.getCmp('t_welcome').setText('Selamat Datang '+res.nama);
						Ext.getCmp('griddel').setVisible(true);
						Ext.getCmp('gridedit').setVisible(true);
						Ext.getCmp('btnUplBpm3').setDisabled(false);
						Ext.getCmp('bwbpm3').setDisabled(false);
						//Ext.getCmp('conmondel').setDisabled(false);
						//Ext.getCmp('cmform').setDisabled(false);
						
						
						// Ext.getCmp('tu_kf').setDisabled(false);
						
						Ext.getCmp('idGridCM').ngedit = 1;
						Ext.getCmp('idGridKontrak').ngedit = 1;
						//console.log("tes masuk sini");
						me.getAuthlogin().level = res.level;
						
						me.getContent().showKonfig(true);
						me.getContent().showSapu(true);
						me.getTabChart().showInput(true);
						//alert("me.getExcelgrid().ngedit = 1;");
						//me.getIConMon().ngedit = 1;
						
						Ext.getCmp('idUpOh').setDisabled(false);
						Ext.getCmp('ohdel').setDisabled(false);
						//Ext.getCmp('ohform').setDisabled(false);
						
						
					}
				else if (priviledge == 1 && success){
						//alert ('sebagai admin');
						//console.log('masuk sebagai admin');
						me.getExcelgrid().ngedit = 1;
						Ext.getCmp('p_login').setVisible(false);
						Ext.getCmp('p_logout').setVisible(true);
						Ext.getCmp('t_welcome').setText('Selamat Datang '+res.nama);
						Ext.getCmp('griddel').setVisible(true);
						Ext.getCmp('gridedit').setVisible(true);
						Ext.getCmp('btnUplBpm3').setDisabled(false);
						Ext.getCmp('bwbpm3').setDisabled(false);
						//Ext.getCmp('conmondel').setDisabled(false);
						//Ext.getCmp('cmform').setDisabled(false);
						
						
						// Ext.getCmp('tu_kf').setDisabled(false);
						
						Ext.getCmp('idGridCM').ngedit = 1;
						Ext.getCmp('idGridKontrak').ngedit = 1;
						//console.log("tes masuk sini");
						me.getAuthlogin().level = res.level;
						
						me.getContent().showKonfig(true);
						//me.getContent().showSapu(true);
						me.getTabChart().showInput(true);
						//alert("me.getExcelgrid().ngedit = 1;");
						//me.getIConMon().ngedit = 1;
						
						Ext.getCmp('idUpOh').setDisabled(false);
						Ext.getCmp('ohdel').setDisabled(false);
						//Ext.getCmp('ohform').setDisabled(false);
					
					}
				else if(priviledge > 1 && success){
						
						me.getExcelgrid().ngedit = 1;
						Ext.getCmp('p_login').setVisible(false);
						Ext.getCmp('p_logout').setVisible(true);
						Ext.getCmp('t_welcome').setText('Selamat Datang '+res.nama);
						Ext.getCmp('griddel').setVisible(true);
						Ext.getCmp('gridedit').setVisible(true);
						Ext.getCmp('btnUplBpm3').setDisabled(false);
						Ext.getCmp('bwbpm3').setDisabled(false);
						//Ext.getCmp('conmondel').setDisabled(false);
						//Ext.getCmp('cmform').setDisabled(false);
						
						
						// Ext.getCmp('tu_kf').setDisabled(false);
						
						Ext.getCmp('idGridCM').ngedit = 1;
						Ext.getCmp('idGridKontrak').ngedit = 1;
						//console.log("tes masuk sini");
						me.getAuthlogin().level = res.level;
						
						//me.getContent().showKonfig(true);
						//me.getContent().showSapu(true);
						me.getTabChart().showInput(true);
						//alert("me.getExcelgrid().ngedit = 1;");
						//me.getIConMon().ngedit = 1;
						
						Ext.getCmp('idUpOh').setDisabled(false);
						Ext.getCmp('ohdel').setDisabled(false);
						//Ext.getCmp('ohform').setDisabled(false);
					
					}
				
				else {
						//console.log('sesine ilang je');
						Ext.getCmp('p_login').setVisible(true);
						Ext.getCmp('p_logout').setVisible(false);
						//Ext.getCmp('griddel').setVisible(false);	// ----->
						//Ext.getCmp('gridedit').setVisible(false);	// ----->
						Ext.getCmp('btnUplBpm3').setDisabled(true);
						Ext.getCmp('bwbpm3').setDisabled(true);
						//Ext.getCmp('conmondel').setDisabled(true);
						//Ext.getCmp('cmform').setDisabled(true);
						Ext.getCmp('idGridCM').ngedit = 0;		// ----->
//						Ext.getCmp('idGridKontrak').ngedit = 0;
						
						
						me.getContent().showKonfig(false);
						me.getContent().showSapu(false);
						me.getTabChart().showInput(false);
						// Ext.getCmp('tu_kf').setDisabled(true);
						//alert("Session Habis");
						
						Ext.getCmp('idUpOh').setDisabled(true);
						//Ext.getCmp('ohform').setDisabled(true);	// ----->
						Ext.getCmp('ohdel').setDisabled(true);
					
					}
				
			}
		});
		//*/
	}
});
