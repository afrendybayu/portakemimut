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
		,'laporan.WOComp'
		//,'laporan.FilterThn'
		,'laporan.OverHaulForm'
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
		
		
		,'ConMon','ConMonIn','CbParent','CbUnit','CbEquip','ConMonGr'
		,'DetConMonGr','DetConMonPmp','DetConMonGs'
		,'OhTahun','OverHaulIn'

    ],
    
    models: [
		'ContractInput',
		'ConMonIn',
		'OverHaulIn'
    ],
    
    refs: [{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'tWOComp',
			selector: 'tWOComp'
		},{
			ref: 'causechart',
			selector: 'causechart'
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
			ref : 'iOverHaul',
			selector : 'iOverHaul'
		},{
			ref : 'tGridConMon',
			selector : 'tGridConMon'
		},{
			ref : 'taskOverHaul',
			selector : 'taskOverHaul'
	}],
    
    init: function() {
		var me = this;
        me.control({
			//*
			'taskGridCause': {
				sapFilter: me.grafikFilter,
				clrChartCause: me.grafikCauseClear
			},
			'causechart':	{
				sapFilter: me.grafikFilter
			},
			'#srCom': {
				click: me.bFiltWoC
			},
			'#srCont': {
				click: me.bFiltCont
			},
			'#srCau': {
				click: me.bFiltCau
			},
			'#srDam': {
				click: me.bFiltDam
			},
			'#srOpr': {
				click: me.bFiltOPart
			},
			'#srPM': {
				click: me.bFiltPM
			},
			'#srTop10': {
				click: me.bFiltTop10
			},
			'#srOcost': {
				click: me.bFiltOCost
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
			'#ConMonSave' : {
				click : me.tblsimpanConMon
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

			'taskConMon textfield': {
				specialkey: me.handlesimpan
			},
			'#clr_filter' : {
				click : me.hpsFilter
			},
			'#OverHaulSave' : {
				click : me.hdlSimpanOh
			},
			
			'iConMon':{
				// specialkey	: me.hdlupdate,
				updatecm	: me.updateFormCM,
				deleteconmon: me.ConMonDeleteClick,
				plhLokasi	: me.cbplhlokasi,
				plhUnit 	: me.cbplhunit,
				specialkey	: me.entersaveOH
			},
			'iOverHaul' :{
				deleteOverHaul 	: me.ohDelete,
				edohplhlokasi	: me.cbedohplhlokasi,
				edohplhunit		: me.cbedohplhunit,
				edohplheq		: me.cbedohplhequip,
				updateoh		: me.updateGridOH
				
			},
			'tGridConMon'	: {
				'filterThConMon' : me.gridfilterTahun
			},
			'taskOverHaul' :{
				ohplhlokasi 	: me.cbohplhlokasi,
				ohplhunit		: me.cbohplhunit,
				ohplheq			: me.cbohplhequip
				
			}
			
		});
    },
	updateGridOH : function(record){
		// console.log(record);
		var me = this;
		var updOH 	= Ext.create('rcm.model.OverHaulIn', record ); 
		
		updOH.save ({
			success: function(updOH, operation){
				// alert ('Update OverHaul terSimpan');
				me.getOverHaulInStore().reload();
				me.getOhTahunStore().reload();
				
			}
		
		}); 
		
	},
	cbedohplhlokasi: function(rec){
		console.log('pencet cobobox pilih lokasi : '+rec);
		var cbohunit = this.getCbUnitStore();
		cbohunit.clearFilter();
		cbohunit.filter('id_lokasi',rec);
	
	},
	cbedohplhunit : function(rec){
		console.log('pencet cobobox pilih lokasi : '+rec);
		var cboheq = this.getCbEquipStore();
		cboheq.clearFilter();
		cboheq.filter('id_unit',rec);

		// this.getIOverHaul.idunit = record;
		var idunt = this.getIOverHaul();
		idunt.idunit = rec;
	},
	cbedohplhequip : function(unit,oh){
		alert ('Equipmen dipilih dengan id : '+unit+' dengan idOh : '+oh);
		var eqpOH = this.getIOverHaul();
		eqpOH.ideq = unit; eqpOH.idoh = oh; 
	},
	
	ohDelete	: function(isi){
		// console.log(isi);
		// alert('Tak delete yoh');
		var me = this, record = isi.data,
		doh 	= Ext.create('rcm.model.OverHaulIn', record );
		Ext.MessageBox.show({
				title : 'Hapus OverHaul',
				msg   : 'Yakin Data Akan di Hapus??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						doh.destroy ({
							success : function(dcmon, operation){
								me.getOverHaulInStore().reload();
								me.getOhTahunStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
		});
	},
	entersaveOH : function(field,e){  
		
		if(e.getKey()=== e.ENTER){
			//alert('enter dari form OH');
			
			if (get.isValid()){
				this.simpanOHform();
			}
		}
	
	},
	
	hdlSimpanOh : function(){
		// alert('klik tombol simpan OH');
		this.simpanOHform();
	},
	
	simpanOHform : function(){
		// alert('klik tombol simpan OH masukin isi form');
		
		var me = this,
			froh = me.getTaskOverHaul().getForm(),
			foh = me.getTaskOverHaul().getForm().getValues(); 
		foh.id_unit = this.getTaskOverHaul().idunit;
		foh.id_equip = this.getTaskOverHaul().ideq;
		foh.oh = this.getTaskOverHaul().idoh;
		var ohsimp = Ext.create('rcm.model.OverHaulIn', foh);
		// console.log(foh);
		// rcmSettings.foh11111 = foh1;
		ohsimp.save({
			success: function(record, operation){
				//alert ('Data OH terSimpan');
				me.getOverHaulInStore().reload();
				froh.reset();
				me.getOhTahunStore().reload();
				
			}
			
		});
	
	},
	
	cbohplhequip : function(unit,oh){
		// alert ('Equipmen dipilih dengan id : '+rec);
		var eqp = this.getTaskOverHaul();
		eqp.ideq = unit; eqp.idoh = oh; 
	},
	
	cbohplhunit : function(rec){
		// console.log('pencet cobobox pilih lokasi : '+rec);
		var cboheq = this.getCbEquipStore();
		cboheq.clearFilter();
		cboheq.filter('id_unit',rec);
		
		
		// this.getTaskOverHaul.idunit = record;
		var idunt = this.getTaskOverHaul();
		idunt.idunit = rec;
		
	
	},
	
	cbohplhlokasi: function(rec){
		// console.log('pencet cobobox pilih lokasi : '+rec);
		var cbohunit = this.getCbUnitStore();
		cbohunit.clearFilter();
		cbohunit.filter('id_lokasi',rec);
	
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
		//alert ('delete isi conmon');
		var me = this, record = del.data,
		dcmon 	= Ext.create('rcm.model.ConMonIn', record );
		Ext.MessageBox.show({
				title : 'Hapus Condition Monitoring',
				msg   : 'Yakin Data Akan di Hapus??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						dcmon.destroy ({
							success : function(dcmon, operation){
								// dcmon.destroy();
								me.getConMonInStore().reload();
								me.getConMonStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
    },
	
    editInputConMon: function(task){
		var me = this,
		taskEditConMonForm = me.getTaskConMon();
		// form =  taskEditConMonForm.down('form').getForm(),
		//console.log(task);
		Ext.getCmp('cb_parent').setValue(task.data.lokasi);
		taskEditConMonForm.down('form').loadRecord(task);
		// taskEditConMonForm.getForm().loadRecord(task);
		// this.getDetail().getForm().loadRecord(records[0]);
	},
	
	tblsimpanConMon : function(){
		// console.log ('pencet tombol simpan');
		this.simpanconmon();
	},
	
	handlesimpan: function(field,e){  
		
		if(e.getKey()=== e.ENTER){
			if (Ext.getCmp('cmform').getForm().isValid()){
				this.simpanconmon();
			}
		}
	},
	
	bFiltCont: function()	{
		alert("Thn: "+Ext.getCmp('iThnCont').getValue());
		var t=Ext.getCmp('iThnCont').getValue();
		this.getContractStore().load({params:{tgl:t}});
		this.getContractLineStore().load({params:{tgl:t}});
	},
	
	bFiltCau: function()	{
		//alert("Cause Thn: "+Ext.getCmp('thnCau').getValue());
		var t=Ext.getCmp('thnCau').getValue();
		this.getSapCauseInfoStore().clearFilter(true);
		this.getSapCauseStore().load({params:{thn:t}});
		this.getSapCauseInfoStore().load({params:{thn:t}});
	},
	
	bFiltDam: function()	{
		//alert("Damage Thn: "+Ext.getCmp('thnDam').getValue());
		var t=Ext.getCmp('thnDam').getValue();
		this.getSapDamageInfoStore().clearFilter(true);
		this.getSapDamageStore().load({params:{thn:t}});
		this.getSapDamageInfoStore().load({params:{thn:t}});
	},
	
	bFiltOPart: function()	{
		//alert("OPart Thn: "+Ext.getCmp('thnOpr').getValue());
		var t=Ext.getCmp('thnOpr').getValue();
		this.getSapOPartInfoStore().clearFilter(true);
		this.getSapOPartStore().load({params:{thn:t}});
		this.getSapOPartInfoStore().load({params:{thn:t}});
	},
	
	bFiltPM: function()	{
		//alert("PM Thn: "+Ext.getCmp('thnPM').getValue());
		this.getSapPMCostStore().load({ params:{thn:Ext.getCmp('thnPM').getValue()} });
	},
	
	bFiltTop10: function()	{
		//alert("Top10 Thn: "+Ext.getCmp('thnTop10').getValue());
		this.getSapTop10Store().load({ params:{thn:Ext.getCmp('thnTop10').getValue()} });
	},
	
	bFiltOCost: function()	{
		//alert("OrderCost Thn: "+Ext.getCmp('iThnOcost').getValue());
		var m=this,
			t=Ext.getCmp('iThnOcost').getValue();
		m.getSapOrderCwoStore().load({ params:{thn:t} });
		m.getSapOrderCotStore().load({ params:{thn:t} });
		m.getSapPsOCotStore().load({ params:{thn:t} });
		m.getSapPsOCwoStore().load({ params:{thn:t} });
	},
	
	bFiltWoC: function()	{
		//alert("WoC Thn: "+Ext.getCmp('iThnCom').getValue());
		var t=Ext.getCmp('iThnCom').getValue();
		this.getHoTecoStore().load({ params:{thn:t} });
		this.getHoManStore().load({ params:{thn:t} });
		
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
		var m = this,
			o = m.getTEPO().sedotFilter(),
			//p = { loc:o.iL,otp:o.iW,mwc:o.iM,taw:o.iTw,tak:o.iTk };
			p = { loc:o.iL,otp:o.iW,mwc:o.iM,thn:o.iT };
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
		m.ubahLabelWO(p);
		m.getSapEPOStore().load({ params: {thn:o.iT} });
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
	/*
	grafikFilterx: function(a,b)	{
		//alert("grafikFilterx a: "+a+", b: "+b);
	},
	//*/
	grafikFilter: function(n, d)	{
		if (n==null)	return;
		var me=this;

		//alert(n);
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
		//console.log("tes: "+a);
	}
	
});
