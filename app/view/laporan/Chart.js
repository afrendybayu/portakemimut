/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.Chart', {
	extend: 'Ext.tab.Panel',

    xtype: 'tabChart',
	//alias: 'widget.tabChart',
    requires: [
		//'rcm.view.laporan.SapChartDet',
		 'rcm.view.laporan.EPO'
		,'rcm.view.laporan.WOComp'
		,'rcm.view.laporan.SapHistori'
		,'rcm.view.laporan.SapChartDet'
		,'rcm.view.laporan.SapCause'
		,'rcm.view.laporan.GridCauseInfo'
		,'rcm.view.laporan.ConMon'
		,'rcm.view.laporan.PanelSap'
		,'rcm.view.laporan.FilterSap'
        ,'rcm.view.laporan.WOComp'
        ,'rcm.view.laporan.OrderCostSap'
        ,'rcm.view.laporan.GridOrderC'
        ,'rcm.view.laporan.SapCostCont'
        ,'rcm.view.laporan.GridOverHaul'
		,'rcm.view.laporan.OverHaul'
        ,'rcm.view.laporan.FilterThn'
        ,'rcm.view.laporan.FilterThnTipe'
        ,'rcm.view.laporan.SapChartDet'
        ,'rcm.view.laporan.SapChartSaja'
		,'rcm.view.laporan.OverHaul'
		,'rcm.view.laporan.SapChartTop10'	
		
		//,'rcm.view.laporan.Jabatan'
		,'rcm.view.laporan.Input'	
    ],
    
    autoScroll: true,
    
	initComponent: function() {
		var me=this;
		me.items = [{
			/*
				title: 'Nama dan Jabatan',
				//iconCls: 'Reliability',
				xtype: 'tJabat',
				margin: '5 5'	
			},{
			//*/
				id: 'ts_oh',
				itemId: 'ts_oh',
				title: 'Preventive Maintenance',
				xtype:'pOverHaul'
			},{
				id: 'ts_mo',
				title: 'Maintenance Order',
				xtype:'tEPO'
			},{
				id: 'ts_wo',
				title: 'WO Compliance',
				//idThn: 'thnWoC',
				//idbSr: 'srWoC',
				xtype:'tWOComp'
			/*
			},{
				id: 'ts_hi',
				title: 'Condition Monitoring',
				xtype:'tConMon'
			//*/
			},{
				id: 'ts_pdm',
				title: 'Histori',
				xtype:'tpSapHistori',
				//xtype: 'tHistori',
				dstore: 'SapHistori'
			},{
				id: 'ts_oc',
				title: 'Order Cost',
				xtype: 'tpSapOCost'
			},{
				id: 'ts_tc',
				title: 'Top 10 Cost',
				xtype: 'tSapTop10',
				
				
				//xtype: 'tSapCh',
				dstore1: 'SapTop10',
				dstore2: 'SapTop10FL',
				idThn: 'thnTop10',
				idbSr: 'srTop10',
				jdl1: 'TOP 10 Orders Cost per Equipment',
				jdl2: 'TOP 10 Orders Cost per Function Location',
				param1: 'Equipment Cost',
				param2: 'Function Location Cost',
				yNama: 'Cost ($)',
				duit: 1
			},{
				id: 'ts_pm',
				title: 'PM Cost',
				//xtype: 'causechart',
				xtype: 'tSapCh',
				dstore: 'SapPMCost',
				idThn: 'thnPM',
				idbSr: 'srPM',
				jdl: 'PM Activity Planned Cost',
				param: 'PM Cost',
				yNama: 'Cost ($)',
				duit: 1
			},{
				id: 'ts_ct',
				title: 'Contract',
				xtype: 'tCostCont'
			},{
				id: 'ts_ca',
				idc: 'idcCau',
				title: 'Cause',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Cause Frequent',
				jdlTb: 'Tabel Cause Frequent',
				jdlDet: 'Info Detail Chart Cause Frequent',
				param: 'Cause',
				dstore: 'SapCause',
				dstoreD:'SapCauseInfo',
				idThn: 'thnCau',
				idTipe: 'tpCau',
				idbSr: 'srCau',
				btnFilter: 'cau'
			},{
				id: 'ts_da',
				idc: 'idcDam',
				title: 'Damage',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Damage Frequent',
				jdlTb: 'Tabel Damage Frequent',
				jdlDet: 'Info Detail Chart Damage Frequent',
				param: 'Damage',
				dstore: 'SapDamage',
				idThn: 'thnDam',
				idTipe: 'tpDam',
				idbSr: 'srDam',
				dstoreD:'SapDamageInfo',
				btnFilter: 'dam'
			},{
				id: 'ts_ob',
				idc: 'idcObp',
				title: 'Object Part',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Object Part Frequent',
				jdlTb: 'Tabel Object Part Frequent',
				jdlDet: 'Info Detail Chart Object Part Frequent',
				param: 'Object part',
				idThn: 'thnOpr',
				idTipe: 'tpOpr',
				idbSr: 'srOpr',
				dstore: 'SapOPart',
				dstoreD:'SapOPartInfo',
				btnFilter: 'opt'
			/*
			},{
				id: 'ts_sm',
				title: 'Symptom',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Symptom Frequent',
				jdlTb: 'Tabel Symptom Frequent',
				jdlDet: 'Info Detail Chart Symptom Frequent',
				param: 'Symptom',
				idThn: 'thnSym',
				idbSr: 'srSym',
				dstore: 'SapSymptom',
				dstoreD:'SapSymptomInfo',
				btnFilter: 'sym'
			//*/
			},{
				//id: '',
				itemId: 'ts_in',
				title: 'Input Laporan',
				hidden: true,
				xtype: 'sapinput'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		
		rcmSettings.tsp = this.getActiveTab().getId();
	},
	
	showInput: function(st)	{
		var t = this.child('#ts_in');
		//console.log('sampe sini showRelia');
		if (st==true)	{
			t.tab.show();
			//ts_oh
		}
		else {
			t.tab.hide();
			this.setActiveTab(this.child('#ts_oh'));
		}
	}
});
