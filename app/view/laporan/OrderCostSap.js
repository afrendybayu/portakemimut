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
	
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnOcost',
		idbSr: 'srOcost',
		xtype: 'tFThn'
	}],
	
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
				jdl: 'Object Type',
				title: 'Order Costing (Object Type)'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tPlCost',
				jdl: 'Order Costing Planned Cost',
				dsat: '%',
				dstore: 'SapPsOCwo',
				subjdl: 'Object Type'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tAcCost',
				jdl: 'Order Costing Actual Cost',
				dsat: '%',
				dstore: 'SapPsOCwo',
				subjdl: 'Object Type'
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
				title: 'Order Costing (WO Type)'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tPlCost',
				jdl: 'Order Costing Planned Cost',
				dsat: '%',
				dstore: 'SapPsOCot',
				subjdl: 'Work Order Type'
			},{
				xtype: 'tSapPie',
				flex: 1,
				field: 'tAcCost',
				jdl: 'Order Costing Actual Cost',
				dsat: '%',
				dstore: 'SapPsOCot',
				subjdl: 'Work Order Type'
			}]
		}];
		me.callParent(arguments);
	}
	//*/
});
