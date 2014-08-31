/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.OrderCostSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapOCost',
	require: [
		//'rcm.view.laporan.FilterSap'
	],
	/*
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnH',
		idLok: 'iLokH',
		idWoT: 'iWoTH',
		idMtAc: 'iMtAcH',
		idbSr: 'btnCariSH',
		idbCl: 'btnClearSH',
		lThn: '<b>Pilih Waktu</b>',
		xtype: 'tFSap'
		
	}],
	//*/
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1,
		hideLabel: true
	},
	
	//*
	initComponent: function() {		
		var me=this;
		
		me.items= [{
			xtype: 'tGridOrderC',
			flex: 1,
			title: 'Order Costing (WO Type)'
		},{
			xtype: 'tGridOrderC',
			flex: 1,
			title: 'Order Costing (Object Type)'
		}];
		me.callParent(arguments);
		
	}
	//*/
});
