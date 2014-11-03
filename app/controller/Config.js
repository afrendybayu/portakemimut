Ext.define('rcm.controller.Config', {
    extend: 'Ext.app.Controller',
    //*
    
	
	
	views: [
        // TODO: add views here
        'konfig.TabKonfig',
		'konfig.TreeHirarki',
		// 'konfig.AksiGrid',
		'konfig.PanelList',
		'konfig.TreeCat',
		// 'konfig.AksiForm',
		'konfig.PmDefForm',
		'konfig.CauseForm',
		'konfig.DamageGrid',
		'konfig.DamageForm',
		// 'konfig.FailureGrid',
		// 'konfig.FailureForm',
		
		'konfig.wCatHir'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
		'LokUnit',
		
		'FormAksis',
		'FormPmDefs',
		'Causes',
		'Damages',
		'ModeDefs',
		'Refers',
		'Symptoms',
		'GridAksi',
		'OPartDefs',
		//'PMDefs',


		'Users',
		
		'GridPMIn',
		'GridPMnIn',
		'GridKfEquip',
		'CatHir',
		'GridOPnIn',
		'GridOPIn',
		'GridModenIn',
		'GridModeIn',
		'GridEqcIn',
		'GridEqnIn'
    ],
    
    models: [
		'LokUnit',
		'GridAksi',
		
		'FormAksi',
		'FormPmDef',
		'Cause',
		'Damage',
		'ModeDef',
		'Refer',
		'Symptom',
		'OPartDef',

		'GridPMIn',
		'GridOPIn',
		'GridModeIn',
		'CatHir',
		'CatHirEq'
	],
    
    refs: [{
			ref: 'treeHirarki',
			selector: 'treeHirarki'
		},{
			ref: 't_Konfig',
			selector: 't_Konfig'
		},{
			ref: 'tCatHir',
			selector: 'tCatHir'
		},{
			ref: 'tWCatHir',
			selector: 'tWCatHir',
			xtype: 'tWCatHir',
			autoCreate: true
		},{
			ref: 'tKGridL',
			selector: 'tKGridL'
			//xtype: 'tKGridL',
			//autoCreate: true
		},{
			ref: 'fAksi',
			selector : 'fAksi'
		},{
			
			ref : 'f_PmDef',
			selector : 'f_PmDef'
		},{
			ref : 'gridPmDef',
			selector : 'gridPmDef'
		},{
			ref : 'gridCauseDef',
			selector : 'gridCauseDef'
		},{
			ref : 'fCause',
			selector : 'fCause'
		},{
			ref : 'gridDamage',
			selector : 'gridDamage'
		},{
			ref : 'fDamage',
			selector : 'fDamage'
		},{
			ref : 'fFailure',
			selector : 'fFailure'
		},{
			ref : 'gridFailure',
			selector : 'gridFailure'
		},{
			ref : 'gridRefer',
			selector : 'gridRefer'
		},{
			ref : 'fRefer',
			selector : 'fRefer'
		},{
			ref : 'fSymptom',
			selector : 'fSymptom'
		},{
			ref : 'gridSymptom',
			selector : 'gridSymptom'
	}],
    
    init: function() {
		var me = this;
        me.control({
			//*
			'[iconCls=new_folder_tree]': {
                click: me.tblNewLokasi
            },
			'[iconCls=delete_folder_tree]': {
                click: me.tblDelLokasi
            },
            /*
            '[iconCls=new_cat_tree]': {
                //click: me.tblNewCat
            },
            //*/
            '#idnCPM': {
				click: me.tblNCatPM
			},
			'#idnCOP': {
				click: me.tblNCatOP
			},
			'#idnCMd': {
				click: me.tblNCatMd
			},
			'#idnCEq': {
				click: me.tblNCatEq
			},
			'#saveCatH': {
				click: me.saveNCatH
			},
			'#iddCPM': {
				click: me.tblDelCat
			},
			'#iddCOP': {
				click: me.tblDelCat
			},
			'#iddCMd': {
				click: me.tblDelCat
			},
			'#iddCEq': {
				click: me.tblDelCat
			},
			'[iconCls=del_cat_tree]': {
                click: me.tblDelCat
            },
            '#idEqCH': {
				 click: me.hdlCatHirEq
			},
			'#tambah_lokasi' : {
				click : me.tambahLokasi
			},
			
			'treeHirarki': {
                // afterrender: me.handleAfterListTreeRender,
                edit: me.updateTreeHirarki,
                // completeedit: me.handleCompleteEdit,
                // canceledit: me.handleCancelEdit,
                deleteclick: me.handleDeleteIconClick,
                selectionchange: me.hdlSelChHir,
                // taskdrop: me.updateTaskList,
                // listdrop: me.reorderList,
                itemmouseenter: me.showActions,
                itemmouseleave: me.hideActions,
                // itemcontextmenu: me.showContextMenu
            },
            
            'tCatHir': {
				catclick: me.hdlCatHir,
				deleteclick: me.hdlDelCatHir,
				itemmouseenter: me.showActions,
				itemmouseleave: me.hideActions
			},
			
			'tKGridL': {
				cdragdrop: me.hdlDropListC,
				ddragdrop: me.hdlDropListD,
				itemmouseenter: me.showActions,
				itemmouseleave: me.hideActions,
				deleteclick: me.hdlDelEq
			},
			 
			'fAksi button[text=Simpan]' : {
				click : me.hdlSmpAksiForm
			},
			'#iGMddef': {
				click: me.iGMddef
			},
			'#iGOpdef': {
				click: me.iGOpdef
			},
			'#iGPmdef': {
				click: me.iGPmdef
			},
			'fAksi button[text=Edit]' : {
				click : me.hdlEditAksiForm
			},
			'f_PmDef button[text=Simpan]' : {
				click : me.hdlSmpPmDefForm
			},
			'f_PmDef button[text=Edit]' : {
				click : me.hdlEditPmDefForm
			},
			'fCause button[text=Simpan]' : {
				click : me.hdlSmpCauseForm
			},
			'fCause button[text=Edit]' : {
				click : me.hdlEditCauseForm
			},
			'fDamage button[text=Simpan]' : {
				click : me.hdlSmpDamageForm
			},
			'fDamage button[text=Edit]' : {
				click : me.hdlEditDamageForm
			},
			'fFailure button[text=Simpan]' : {
				click : me.hdlSmpFailForm
			},
			'fFailure button[text=Edit]' : {
				click : me.hdlEditFailForm
			},
			'fRefer button[text=Simpan]' : {
				click : me.hdlSmpReferForm
			},
			'fRefer button[text=Edit]' : {
				click : me.hdlEditReferForm
			},
			'fSymptom button[text=Simpan]' : {
				click : me.hdlSmpSympForm
			},
			'fSymptom button[text=Edit]' : {
				click : me.hdlEditSympForm
			},
			'gridAksi' :{
				AksiGridDel  : me.delAksiGrid,
				selectionchange : me.slctAksiGrid
			},
			
			'gridPmDef' : {
				PmDefGridDel : me.delPmDefGrid,
				selectionchange : me.slctPmDefGrid
			},
			'gridCauseDef' : {
				CauseGridDel : me.delCauseGrid,
				selectionchange : me.slctCauseGrid
			},
			'gridDamage' : {
				DamageGridDel : me.delDamageGrid,
				selectionchange : me.slctDamageGrid
			},
			'gridFailure' : {
				FailureGridDel	: me.delFailureGrid,
				selectionchange : me.slctFailureGrid
			},
			'gridRefer' : {
				ReferGridDel : me.delReferGrid,
				selectionchange : me.slctReferGrid
			},
			'gridSymptom' : {
				SympGridDel : me.delSympGrid,
				selectionchange : me.slctSympGrid
			},

		});
		
    },
    hdlSmpSympForm : function(){
    	// alert('Symptom klik simpan');
    	var me = this,
    	symp = me.getFSymptom().getForm(),
		getDataSymp = symp.getValues(),
		sympSave = new rcm.model.Symptom(getDataSymp);
		// console.log(getDataCause);
		// console.log(DmgSave);
		symp.reset();
		sympSave.save({
			success: function(record, operation){
				me.getSymptomsStore().reload();
			}
		});
    },
    hdlEditSympForm : function(){
    	// alert('Symptom klik edit');
    	var me = this,
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isisymp = me.getFSymptom().getForm(),
		dataid = isisymp.getRecord().data.id,
		isivalue = isisymp.getValues();
		// cobama 	= isivalue.obama ? 1 : 0;
		editsymp = Ext.create(rcm.model.Symptom,{
			id:dataid, nama:isivalue.nama, kode:isivalue.kode
		});
		// console.log(isivalue);
		// console.log(dataid);
		isisymp.reset();
		// me.getCausesStore().reload();
		editsymp.save({
			success: function(record, operation){
				me.getSymptomsStore().reload();
			}

		});
    },
    delSympGrid : function(rec){
    	var me = this, 
		record = rec.data,
		delsymp = new rcm.model.Symptom(record );
		Ext.MessageBox.show({
				title : 'Hapus Symptom Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delsymp.destroy ({
							success : function(record, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getSymptomsStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
				}
			});
    },
    slctSympGrid : function(model,records){
    	var me =this;
		if (records[0]) {
			me.getFSymptom().getForm().loadRecord(records[0]);
        }
    },
    hdlSmpReferForm : function(){
    	// alert('Referensi klik simpan');
    	var me = this,
    	refer = me.getFRefer().getForm(),
		getDataRefer = refer.getValues(),
		referSave = new rcm.model.Refer(getDataRefer);
		// console.log(getDataCause);
		// console.log(DmgSave);
		refer.reset();
		referSave.save({
			success: function(record, operation){
				me.getRefersStore().reload();
			}
		});
    },
    hdlEditReferForm : function(){
    	// alert('Referensi klik edit');
    	var me = this,
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isiref = me.getFFailure().getForm(),
		dataid = isiref.getRecord().data.id,
		isivalue = isiref.getValues();
		// cobama 	= isivalue.obama ? 1 : 0;
		editref = Ext.create(rcm.model.Refer,{
			id:dataid, nama:isivalue.nama, kode:isivalue.kode
		});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);

		isifail.reset();
		// me.getCausesStore().reload();
		editref.save({
			success: function(record, operation){
				me.getRefersStore().reload();
			}

		});
    },
    delReferGrid : function(rec){
    	var me = this, 
		record = rec.data,
		delref = new rcm.model.Refer(record );
		Ext.MessageBox.show({
				title : 'Hapus Referensi Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delref.destroy ({
							success : function(record, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getRefersStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
				}
			});
    },

    slctReferGrid : function(model, records){
    	var me =this;
		if (records[0]) {
			me.getFRefer().getForm().loadRecord(records[0]);
        }
    },

    hdlSmpFailForm : function(){
    	// alert('tekan tombol simpan');
    	var me = this,
    	fail = me.getFFailure().getForm(),
		getDataFail = fail.getValues(),
		failSave = new rcm.model.ModeDef(getDataFail);
		// console.log(getDataCause);
		// console.log(DmgSave);
		fail.reset();
		failSave.save({
			success: function(record, operation){
				me.getModeDefsStore().reload();
			}
			
		
		});
    },
    hdlEditFailForm : function(){
    	// alert ('tekan tombol edit');
    	var me = this,
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isifail = me.getFFailure().getForm(),
		dataid = isifail.getRecord().data.id,
		isivalue = isifail.getValues();
		// cobama 	= isivalue.obama ? 1 : 0;
		editfail = Ext.create(rcm.model.ModeDef,{
			id:dataid, nama:isivalue.nama, kode:isivalue.kode, ket:isivalue.ket
		});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);

		isifail.reset();
		// me.getCausesStore().reload();
		editfail.save({
			success: function(record, operation){
				me.getModeDefsStore().reload();
			}

		});
    },
    slctFailureGrid : function(model, records){
    	var me =this;
		if (records[0]) {
			me.getFFailure().getForm().loadRecord(records[0]);
        }
    },
    delFailureGrid : function(rec){
    	var me = this, 
		record = rec.data,
		delfail = new rcm.model.ModeDef(record );
		Ext.MessageBox.show({
				title : 'Hapus Failure Mode Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delfail.destroy ({
							success : function(record, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getModeDefsStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
    },
    slctDamageGrid : function(model, records){
    	var me =this;
		if (records[0]) {
			me.getFDamage().getForm().loadRecord(records[0]);
        }
    },
    hdlSmpDamageForm : function(){
    	// alert ('Tombol damage simpan');
    	var me = this,
    	fdmg = me.getFDamage().getForm(),
		getDataDmg = fdmg.getValues(),
		DmgSave = new rcm.model.Damage(getDataDmg);
		// console.log(getDataCause);
		// console.log(DmgSave);
		fdmg.reset();
		DmgSave.save({
			success: function(record, operation){
				me.getDamagesStore().reload();
			}
			
		
		});
    },
	hdlEditDamageForm : function(){
		alert('Tombol Edit damage');
		var me = this,
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isidmg = me.getFDamage().getForm(),
		dataid = isidmg.getRecord().data.id,
		isivalue = isidmg.getValues();
		// cobama 	= isivalue.obama ? 1 : 0;
		editdmg = Ext.create(rcm.model.Damage,{
			id:dataid, nama:isivalue.nama, kode:isivalue.kode
		});
		// console.log(isivalue);
		// console.log(cobama);

		// console.log(editsave);

		isidmg.reset();
		// me.getCausesStore().reload();
		editdmg.save({
			success: function(record, operation){
				me.getDamagesStore().reload();
			}

		});
	},

    delDamageGrid : function(rec){
    	// alert ('grid Cause Delete');
		// console.log(rec);
		
		var me = this, 
		record = rec.data,
		deldmg = new rcm.model.Damage(record );
		Ext.MessageBox.show({
				title : 'Hapus Damage Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						deldmg.destroy ({
							success : function(record, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getDamagesStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
    },

    hdlEditCauseForm : function(){
    	// alert ('Form Edit');
    	var me = this;
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isicause = me.getFCause().getForm();
		dataid = isicause.getRecord().data.id;
		isivalue = isicause.getValues();
		// cobama 	= isivalue.obama ? 1 : 0;
		editcause = Ext.create(rcm.model.Cause,{
			id:dataid, nama:isivalue.nama, kode:isivalue.kode, obama:isivalue.obama, sap :isivalue.sap ,ket : isivalue.ket
		});
		// console.log(isivalue);
		// console.log(cobama);

		// console.log(editsave);

		isicause.reset();
		// me.getCausesStore().reload();
		editcause.save({
			success: function(record, operation){
				me.getCausesStore().reload();
			}

		});
    },
    hdlSmpCauseForm : function(){
    	// alert ('Form Simpan');
    	var me = this,
    	f_cause = me.getFCause().getForm(),
		getDataCause = f_cause.getValues(),
		CauseSave = new rcm.model.Cause(getDataCause);
		// console.log(getDataCause);
		console.log(CauseSave);
		f_cause.reset();
		CauseSave.save({
			success: function(record, operation){
				me.getCausesStore().reload();
			}
			
		
		});
    },

    slctCauseGrid : function(model, records){
    	var me =this;
		if (records[0]) {
			me.getFCause().getForm().loadRecord(records[0]);
        }
    },

    delCauseGrid : function(rec){
    	// alert ('grid Cause Delete');
		// console.log(rec);
		
		var me = this, 
		record = rec.data,
		delcause = new rcm.model.Cause(record );
		Ext.MessageBox.show({
				title : 'Hapus Cause Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delcause.destroy ({
							success : function(delPm, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getCausesStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
    },
	

    
    hdlSelChHir: function(selModel,tasks)	{
		//alert("ini");
		//
		var d = selModel.getSelection()[0];
		//console.log("controller hdlSelChHir: "+d.get('flag'));
		if (d.get('flag')=='e')	{
			Ext.getCmp('tEqKonfigs').ngedit = 1;
		}
		else {
			Ext.getCmp('tEqKonfigs').ngedit = 0;
		}
		//console.log(d.get('flag'));
	},
    
    iGMddef: function()	{
		this.getT_Konfig().showTab('mdd');
	},
	iGOpdef: function()	{
		this.getT_Konfig().showTab('opd');
	},
	iGPmdef: function()	{
		this.getT_Konfig().showTab('pmd');
	},


	slctPmDefGrid : function (model, records){
		var me =this;
		if (records[0]) {
			me.getF_PmDef().getForm().loadRecord(records[0]);
        }
	},
	
	delPmDefGrid : function (rec){
		//alert ('Awas Kau Pencet-Penccet Aku '+rec);
		//console.log(rec);
		
		var me = this, 
			record = rec.data,
			delPm = new rcm.model.FormPmDef(record );
		Ext.MessageBox.show({
				title : 'Hapus Predictive Maintenance Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delPm.destroy ({
							success : function(delPm, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getFormPmDefsStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
	
	},

	hdlEditPmDefForm : function(){
		// alert ('edit Form PM DEF');

		var me = this;
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isiform = me.getF_PmDef().getForm();
		dataid = isiform.getRecord().data.id;
		isivalue = isiform.getValues();
		// isiform.//.newValues();
		// isistore = me.getFormAksisStore().getNewRecords();
		
		// editsave = new rcm.model.FormAksi();
		// editsave.set({id:dataid, nama:isivalue.nama, ket : isivalue.ket});

		editpmdef = Ext.create(rcm.model.FormPmDef,{
			id:dataid, 
			nama:isivalue.nama,
			kode:isivalue.kode,
			durasi:isivalue.durasi,
			ket : isivalue.ket
		});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);
		isiform.reset();
		editpmdef.save({
			success: function(record, operation){
				me.getFormPmDefsStore().reload();
			}

		});
	},
	
	hdlSmpPmDefForm : function (){
		// alert('ke teken');
		var me = this,
		f_pmdef = me.getF_PmDef().getForm(),
		getDataPMDef = f_pmdef.getValues(),
		PmDefSave = new rcm.model.FormPmDef(getDataPMDef);
		// console.log(PmDefSave);
		f_pmdef.reset();
		PmDefSave.save({
			success: function(record, operation){
				me.getFormPmDefsStore().reload();
			}
			
		
		});
	},
    slctAksiGrid : function (model, records){
		var me =this;
		if (records[0]) {
			me.getFAksi().getForm().loadRecord(records[0]);
        }
	},
	
	delAksiGrid : function (rec){
		//alert ('Awas Kau Pencet-Penccet Aku '+rec);
		//console.log(rec);
		
		var me = this, 
		record = rec.data,
		delAksi 	= new rcm.model.FormAksi(record );
		Ext.MessageBox.show({
				title : 'Hapus Aksi',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delAksi.destroy ({
							success : function(delAksi, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getFormAksisStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
	
	},
	hdlEditAksiForm : function(){
		// alert ('ini tombol edit');
		var me = this;
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isiform = me.getFAksi().getForm();
		dataid = isiform.getRecord().data.id;
		isivalue = isiform.getValues();
		// isiform.//.newValues();
		// isistore = me.getFormAksisStore().getNewRecords();
		
		// editsave = new rcm.model.FormAksi();
		// editsave.set({id:dataid, nama:isivalue.nama, ket : isivalue.ket});

		editsave = Ext.create(rcm.model.FormAksi,{id:dataid, nama:isivalue.nama, ket : isivalue.ket});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);
		isiform.reset();
		editsave.save({
			success: function(record, operation){
				me.getFormAksisStore().reload();
			}

		});

		
	},
	hdlSmpAksiForm : function(){
		// alert('tekan tombol simpan');
		var me = this,
		f_aksi = me.getFAksi().getForm(),
		getDataAksi = f_aksi.getValues(),
		AksiSave = new rcm.model.FormAksi(getDataAksi);
		// console.log(AksiSave);
		f_aksi.reset();
		AksiSave.save({
			success: function(record, operation){
				me.getFormAksisStore().reload();
			}
			
		
		});
	},
	
	hdlDelEq: function(rec)	{
		//alert("Del: "+rec.get('id'));
		console.log(rec);
		var me = this, 
			dEqCH = new rcm.model.CatHirEq({id:rec.get('id')});
		Ext.MessageBox.show({
			title : 'Hapus Kategori Equipment',
			msg   : 'Yakin Kategori '+rec.get('nama')+' Akan diHapus ??',
			buttons: Ext.MessageBox.OKCANCEL,
			icon  : Ext.MessageBox.WARNING,
			fn	: function (oks){
				if (oks === 'ok'){ 
					dEqCH.destroy ({
						success: function(del, op){
							// dcmon.destroy();
							// me.getConMonStore().reload();
							me.getGridEqcInStore().reload();
							me.getGridEqnInStore().reload();
						},
						callback: function(){
							
						}
					}) 
				}
			}
		});
	},
	
    hdlDropListD: function(data, cat, tab)	{
		//alert("hdlDropListD: "+data.get("id"));
		var me=this,
			dl, p={ id:data.get("id") };
		if (tab=="tk_pl")	{
			dl=new rcm.model.GridPMIn(p);
		}
		else if (tab=="tk_ol")	{
			dl=new rcm.model.GridOPIn(p);
		}
		else if (tab=="tk_md")	{
			dl=new rcm.model.GridModeIn(p);
		}
		dl.destroy();
	},
    hdlDropListC: function(data, cat, tab)	{
		var me=this,
			dl,
			p={ eqcat:cat,list:data.get("id") };
		//alert("tab: "+tab+",cat: "+cat+", data: "+data.get("id"));

		if (tab=="tk_pl")	{
			dl=new rcm.model.GridPMIn(p);
		}
		else if (tab=="tk_ol")	{
			dl=new rcm.model.GridOPIn(p);
		}
		else if (tab=="tk_md")	{
			dl=new rcm.model.GridModeIn(p);
		}
		else if (tab=="tk_eq")	{
			
		}
		dl.save();
		//console.log("listeners GridL 3");
	},
    
    hdlCatHir: function(id,tab)	{
		var me=this;
		//alert("hdlCatHir: "+id+" "+tab);
		me.getGridKfEquipStore().load({ params: {cat:id} });
		//me.getGridKfEquipStore().clearFilter(true);
		//me.getGridKfEquipStore().filter('durasi',id);
		if (tab=="tk_pl")	{
			me.getGridPMInStore().load({ params: {cat:id} });
			me.getGridPMnInStore().load({ params: {cat:id} });
		}
		else if (tab=="tk_ol")	{
			me.getGridOPInStore().load({ params: {cat:id} });
			me.getGridOPnInStore().load({ params: {cat:id} });
		}
		else if (tab=="tk_md")	{
			me.getGridModeInStore().load({ params: {cat:id} });
			me.getGridModenInStore().load({ params: {cat:id} });
		}
		else if (tab=="tk_eq")	{
			me.getGridEqcInStore().load({ params: {cat:id} });
			//me.getGridModenInStore().load({ params: {cat:id} });
		}
	},
	
	tambahLokasi : function(){
		console.log('tambah lokasi');
	},
	
	tblNewLokasi : function(){
		// alert('buat lokasi baru');
		this.addTreeHirarki();
	
	},
	tblDelLokasi : function(){
		// alert('delete Lokasi');
		this.addTreeHirarki(true);
	},
	
	tblNCatPM: function()	{
		this.treeCat('idkPM');
	},
	tblNCatOP: function()	{
		this.treeCat('idkOP');
	},
	tblNCatMd: function()	{
		this.treeCat('idkMd');
	},
	tblNCatEq: function()	{
		this.treeCat('idkEq');
	},
	
	hdlCatHirEq: function()		{
		//alert("hdlCatHirEq");
	},
	
	saveNCatH: function()	{
		rcmSettings.qwer = ch;
		var me = this,
			wc = me.getTWCatHir(),
			form = wc.down('form').getForm(),
			winEl = wc.getEl();

		if(!form.isValid()) {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors');
            return;
		}
		console.log("idCatH: "+form.findField('idCatH').getValue());
		//return;
		var ch = Ext.getCmp(form.findField('idCatH').getValue()),
			selModel = ch.getSelectionModel(),
            selList = selModel.getSelection()[0];
		winEl.mask('menyimpan');
		//console.log(form.findField('wcNama').getValue()+" "+form.findField('wcKode').getValue());

		var newList = Ext.create('rcm.model.CatHir', {
			text: form.findField('wcNama').getValue(),
			leaf: true,
			tipe: form.findField('wcKode').getValue(),
			ket: form.findField('wcKet').getValue(),
			// level : selectedList.data.depth,
			loaded: true // set loaded to true, so the tree won't try to dynamically load children for this node when expanded
		});
		wc.close();
		selList.appendChild(newList);
		var hirStore = me.getCatHirStore();
		hirStore.sync();
		hirStore.reload();
		
		var expandAndEdit = function() {
			if(selList.isExpanded()) {
				selModel.select(newList);
				me.addedNode = newList;
				//ce.startEdit(newList, 0);
			} else {
				ch.on('afteritemexpand', function startEdit(list) {
					if(list === parentList) {
						selModel.select(newList);
						me.addedNode = newList;
						// console.log(newList);
						//ce.startEdit(newList, 0);
						// remove the afterexpand event listener
						ch.un('afteritemexpand', startEdit);
					}
				});
				selList.expand();
			}
		};
		
		if(ch.getView().isVisible(true)) {
            expandAndEdit();
        } else {
            ch.on('expand', function onExpand() {
                expandAndEdit();
                ch.un('expand', onExpand);
            });
            ch.expand();
        }
		
		winEl.unmask();

	},
	
	tblNewCat: function()	{
		//console.log("tblNewCat");
		this.treeCat(true);
	},
	tblDelCat: function()	{
		this.treeCat(true);
	},
	hdlDelCatHir: function(rec)	{
		//console.log("Hapus id: "+rec.get('id')+", nama: "+rec.get('text'));
		//console.log(e);
		var me=this;
		Ext.MessageBox.show({
			title : 'Hapus Kategori',
			msg   : "Yakin Kategori \""+rec.get('text')+"\" akan diHapus ??",
			buttons: Ext.MessageBox.OKCANCEL,
			//icon  : Ext.MessageBox.WARNING,
			fn	: function (oks){
				if (oks === 'ok'){ 
					dl=new rcm.model.CatHir({ id:rec.get('id') });
					dl.destroy({
						success : function(del, op){
							//alert('sukses');
							me.getLokUnitStore().reload();
							//me.getCatHirStore().load();
							me.getGridEqcInStore().reload();
							me.getGridEqnInStore().load();
						},
						failure: function(task, op)	{
							var error = op.getError(),
								msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

							Ext.MessageBox.show({
								title: 'Hapus Kategori Gagal',
								msg: msg,
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			}
		});
		
		
	},
	
	treeCat: function(id)	{
		//console.log("id: "+id);
		var me = this,
            hTree = Ext.getCmp(id);
		//console.log(hTree);
            
		//ce = hTree.ce,
		var selModel = hTree.getSelectionModel(),
            selList = selModel.getSelection()[0],
			//parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList; //if leaf, then selecetd parent id, else select id
			parentList = selList;

		var wHir = me.getTWCatHir();
		wHir.setTitle('Form Tambah Kategori [Parent: '+selList.get('text')+']');
		wHir.down('form').getForm().reset();
		//Ext.getCmp('idCatH').setValue(selList.get('id'));
		Ext.getCmp('idCatH').setValue(id);

		wHir.show();
	},
	
	addTreeHirarki: function(leaf) {
        var me = this,
            hTree = me.getTreeHirarki(),
            cellEditingPlugin = hTree.cellEditingPlugin,
            selectionModel = hTree.getSelectionModel(),
            selectedList = selectionModel.getSelection()[0], //ambil id selected
            parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList, //if leaf, then selecetd parent id, else select id
            newList = Ext.create('rcm.model.LokUnit', {
				nama: 'New ' + (leaf ? 'Equipt' : 'FuncLoc'),
                leaf: leaf,
				// level : selectedList.data.depth,
                loaded: false // set loaded to true, so the tree won't try to dynamically load children for this node when expanded
            }),
			//*
            expandAndEdit = function() {
                if(parentList.isExpanded()) {
                    selectionModel.select(newList);
                    me.addedNode = newList;
                    cellEditingPlugin.startEdit(newList, 0);
                } else {
                    hTree.on('afteritemexpand', function startEdit(list) {
                        if(list === parentList) {
                            selectionModel.select(newList);
                            me.addedNode = newList;
							// console.log(newList);
                            cellEditingPlugin.startEdit(newList, 0);
                            // remove the afterexpand event listener
                            hTree.un('afteritemexpand', startEdit);
                        }
                    });
                    parentList.expand();
                }
            };
            //*/
		// console.log(selectionModel);
		// console.log('newlist : ');
		// console.log(newList);
		// console.log('list selected : ');
		console.log(selectedList);
		console.log(parentList);
		// alert ('dipilih parent dengan id '+ selectedList.raw.id + selectedList.raw.leaf );
		// alert ('dipilih parent dengan id '+ selectedList.raw.id + selectedList.raw.leaf );
		
        parentList.appendChild(newList);
        
		var hirarkiStore = me.getLokUnitStore();
		hirarkiStore.sync();
		hirarkiStore.reload();
		
		
		// hTree.getStore().sync();
        if(hTree.getView().isVisible(true)) {
            expandAndEdit();
        } else {
            hTree.on('expand', function onExpand() {
                expandAndEdit();
                hTree.un('expand', onExpand);
            });
            hTree.expand();
        }
		//*/
    },
	
	updateTreeHirarki: function(editor, e) {
		//console.log('updateTreeHirarki diedit');
        //*
		var me = this,
            list = e.record;
		//console.log(e.row);
		//console.log(e);
		//*
		list.save({
            success: function(list, operation) {
                // filter the task list by the currently selected list.  This is necessary for newly added lists
                // since this is the first point at which we have a primary key "id" from the server.
                // If we don't filter here then any new tasks that are added will not appear until the filter is triggered by a selection change.
                // me.filterTaskGrid(me.getTreeHirarki().getSelectionModel(), [list]);
                //alert("tes");
                me.getLokUnitStore().reload();
				me.getGridEqcInStore().reload();
				me.getGridEqnInStore().load();
            },
            failure: function(list, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update List Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
        
		//*/
    },

	
	handleDeleteIconClick: function(view, rowIndex, colIndex, column, e) {
        alert ('delete nya ketahuan di controller');
		console.log ('lagi ngeklik delete');
		// this.deleteList(view.getRecord(view.findTargetByEvent(e)));
    },
	
	updateList : function(editor, e){
		// console.log ('coba hirarki diupdate');
	},
	
	showActions: function(view, list, node, rowIndex, e) {
        // console.log(node);
        // console.log('icon showActions');
		var icons = Ext.DomQuery.select('.x-action-col-icon', node);
        // console.log(icons);
		Ext.each(icons, function(icon){
            Ext.get(icon).removeCls('x-hidden');
        });
		//*/
    },
	hideActions: function(view, list, node, rowIndex, e) {
		// console.log(node);
		// console.log('ikon hideActions');
		var icons = Ext.DomQuery.select('.x-action-col-icon', node);
		// console.log(icons);
        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    }
	
});
