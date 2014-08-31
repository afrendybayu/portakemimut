Ext.define('rcm.controller.Sap', {
    extend: 'Ext.app.Controller',
    //*
    	
	views: [
        // TODO: add views here
        'laporan.Chart'
        ,'laporan.UploadFile'
        ,'laporan.SpeedoSap'
        ,'laporan.GridCause'
		,'laporan.ConMonForm'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
		'HoTeco','HoMan','HoOrderC'
		,'SapEPO'
        ,'WoOpen7','WoOpen30','WoOpen60','WoOpenL60'
        ,'SapCause','SapDamage','SapOPart'/*,'SapSymptom'*/
		,'SapCauseInfo','SapDamageInfo','SapOPartInfo','SapSymptomInfo'
		,'SapHistori','ConMon','ConMonIn','CbParent','CbUnit'
    ],
    
    models: [
		//'Hirarki',
    ],
    
    refs: [{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'taskGridCause',
			selector: 'taskGridCause',
			xtype: 'taskGridCause',
			autoCreate: true
		},{
			ref: 'tUploadfile',
			selector: 'tUploadfile',
			xtype: 'tUploadfile',
			autoCreate: true
		},{
			ref : 'taskConMon',
			selector : 'taskConMon'
	}],
    
    init: function() {
		var me = this;
        me.control({
			//*
			'taskGridCause': {
				sapFilter: me.grafikFilter,
				clrChartCause: me.grafikCauseClear
			},
			'#btnUplBpm3': {
				click: me.hdUplBpm3
			},
			'#btnUplBiaya': {
				click: me.hdUplBiaya
			},
			'#btnUplCM': {
				click: me.hdUplCM
			},
			'#cbparent':{
				select : me.pilihComboParent
			},
			'#cb_unit' : {
				select : me.pilihComboUnit
			},
			'taskConMon textfield': {
                    specialkey: me.handlesimpan
			}
		});
    },
    
	handlesimpan: function(field,e){  
		if(e.getKey()=== e.ENTER){
			this.simpanconmon();
			
		}
	},
		
	simpanconmon : function(){
		/*var me = this,
            form = me.getTaskForm(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
            titleField = form.getForm().findField('title'),
            task = Ext.create('SimpleTasks.model.Task');
		console.log(titleField.getValue());
        // require title field to have a value
        if(!titleField.getValue()) {
            return;
        }*/
        
		
		
		var me = this,
			form = me.getTaskConMon(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
            tgl 	= basicForm.findField('tgl'),
			lokasi 	= basicForm.findField('lokasi'),
			unit 	= basicForm.findField('unit'),
            cmon 	= Ext.create('rcm.model.ConMonIn');
			
			// console.log(tgl.getValue()+'->'+lokasi.getValue()+'->'+unit.getValue());
			
		if(!tgl.getValue()&& lokasi.getValue()&&unit.getValue()) {
            return;
        }
		
		form.items.each(function(item) {
            var inputEl = item.getEl().down('input')
            if(inputEl) {
                inputEl.blur();
            }
        });
		
		cmon.save({
            success: function(cmon, operation) {
                console.log(cmon);
				me.getConMonInStore().add(cmon);
				//me.refreshFiltersAndCount();
                // me.getConMonInStore().sort();
                basicForm.reset();
                lokasi.focus();
               // formEl.unmask();*/
            },
            failure: function(cmon, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Add Task Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                formEl.unmask();
            }
        });
		
	},
						
						
						/*if(e.getKey()==e.ENTER){  
							// Ext.Msg.alert('Keys','You pressed the Enter key');  
							console.log('Login dengan enter');
							// rcmSettings.kkkkk = f;
							// rcmSettings.kkkkkw = e;
							
							var me = this;
							var frm 	= f.up('form').getForm(),
								date	= frm.getValues().tgl,
								loc		= frm.getValues().lokasi,
								unit	= frm.getValues().unit,
								wo		= frm.getValues().wo,
								sap		= frm.getValues().sap,
								lap		= frm.getValues().lap,
								pic		= frm.getValues().pic,
								ket		= frm.getValues().ket;
								
								// rcmSettings.unit = lokasi;
								// rcmSettings.lockk = unit;
							console.log (date+', '+loc+', '+unit+', '+wo+', '+sap+', '+lap+', '+pic+', '+ket);
							var cmon = new rcm.model.ConMonIn({ tgl:date, lokasi:loc, unit:unit, wo:wo, sap:sap, url:lap, pic:pic, ket:ket});
							
							if (frm.isValid()) {
								cmon.save({
									success: function(respon, operation) {
										//var res = operation.request.scope.reader.jsonData["rule"];
										
										console.log(res.date+'->'+res.loc+'->'+res.unit);
										/*
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
										
										me.getExcelgrid().ngedit = 1;
										// rcmSettings.aaaaa = Ext.getCmp('grid_edit1111');	
										/*	var me 	= this,
												uFG = me.getTaskFormGagal();
												uFG.show();
										*/
										
								/*	},
									failure : function(respon, operation){
										console.log('salah input');
										/*Ext.MessageBox.show({
											title : 'Login Info',
											msg   : 'Silahkan Login Kembali, Username atau Password tidak Terdaftar',
											buttons: Ext.MessageBox.OK,
											icon  : Ext.MessageBox.WARNING
										});*/
								/*	}
								});
								// rcmSettings.aaaaa = pesan;	
								frm.reset();
							} 
							
							
						}
	},  */
	
	pilihComboParent: function(records){
		var loc = records.getValue(), combounit = this.getCbUnitStore();
		console.log(loc );	
		combounit.clearFilter();
		combounit.filter('id_lokasi',loc);
		Ext.getCmp('cb_unit').clearValue();
		
	},
	pilihComboUnit : function(records){
		var ll = records.getValue();
		console.log(ll);
	},

	ubahLabelWO: function()	{
		var me=this;
		var combost = me.getCbUnitStore();
		//console.log("onLauch SAP");
		/*
		me.getWoOpen7Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo3s7').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen30Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo7s30').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen60Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo30s60').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpenL60Store().load({
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo60').setText(rec[0].get('teks'));
			}
		});
		//*/
	},
	
	onLaunch: function() {
		//alert("tes");
		this.ubahLabelWO();
	},
	
	grafikCauseClear: function()	{
		var me=this,
			tab=rcmSettings.tsp.split("_");
		if ((tab[0].localeCompare("ts")==0) && (tab[1]=='ca'))	{
			me.getSapCauseInfoStore().clearFilter();
		} else if ((tab[0].localeCompare("ts")==0) && (tab[1]=='da'))	{
			me.getSapDamageInfoStore().clearFilter();
		} else if ((tab[0].localeCompare("ts")==0) && (tab[1]=='ob'))	{
			me.getSapOPartInfoStore().clearFilter();
		} else if ((tab[0].localeCompare("ts")==0) && (tab[1]=='sm'))	{
			me.getSapSymptomInfoStore().clearFilter();
		}
		
	},
	
	grafikFilter: function(n, d)	{
		//alert(n);
		var me=this;
		if (n.localeCompare("dam")==0)	{
			me.getSapDamageInfoStore().clearFilter(true);
			me.getSapDamageInfoStore().filter('damage',d.kode);
		} else if (n.localeCompare("cau")==0)	{
			me.getSapCauseInfoStore().clearFilter(true);
			me.getSapCauseInfoStore().filter('cause',d.kode);
		} else if (n.localeCompare("opt")==0)	{
			me.getSapOPartInfoStore().clearFilter(true);
			me.getSapOPartInfoStore().filter('opart',d.kode);
		} else if (n.localeCompare("sym")==0)	{
			me.getSapSymptomInfoStore().clearFilter(true);
			me.getSapSymptomInfoStore().filter('symptom',d.kode);
		}
	},
	
	hdUplBpm3: function(btn)	{
		var tpl = new Ext.XTemplate(
			'File processed on the server.<br/>',
			'Name: {fNama}<br/>',
			'Size: {fSize}.<br/>',
			'Read time : {tBacaF}.<br/>',
			'Save time: {tSaveF}.<br/>',
			'Used Memory: {mem}.<br/>'
		);
		var msg = function(title, msg) {
			Ext.Msg.show({
				title: title,
				msg: msg,
				minWidth: 200,
				modal: true,
				icon: Ext.Msg.INFO,
				buttons: Ext.Msg.OK
			});
		};

		var form = btn.up('form').getForm();
		//rcmSettings.uuuu = form;
		//*
		if(form.isValid()){
			form.submit({
				url: 'ci/index.php/sap/rUpload/getUplBpm3',
				waitMsg: 'Uploading your file...',
				success: function(fp, o) {
					msg('Success', tpl.apply(o.result));
				},
				falure: function(fp, o)	{
					Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
				}
			});
		}
		//*/
	},
	
	hdUplBiaya: function(btn)	{
		
	},
	
	hdUplCM: function(btn)		{
		
	}
	
});
