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

		,'laporan.ConMonForm'
		,'laporan.SapPie'
		,'laporan.GridContract'
		,'laporan.EPO'
		,'laporan.WOComp'

		,'laporan.OverHaulForm'
		,'laporan.ManOCost'
		,'laporan.Jabatan'
		
		,'laporan.SapHistori'
		,'laporan.WOStack'
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
		,'SapTipe','SapThn12','SapThn','SapMwc','SapOType','SapLoc'
		
		,'SapPsOCot','SapPsOCwo','SapPMCost','SapTop10','SapTop10FL'
		,'Contract','ContractLine', 'ContractInput'

		,'SapHistori'
		,'ManOCost','Jabat'
		
		,'GridConMon'
		,'ConMon','ConMonIn','CbParent','CbUnit','CbEquip','ConMonGr'
		,'DetConMonGr','DetConMonPmp','DetConMonGs'
		,'OhTahun','OverHaulIn','CatHirEq'

    ],
    
    models: [
		'ContractInput',
		'ConmonInput',
		'ConMonIn',
		'OverHaulIn',
		'ManOCost',
		'Jabat'
    ],
    
    refs: [{
			ref: 'tabChart',
			selector: 'tabChart'
		},{
			ref: 'tWOComp',
			selector: 'tWOComp'
		},{
			ref: 'tWOStack',
			selector: 'tWOStack'
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
			ref: 'tHistori',
			selector: 'tHistori'
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
		/*
		},{
			ref : 'pOverHaul',
			selector : 'pOverHaul'
		//*/
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
			'#srCM': {
				click: me.bFiltCM
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
			'#idGridCM': {
				recordedit: me.uConMon
			},
			'#idGridKontrak': {
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
			'#idDwOh' : {
				click : me.hdlDlOh
			},
			'#idSrOh': {
				click : me.hdlFiltThnOh
			},
			'#idUpOh': {
				click: me.hdlUplOh
			},
			'#idDwCm' : {
				click : me.hdlDlCm
			},
			'#idUpCm': {
				click: me.hdlUplCm
			},
			'#idSrCm': {
				click : me.hdlFiltThnCm
			},
			'#idbExcOh': {
				click: me.hdlExcOh
			},
			'#idbExcPOh': {
				click: me.hdlExcPOh
			},
			'#idbMoc': {
				click: me.hdlManOCost
			},
			'tManOCost numberfield': {
				change: me.hdlChThnMoc
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
			},
			'tJabat button[text=Simpan]' : {
				click: me.sRepOH
			}
			
		});
    },
    
    hdlExcOh: function(btn)	{
		var t=Ext.getCmp('idThnOh').getValue(),
			l=Ext.getCmp('idLokOh').getValue(),
			c=Ext.getCmp('idCatOh').getValue();
		var form = btn.up('form').getForm();
		if(form.isValid()){
			//alert("hdlExcOh "+t);
			//*
			form.submit({
				url: 'ci/index.php/sap/rOverHaul/rExcOH?t='+t+'&l='+l+'&c='+c
			});
			//*/
		}
	},
	
	hdlExcPOh: function(btn)	{
		var t=Ext.getCmp('idThnOh').getValue(),
			l=Ext.getCmp('idLokOh').getValue(),
			c=Ext.getCmp('idCatOh').getValue();
		var form = btn.up('form').getForm();
		if(form.isValid()){
			//alert("hdlExcOh "+t);
			//*
			form.submit({
				url: 'ci/index.php/sap/rOverHaul/rExcPOH?t='+t+'&l='+l+'&c='+c
			});
			//*/
		}
	},
    
    hdlChThnMoc: function(tf,newV,oldV)	{
		//alert('berubah '+newV);
		var me=this;
		this.getManOCostStore().load({ 
			params:{thn:newV},
			callback: function(rec, op, suc) {
				//console.log(rec);
				me.loadOCost(rec[0]);
			}
		});
	},
    
    hdlManOCost: function(btn)	{
		var t=Ext.getCmp('idThMoc').getValue(),
			b=Ext.getCmp('mbudg').getValue(),
			w=Ext.getCmp('mwo').getValue(),
			o=Ext.getCmp('motype').getValue();
		
		var rec = { thn:t, budget: b, wo:w, otype:o };
		var updMoC 	= Ext.create('rcm.model.ManOCost', rec ); 
		
		updMoC.save ({
			
		});
		
		//alert('jos'+t+' '+b+" "+w+" "+o);
	},
    
    loadOCost: function(rec)	{
		//rcmSettings.hhh = rec;
		Ext.getCmp('mbudg').setValue(rec.get('budget'));
		//Ext.getCmp('mwo').setValue(rec.get('wo')),
		//Ext.getCmp('motype').setValue(rec.get('otype'));
	},
	
	loadJabat: function(rec)	{
		// 'nPre','jPre','nRev','jRev','nApr','jApr'
		Ext.getCmp('nPrep').setValue(rec.get('nPre')),
		Ext.getCmp('jPrep').setValue(rec.get('jPre')),
		Ext.getCmp('nRevi').setValue(rec.get('nRev'));
		Ext.getCmp('jRevi').setValue(rec.get('jRev')),
		Ext.getCmp('nAppr').setValue(rec.get('nApr')),
		Ext.getCmp('jAppr').setValue(rec.get('jApr'));
	},
	
	sRepOH: function(btn)	{
		/*
		var form = btn.up('form').getForm();
		if(form.isValid()){
			form.submit({
				url: 'format_oh.xlsx'
			});
		}
		//*/
		var nP=Ext.getCmp('nPrep').getValue(),
			jP=Ext.getCmp('jPrep').getValue(),
			nR=Ext.getCmp('nRevi').getValue(),
			jR=Ext.getCmp('jRevi').getValue(),
			nA=Ext.getCmp('nAppr').getValue(),
			jA=Ext.getCmp('jAppr').getValue();
		
		//alert(nP+" "+jP);
		var rec = { nPre:nP, jPre:jP, nRev:nR, jRev:jR, nApr:nA, jApr:jA };
		//console.log(rec);
		var updRecOH = Ext.create('rcm.model.Jabat', rec ); 
		
		updRecOH.save ();
	},
    
    hdlDlOh: function(btn)	{
		var form = btn.up('form').getForm();
		if(form.isValid()){
			form.submit({
				url: 'format_oh.xlsx'
			});
		}
	},
	
	hdlDlCm: function(btn)	{
		var form = btn.up('form').getForm();
		if(form.isValid()){
			form.submit({
				url: 'format_conmon.xlsx'
			});
		}
	},
	
	hdlFiltThnCm: function()	{
		var t=Ext.getCmp('idThnCm').getValue();
		this.gridfilterTahun(t);
	},
	
	hdlFiltThnOh: function()	{
		//alert('hdlFiltThnOh: '+Ext.getCmp('idThnOh').getValue());
		var t=Ext.getCmp('idThnOh').getValue(),
			l=Ext.getCmp('idLokOh').getValue(),
			c=Ext.getCmp('idCatOh').getValue();
		//alert(l);
		this.getOverHaulInStore().load({ params:{thn:t,lok:l,cat:c} });
		this.getOhTahunStore().load({ params:{thn:t,lok:l,cat:c} });
	},
	
	hdlUplCm: function(btn)		{
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
		if(form.isValid()){
			alert('tes');
		}
	},
	
	hdlUplOh: function(btn)	{
		//alert("hdlUplOh");
		//
		var me = this;
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
		//console.log('form');
		if(form.isValid()){
			form.submit({
				url: 'ci/index.php/sap/rUpload/getUplOh',
				waitMsg: 'Uploading your file...',
				success: function(fp, o) {
					msg('Success', tpl.apply(o.result));
					me.hdlFiltThnOh();
				},
				falure: function(fp, o)	{
					Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
				}
			});
		}
		//this.hdlFiltThnOh();
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
		//console.log('pencet cobobox pilih lokasi : '+rec);
		var cbohunit = this.getCbUnitStore();
		cbohunit.clearFilter();
		cbohunit.filter('id_lokasi',rec);
	
	},
	cbedohplhunit : function(rec){
		//console.log('pencet cobobox pilih lokasi : '+rec);
		var cboheq = this.getCbEquipStore();
		cboheq.clearFilter();
		cboheq.filter('id_unit',rec);

		// this.getIOverHaul.idunit = record;
		var idunt = this.getIOverHaul();
		idunt.idunit = rec;
	},
	cbedohplhequip : function(unit,oh){
		//alert ('Equipmen dipilih dengan id : '+unit+' dengan idOh : '+oh);
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
			t=Ext.getCmp('idThnOh').getValue(),
		foh.id_unit = this.getTaskOverHaul().idunit;
		foh.id_equip = this.getTaskOverHaul().ideq;
		foh.oh = this.getTaskOverHaul().idoh;
		var ohsimp = Ext.create('rcm.model.OverHaulIn', foh);
		// console.log(foh);
		// rcmSettings.foh11111 = foh1;
		ohsimp.save({
			success: function(record, operation){
				//alert ('Data OH terSimpan');
				me.getOverHaulInStore().load({ params:{thn:t} });
				froh.reset();
				me.getOhTahunStore().load({ params:{thn:t} });
				
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
		//alert("Thn: "+Ext.getCmp('iThnCont').getValue());
		var t=Ext.getCmp('iThnCont').getValue();
		this.getTGridContract().thn = t;
		Ext.getCmp('grContL').setTitle("Trend Cost Center "+t);
		//Ext.getCmp('grContL').setSubTitle("Trend Cost Center "+t);
		this.getContractStore().load({params:{tgl:t}});
		this.getContractLineStore().load({params:{tgl:t}});
	},
	
	bFiltCau: function()	{
		//alert("Cause Thn: "+Ext.getCmp('thnCau').getValue());
		var t=Ext.getCmp('thnCau').getValue(),
			p=Ext.getCmp('tpCau').getValue(),
			x={thn:t, tp:p};
		this.getSapCauseInfoStore().clearFilter(true);
		this.getSapCauseStore().load({params:x});
		this.getSapCauseInfoStore().load({params:x});
		Ext.getCmp('idcCau').draw();
		rcmSettings.qwqwq = Ext.getCmp('idcCau');
	},
	
	bFiltDam: function()	{
		//alert("Damage Thn: "+Ext.getCmp('thnDam').getValue());
		var t=Ext.getCmp('thnDam').getValue(),
			p=Ext.getCmp('tpDam').getValue(),
			x={thn:t, tp:p};
		this.getSapDamageInfoStore().clearFilter(true);
		this.getSapDamageStore().load({params:x});
		this.getSapDamageInfoStore().load({params:x});
		Ext.getCmp('idcDam').draw();
	},
	
	bFiltOPart: function()	{
		//alert("OPart Thn: "+Ext.getCmp('thnOpr').getValue());
		var t=Ext.getCmp('thnOpr').getValue(),
			p=Ext.getCmp('tpOpr').getValue(),
			x={thn:t, tp:p};
		this.getSapOPartInfoStore().clearFilter(true);
		this.getSapOPartStore().load({params:x});
		this.getSapOPartInfoStore().load({params:x});
	},
	
	bFiltPM: function()	{
		//alert("PM Thn: "+Ext.getCmp('thnPM').getValue());
		this.getSapPMCostStore().load({ params:{thn:Ext.getCmp('thnPM').getValue()} });
	},
	bFiltCM: function()	{
		this.getGridConMonStore().load({ params:{thn:Ext.getCmp('iThnCM').getValue()} });
	},
	
	bFiltTop10: function()	{
		//alert("Top10 Thn: "+Ext.getCmp('thnTop10').getValue());
		var t=Ext.getCmp('thnTop10').getValue();
		this.getSapTop10Store().load({ params:{thn:t} });
		this.getSapTop10FLStore().load({ params:{thn:t} });
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
		//console.log(this.getTWOStack());
		this.getTWOStack().draw();
		//rcmSettings.dddddd = this.getTWOStack();
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
				// Ext.getCmp('wo3s7').setText(rec[0].get('teks'));
				Ext.fly('wo3s7').update(rec[0].get('teks'));
			}
		});
		me.getWoOpen30Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				// Ext.getCmp('wo7s30').setText(rec[0].get('teks'));
				Ext.fly('wo7s30').update(rec[0].get('teks'));
			}
		});
		me.getWoOpen60Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				//Ext.getCmp('wo30s60').setText(rec[0].get('teks'));
				Ext.fly('wo30s60').update(rec[0].get('teks'));
			}
		});
		me.getWoOpenL60Store().load({
			params: p,
			scope: this,
			callback: function(rec) {
				// Ext.getCmp('wo60').setText(rec[0].get('teks'));
				Ext.fly('wo60').update(rec[0].get('teks'));
			}
		});
		//*/
	},
	
	getDelayedStore2: function()	{
		var me=this;
		me.getSapCauseStore().load();
		me.getSapCauseInfoStore().load();
		me.getSapDamageStore().load();
		me.getSapDamageInfoStore().load();
		me.getSapOPartStore().load();
		me.getSapOPartInfoStore().load();
		
		//me.getSapSymptomInfoStore().load();
	},
	
	getDelayedStore: function()	{
		//console.log("Konfig getDelayedStore");
		var me=this;
		//*
		if (rcmSettings.cSap!=1)	{
			//console.log("Sap getDelayedStore");
			me.getSapEPOStore().load();
			me.getSapHistoriStore().load();
			
			me.getSapTop10Store().load();
			me.getSapTop10FLStore().load();
			me.getSapOrderCwoStore().load();
			me.getSapOrderCotStore().load();
			
			me.getContractStore().load();
			me.getContractLineStore().load();
			me.getSapPMCostStore().load();
			me.getSapTipeStore().load();
			me.getSapThnStore().load();
			me.getSapThn12Store().load();
			me.getSapMwcStore().load();
			me.getSapLocStore().load();
			me.getSapOTypeStore().load();
			
			me.getSapPsOCotStore().load();
			me.getSapPsOCwoStore().load();
			
			me.getConMonStore().load();
			me.getConMonGrStore().load();
			me.getGridConMonStore().load();
			me.getDetConMonGrStore().load();
			me.getDetConMonPmpStore().load();
			me.getDetConMonGsStore().load();
			/*
			me.getWoOpen7Store().load();
			me.getWoOpen30Store().load();
			me.getWoOpen60Store().load();
			me.getWoOpenL60Store().load();
			//*/
			me.getWoOpen7Store().load({
				scope: this,
				callback: function(rec) {
					//console.log(rec[0].get('teks'));
					if (rec)	Ext.getCmp('wo3s7').setText(rec[0].get('teks'));
					//Ext.fly('wo3s7').update(rec[0].get('teks'));
				}
			});
			me.getWoOpen30Store().load({
				scope: this,
				callback: function(rec) {
					if (rec)	Ext.getCmp('wo7s30').setText(rec[0].get('teks'));
					//Ext.fly('wo7s30').update(rec[0].get('teks'));
				}
			});
			me.getWoOpen60Store().load({
				scope: this,
				callback: function(rec) {
					if (rec)	Ext.getCmp('wo30s60').setText(rec[0].get('teks'));
					//Ext.fly('wo30s60').update(rec[0].get('teks'));
				}
			});
			me.getWoOpenL60Store().load({
				scope: this,
				callback: function(rec) {
					if (rec)	Ext.getCmp('wo60').setText(rec[0].get('teks'));
					//Ext.fly('wo60').update(rec[0].get('teks'));
				}
			});
			
				//*/
				me.getOhTahunStore().load();
				me.getOverHaulInStore().load();
				me.getCatHirEqStore().load();

				var task = new Ext.util.DelayedTask(function(){
					me.getDelayedStore2();
				});
				task.delay(rcmSettings.dlySapI*1000);
			}
		//*/
		/*
		'HoTeco','HoMan','HoOrderC'
		,'SapEPO'


		,'SapOrderCwo','SapOrderCot'
		,'SapThn','SapMwc','SapOType','SapLoc'
		
		,'SapPsOCot','SapPsOCwo','SapPMCost','SapTop10','SapTop10FL'
		,'Contract','ContractLine', 'ContractInput'

		,'SapHistori'
		,'ManOCost'
		
		,'GridConMon'
		,'ConMon','ConMonIn','CbParent','CbUnit','CbEquip','ConMonGr'
		,'DetConMonGr','DetConMonPmp','DetConMonGs'
		,'OhTahun','OverHaulIn'

		//*/
	},
	
	onLaunch: function() {
		//console.log("SAP onLaunch");
		var me=this;
		var task = new Ext.util.DelayedTask(function(){
			me.getDelayedStore();
		});
		task.delay(rcmSettings.dlySap*1000);
		//alert("tes");
		//me.ubahLabelWO();
		me.getManOCostStore().load({
			scope: this,
			callback: function(rec, op, suc) {
				//console.log(rec);
				this.loadOCost(rec[0]);
			}
		});
		me.getJabatStore().load({
			scope: this,
			callback: function(rec, op, suc) {
				//console.log(rec);
				this.loadJabat(rec[0]);
			}
		});
	},
	
	clrSapHist: function()	{
		this.getTFSap().resetFilter();
		this.getSapHistoriStore().load();
	},
	
	cariSapHist: function()	{
		//var o = this.getTFSap().sedotFilter();
		var o = this.getTpSapHistori().sedotFilter();
		this.getSapHistoriStore().load({params: {loc:o.iL,otp:o.iW,mwc:o.iM,tgl:o.iT }});
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
		Ext.getCmp('tSapHx').draw();
	},
	
	clrSapMaint: function()	{
		this.getTFSap().resetFilter();
		this.ubahLabelWO();
	},
	
	cariSapMaint: function()	{
		//var o = this.getTFSap().sedotFilter(),
		var m = this,
			o = m.getTEPO().sedotFilter(),
			p = { loc:o.iL,otp:o.iW,mwc:o.iM,thn:o.iT };
		//alert("o.L: "+o.iL+", oW: "+o.iW+", oM: "+o.iM+", oT: "+o.iT);
		m.ubahLabelWO(p);
		m.getSapEPOStore().load({ params:p });
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
	},
	
	hdUplBiaya: function(btn)	{
		
	},
	
	hdUplCM: function(btn)		{
		
	},
	
	ubahKontrak: function( e,nilai,bln,tipe,thn )	{
		var me=this,
			thn=Ext.getCmp('iThnCont').getValue(),
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
							var t=Ext.getCmp('iThnCont').getValue();
							//rcmSettings.yyyyyy = resp;
							//console.log("sukses: "+resp + ", id: "+resp[0].id);
							me.getContractStore().load({params:{tgl:t}});
							me.getContractLineStore().load({params:{tgl:t}});
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
	},
	
	uConMon: function( e,nilai,bln,tipe)	{
		var me=this,
			thn=Ext.getCmp('iThnCM').getValue(),
			cm=new rcm.model.ConmonInput({
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
			msg : 'Simpan Jml ConMon nilai awal '+e.originalValue+', menjadi '+nilai+' ?',
			//width : 300,
			buttons : Ext.MessageBox.OKCANCEL,
			//multiline : true,
			scope : this,
			fn : function(btn, reason, cfg){ 
				if (btn =='ok') {
					//alert('ok with text');
					cm.save({
						success: function(respon, operation) {
							var resp = operation.request.scope.reader.jsonData["conmon"];
							//var t=Ext.getCmp('iThnCont').getValue();
							//rcmSettings.yyyyyy = resp;
							//console.log("sukses: "+resp + ", id: "+resp[0].id);
							me.getGridConMonStore().load({params:{thn:thn}});
							me.getConMonStore().load();
							me.getConMonGrStore().load();
							me.getDetConMonGrStore().load();
							me.getDetConMonGsStore().load();
							me.getDetConMonPmpStore().load();
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
	},
	
	showResult: function(a)	{
		//console.log("tes: "+a);
	}
	
});
