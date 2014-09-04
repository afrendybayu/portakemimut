/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.OrderCostSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapOCost',
	require: [
		'rcm.view.laporan.GridOrderC'
		,'rcm.view.laporan.SapPie'
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
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			border:0,
			items:[{
				xtype: 'tSapOrderC',
				flex: 2,
				dstore: 'SapOrderCwo',
				jdl: 'WO Type',
				title: 'Order Costing (WO Type)'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tPlCost',
				jdl: 'Order Costing Planned Cost',
				dsat: '%',
				dstore: 'SapPsOCwo'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tAcCost',
				jdl: 'Order Costing Actual Cost',
				dsat: '%',
				dstore: 'SapPsOCwo'
			}]
		},{
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			border:0,
			items:[{
				xtype: 'tSapOrderC',
				flex: 2,
				jdl: 'Object Type',
				dstore: 'SapOrderCot',
				title: 'Order Costing (Object Type)'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tPlCost',
				jdl: 'Order Costing Planned Cost',
				dsat: '%',
				dstore: 'SapPsOCot'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tAcCost',
				jdl: 'Order Costing Actual Cost',
				dsat: '%',
				dstore: 'SapPsOCot'
			}]
		}];
		me.callParent(arguments);
		
	}
	//*/
});
