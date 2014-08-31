/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.OrderCostSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapOCost',
	require: [
		'rcm.view.laporan.GridOrderC'
	],

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
			xtype: 'tSapOrderC',
			flex: 1,
			dstore: 'SapOrderCwo',
			jdl: 'WO Type',
			title: 'Order Costing (WO Type)'
		},{
			xtype: 'tSapOrderC',
			flex: 1,
			jdl: 'Object Type',
			dstore: 'SapOrderCot',
			title: 'Order Costing (Object Type)'
		}];
		me.callParent(arguments);
		
	}
	//*/
});
