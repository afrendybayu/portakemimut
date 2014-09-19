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
    ],
    
	initComponent: function() {
		var me=this;
		me.items = [{
				id: 'ts_hi',
				title: 'Condition Monitoring',
				xtype:'tConMon'
			//*/
			},{
				id: 'ts_oh',
				title: 'OverHaul',
				xtype:'tOverHaul'
			},{
				id: 'ts_mo',
				title: 'Maintenance Order',
				xtype:'tEPO'
			},{
				id: 'ts_wo',
				title: 'WO Compliance',
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
				xtype: 'causechart',
				dstore: 'SapTop10',
				jdl: 'TOp 10 Orders Cost per Equipment',
				param: 'Equipment Cost',
				yNama: 'Cost'
			},{
				id: 'ts_pm',
				title: 'PM Cost',
				xtype: 'causechart',
				dstore: 'SapPMCost',
				jdl: 'PM Activity Planned Cost',
				param: 'PM Cost',
				yNama: 'Cost'
			},{
				id: 'ts_ct',
				title: 'Contract',
				xtype: 'tCostCont'
			},{
				id: 'ts_ca',
				title: 'Cause',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Cause Frequent',
				jdlTb: 'Tabel Cause Frequent',
				jdlDet: 'Info Detail Chart Cause Frequent',
				param: 'Cause',
				dstore: 'SapCause',
				dstoreD:'SapCauseInfo',
				btnFilter: 'cau'
			},{
				id: 'ts_da',
				title: 'Damage',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Damage Frequent',
				jdlTb: 'Tabel Damage Frequent',
				jdlDet: 'Info Detail Chart Damage Frequent',
				param: 'Damage',
				dstore: 'SapDamage',
				dstoreD:'SapDamageInfo',
				btnFilter: 'dam'
			},{
				id: 'ts_ob',
				title: 'Object Part',
				xtype: 'tSapDet',
				jdlGr: 'Grafik Object Part Frequent',
				jdlTb: 'Tabel Object Part Frequent',
				jdlDet: 'Info Detail Chart Object Part Frequent',
				param: 'Object part',
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
				dstore: 'SapSymptom',
				dstoreD:'SapSymptomInfo',
				btnFilter: 'sym'
			//*/
			},{
				id: 'ts_in',
				title: 'Input Laporan',
				xtype: 'tUploadfile',
				margin: '10 10'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tsp = this.getActiveTab().getId();
	}
});
