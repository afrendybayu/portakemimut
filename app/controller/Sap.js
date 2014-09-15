Ext.define('rcm.controller.Sap', {
    extend: 'Ext.app.Controller',
    //*
    	
	views: [
        // TODO: add views here
        'laporan.Chart'
        ,'laporan.UploadFile'
        ,'laporan.SpeedoSap'
        ,'laporan.GridCause'
        ,'laporan.FilterSap'
		//,'laporan.FilterMaint'
		,'laporan.ConMonForm'
		,'laporan.SapPie'
		,'laporan.GridContract'
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

		,'SapOrderCwo','SapOrderCot'
		,'SapThn','SapMwc','SapOType','SapLoc'
		
		,'SapPsOCot','SapPsOCwo','SapPMCost','SapTop10'
		,'Contract','ContractLine', 'ContractInput'

		,'SapHistori','ConMon','ConMonIn','CbParent','CbUnit','ConMonGr'
		,'DetConMonGr','DetConMonPmp','DetConMonGs'
		,'OhTahun'

    ],
    
    models: [
		'ContractInput'
    ],
    
    refs: [{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'tFSap',
			selector: 'tFSap'
		},{
			ref: 'tGridContract',
			selector: 'tGridContract'
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
		},{
			ref : 'iConMon',
			selector : 'iConMon'
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

			'#btnClearSH': {
				click: me.clrSapHist
			},
			'#btnCariSH' : {
				click: me.cariSapHist
			},
			'#btnClearSM': {
				click: me.clrSapMaint
			},
			'#btnCariSM' : {
				click: me.cariSapMaint
			},
			/*
			'#cbparent1': {
				select : me.pilihComboParent,
				change : me.dipilihpilih
			},
			//*/
			'tGridContract': {
				recordedit: me.ubahKontrak
			},
			'#cb_parent':{

				select : me.pilihComboParent
			},
			'#cb_unit' : {
				select : me.pilihComboUnit
			},
			/*'#cb_type' : {
				change : me.pilihTypeUnit
			},*/
			'taskConMon textfield': {
                    specialkey: me.handlesimpan
			},
			
			'iConMon' :{
				
				
				// recordedit: me.updateTask,
				deleteconmon: me.ConMonDeleteClick,
				editconmon : me.ConMonEditClick
			}
			
			
		});
    },
	
	
	
	
	ConMonDeleteClick: function(view, rowIndex, colIndex, column, e) {
        //this.deleteTask(this.getTasksStore().getAt(rowIndex));
		console.log('hapus ro ini');
    },
	ConMonEditClick: function(view, rowIndex, colIndex, column, e) {
        // this.showEditWindow(view.getRecord(view.findTargetByEvent(e)));
		// console.log('edit ro ini '+this.getConMonInStore().getAt(rowIndex).data.id);
		
		rcmSettings.aaaad = this.getConMonInStore().getAt(rowIndex);
		this.editInputConMon(view.getRecord(view.findTargetByEvent(e)));
    
	
	},
	
    editInputConMon: function(task){
		var me = this,
		taskEditConMonForm = me.getTaskConMon();
		// form =  taskEditConMonForm.down('form').getForm(),
		console.log(task);
		Ext.getCmp('cb_parent').setValue(task.data.lokasi);
		taskEditConMonForm.down('form').loadRecord(task);
		// taskEditConMonForm.getForm().loadRecord(task);
		// this.getDetail().getForm().loadRecord(records[0]);
	},
	/*
	showEditWindow: function(task) {
        var me = this,
            taskEditWindow = me.getTaskEditWindow(),
            form =  taskEditWindow.down('form').getForm(),
            reminderCheckbox = form.findField('has_reminder'),
            dateField = form.findField('reminder_date'),
            timeField = form.findField('reminder_time'),
            reminder = task.get('reminder');
		console.log(task);
        // Set the tasks title as the title of the edit window
        taskEditWindow.setTitle('Edit Task - ' + task.get('title'));
        // load the task data into the form
        taskEditWindow.down('form').loadRecord(task);
        // set the text of the toggle-complete button depending on the tasks "done" value
        Ext.getCmp('toggle-complete-btn').setText(task.get('done') ? 'Mark Active' : 'Mark Complete');
        taskEditWindow.show();

        if(task.get('reminder')) {
            // if the task already has a reminder set check the reminder checkbox and populate the reminder date and reminder time fields
            reminderCheckbox.setValue(true);
            dateField.setValue(Ext.Date.clearTime(reminder, true));
            timeField.setValue(Ext.Date.format(reminder, timeField.format)); 
        } else {
            // if the task does not have a reminder set uncheck the reminder checkbox and set the reminder date and time fields to null
            reminderCheckbox.setValue(false);
            dateField.setValue(null);
            timeField.setValue(null); 
        }

        if(task.get('done')) {
            // if the task is done disable the reminder checkbox (reminders cannot be set on completed tasks)
            reminderCheckbox.disable();
        } else {
            reminderCheckbox.enable();
        }

    },
	
	//*/
	
	
	handlesimpan: function(field,e){  
		if(e.getKey()=== e.ENTER){
			this.simpanconmon();
			
		}
	},
		
	simpanconmon : function(){
		
		var me = this,
			form = me.getTaskConMon(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
            tgl		= basicForm.findField('tgl'),
			lokasi 	= basicForm.findField('lokasi'),
			unit 	= basicForm.findField('unit'),
			cmon 	= Ext.create('rcm.model.ConMonIn');
		   
			
			console.log(tgl.getValue()+'->'+lokasi.getValue()+'->'+unit.getValue());
			// console.log(tgl);
			// console.log(lokasi);
			// console.log(unit);
			// console.log(cmon);
			basicForm.updateRecord(cmon);
			
		if(!tgl.getValue()&&!lokasi.getValue()&&!unit.getValue()) {
            return;
        }
		
		cmon.save({
            success: function(cmon, operation) {
                me.getConMonInStore().add(cmon);
                me.getConMonStore().load();
				basicForm.reset();
				me.getConMonInStore().load();
				me.getConMonGrStore().load();
				me.getDetConMonGrStore().load();
				me.getDetConMonGsStore().load();
				me.getDetConMonPmpStore().load();
				// me.refreshFiltersAndCount();
                /*me.getTasksStore().sort();
                titleField.reset();
                titleField.focus();
                formEl.unmask();//*/
            },
            failure: function(task, operation) {
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
						

	pilihComboParent: function(records){
		var lokasi = records.getValue(), combounit = this.getCbUnitStore();
		console.log(lokasi);	
		combounit.clearFilter();
		combounit.filter('id_lokasi',lokasi);
		Ext.getCmp('cb_unit').clearValue();
		
		// Ext.getCmp('cb_type').clearValue();
		
	},
	pilihComboUnit : function(records){
		var unit = records.getValue();
		console.log(unit);
		// combounit.filter('',ll);
		
		
		
	},


	ubahLabelWO: function(p)	{

		var me=this;
		var combost = me.getCbUnitStore();
		//console.log("onLauch SAP");
		//*
		me.getWoOpen7Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo3s7').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen30Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo7s30').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpen60Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo30s60').setText(rec[0].get('teks'));
			}
		});
		me.getWoOpenL60Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				Ext.getCmp('wo60').setText(rec[0].get('teks'));
			}
		});
		//*/
	},
	
	onLaunch: function() {
		//alert("tes");
		this.ubahLabelWO({});
	},
	
	clrSapHist: function()	{
		this.getTFSap().resetFilter();
		this.getSapHistoriStore().load();
	},
	
	cariSapHist: function()	{
		var o = this.getTFSap().sedotFilter();
		//rcmSettings.ttt = o;
		this.getSapHistoriStore().load({params: {loc:o.iL,otp:o.iW,mwc:o.iM,tgl:o.iT }});
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
	},
	
	clrSapMaint: function()	{
		this.getTFSap().resetFilter();
		this.ubahLabelWO();
	},
	
	cariSapMaint: function()	{
		var o = this.getTFSap().sedotFilter(),
			p = { loc:o.iL,otp:o.iW,mwc:o.iM,taw:o.iTw,tak:o.iTk };
		this.ubahLabelWO(p);
		//this.getSapHistoriStore().load({params: {loc:o.iL,otp:o.iW,mwc:o.iM,tgl:o.iT }});
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
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
		
	},
	
	ubahKontrak: function( e,nilai,bln,tipe,thn )	{
		var me=this,
			kont=new rcm.model.ContractInput({
			nilai:nilai,bln:bln,tipe:tipe,thn:thn
        });
		/*
		Ext.MessageBox.show({
			title:'Save Changes?',
			//msg: 'Data will be changed into '+nilai+'<br />Would you like to save your changes?',
			msg: 'Data will be changed into <br />Would you like to save your changes?',
			buttons: Ext.MessageBox.YESNOCANCEL,
			fn: showResult,
			animEl: 'mb4',
			icon: Ext.MessageBox.QUESTION
		});
       //*/
       if (e.originalValue == nilai)	{
			//console.log("sama");
		   return;
	   }
       
		Ext.MessageBox.show({
			title : 'Simpan ?',
			msg : 'Simpan nilai awal '+e.originalValue+', menjadi '+nilai+' ?',
			//width : 300,
			buttons : Ext.MessageBox.OKCANCEL,
			//multiline : true,
			scope : this,
			fn : function(btn, reason, cfg){ 
				if (btn =='ok') {
					//alert('ok with text');
					kont.save({
						success: function(respon, operation) {
							var resp = operation.request.scope.reader.jsonData["tasks"];
							rcmSettings.yyyyyy = resp;
							//console.log("sukses: "+resp + ", id: "+resp[0].id);
							me.getContractStore().load();
							me.getContractLineStore().load();
						},
						failure: function(task, operation) {
							var error = operation.getError(),
								msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

							Ext.MessageBox.show({
								title: 'Update Contract Cost Failed',
								msg: msg,
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			}
		});
		/*
        
		//*/
	},
	
	showResult: function(a)	{
		console.log("tes: "+a);
	}
	
});
