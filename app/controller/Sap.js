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
		,'laporan.EPO'
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

		,'SapHistori'
		
		
		,'ConMon','ConMonIn','CbParent','CbUnit','ConMonGr'
		,'DetConMonGr','DetConMonPmp','DetConMonGs'
		,'OhTahun'

    ],
    
    models: [
		'ContractInput',
		'ConMonIn'
    ],
    
    refs: [{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'tFSap',
			selector: 'tFSap'
		},{
			ref: 'tEPO',
			selector: 'tEPO'
		},{
			ref: 'tpSapHistori',
			selector: 'tpSapHistori'
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
		},{
			ref : 'tGridConMon',
			selector : 'tGridConMon'
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
			
			'tGridContract': {
				recordedit: me.ubahKontrak
			},
			'#cb_parent':{

				select : me.pilihComboParent
			},
			'#cb_unit' : {
				select : me.pilihComboUnit
			},
			/*'#cb_unit1' : {
				plhUnit : me.cbplhunit
			},*/
			'taskConMon textfield': {
				specialkey: me.handlesimpan
			},
			'#clr_filter' : {
				click : me.hpsFilter
			},
			
			'iConMon':{
				// specialkey	: me.hdlupdate,
				updatecm	: me.updateFormCM,
				deleteconmon: me.ConMonDeleteClick,
				plhLokasi	: me.cbplhlokasi,
				plhUnit 	: me.cbplhunit
			},
			
			'tGridConMon'	: {
				'filterThConMon' : me.gridfilterTahun
			}
		});
    },
	
	hpsFilter : function(){
		// console.log ('hapus filter ');
		var filtercm = this.getConMonInStore();
		filtercm.clearFilter();
		// me.getConMonInStore().reload();
		
	},
	gridfilterTahun : function(thn){
		// console.log(thn);
		var sfcm = this.getConMonInStore();
		sfcm.clearFilter();
		// rcmSettings.getstore = sfcm;
		// console.log(sfcm.getFullYear(tgl));
		sfcm.filter('thn',thn);
		// me.getConMonInStore().reload();
		
	},
	
	updateFormCM : function(rec){
		
		// rcmSettings.aaaaa = rec;
		// console.log(rec);
		// console.log(idx);
		// console.log('tgl : '+rec.tgl+', unit : '+rec.unit+', wo : '+rec.wo);
		var me = this;
		var ucmon 	= Ext.create('rcm.model.ConMonIn', rec ); /*{ 
			id : idx, tgl : rec.tgl, unit : rec.unit, wo : rec.wo, sap : rec.sap, url : rec.url, pic : rec.pic, ket : rec.ket
		} *///);
		
		// var ucmon = Ext.create(this.getConMonInModel());
		
		ucmon.save ({
			success: function(ucmon, operation){
				// alert ('Data ConMon terSimpan');
				me.getConMonInStore().reload();
				
			}
		
		}); 
		
		
	},
	
	cbplhlokasi : function(combo){
		// console.log('isi nama lokasi: '+ combo);
		var cbunitst = this.getCbUnitStore();
		cbunitst.clearFilter();
		cbunitst.filter('id_lokasi',combo);
		Ext.getCmp('cb_unit1').clearValue();
		// console.log('ini id unitnya: '+Ext.getCmp('cb_unit1').get('id_unit'));
		
	},
	cbplhunit : function(record){
		// console.log (record);
		this.getIConMon().idunit = record;
		
		// var runit = record.getValue();
	},
	
	ConMonDeleteClick: function(del) {
        //this.deleteTask(this.getTasksStore().getAt(rowIndex));
		// console.log(del.data );
		// cmons.remove(rec);
		// cmons.sync;
		// cmons.reload();
		
		var me = this, record = del.data,
		dcmon 	= Ext.create('rcm.model.ConMonIn', record );
		dcmon.destroy ({
			success : function(dcmon, operation){
				// dcmon.destroy();
				me.getConMonInStore().reload();
				me.getConMonStore().reload();
			},
			callback : function(){
				
			}
		
		})
    },
	
	// ConMonEditClick: function(view, rowIndex, colIndex, column, e) {
	/*ConMonEditClick: function(rec, e) {
        // this.showEditWindow(view.getRecord(view.findTargetByEvent(e)));
		// console.log('edit ro ini '+this.getConMonInStore().getAt(rowIndex).data.id);
		
		// rcmSettings.aaaaa = rec;
		// rcmSettings.bbbbb = e;
		var idlok = rec.get('id');
		var me = this, fcmon = Ext.getCmp('cmform').getForm();
		// console.log(' -> '+idlok );
		fcmon.findField('tgl').setValue(rec.get('tgl'));
		fcmon.findField('lokasi').setValue(rec.get('lokasi'));
		fcmon.findField('unit').setValue(rec.get('unit'));
		fcmon.findField('wo').setValue(rec.get('wo'));
		fcmon.findField('sap').setValue(rec.get('sap'));
		fcmon.findField('url').setValue(rec.get('url'));
		fcmon.findField('pic').setValue(rec.get('pic'));
		fcmon.findField('ket').setValue(rec.get('ket'));
		
		
		
	
	},
	*/
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
	
	
	
	handlesimpan: function(field,e){  
		
		if(e.getKey()=== e.ENTER){
			if (Ext.getCmp('cmform').getForm().isValid()){
				this.simpanconmon();
			}
		}
	},
		
	simpanconmon : function(){
		
		var me = this,
			form = me.getTaskConMon(),
            basicForm = form.getForm(),
            formEl = form.getEl(),
			cmon 	= Ext.create('rcm.model.ConMonIn');
			// console.log(tgl.getValue()+'->'+lokasi.getValue()+'->'+unit.getValue());
			basicForm.updateRecord(cmon);
		
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
		
		// console.log(lokasi);	
		combounit.clearFilter();
		combounit.filter('id_lokasi',lokasi);
		Ext.getCmp('cb_unit').clearValue();
		// Ext.getCmp('cb_unit1').clearValue();
		
		// Ext.getCmp('cb_type').clearValue();
		
	},
	pilihComboUnit : function(records){
		var unit = records.getValue();
		// console.log(unit);
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
		//var o = this.getTFSap().sedotFilter();
		var o = this.getTpSapHistori().sedotFilter();
		//rcmSettings.ttt = o;
		this.getSapHistoriStore().load({params: {loc:o.iL,otp:o.iW,mwc:o.iM,tgl:o.iT }});
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
	},
	
	clrSapMaint: function()	{
		this.getTFSap().resetFilter();
		this.ubahLabelWO();
	},
	
	cariSapMaint: function()	{
		//var o = this.getTFSap().sedotFilter(),
		var o = this.getTEPO().sedotFilter(),
			p = { loc:o.iL,otp:o.iW,mwc:o.iM,taw:o.iTw,tak:o.iTk };
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
		this.ubahLabelWO(p);
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
