/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.OrderCostSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapOCost',
	require: [
		'rcm.view.laporan.GridOrderC'
		,'rcm.view.laporan.SapPie'
	],
	
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnOcost',
		idbSr: 'srOcost',
		xtype: 'tFThn'
	}],
	
	layout: 'border',

	//*
	initComponent: function() {		
		var me=this;
		
		me.items= [{
			xtype: 'panel',
			region: 'center',
			layout: { type: 'vbox',	align: 'stretch' },
			flex: 1,
			//border:0,
			items:[{
				xtype: 'panel',
				flex: 1,
				layout: { type: 'hbox', align: 'stretch' },
				items:[{
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
			},{
				xtype: 'panel',
				flex: 1,
				layout: { type: 'hbox', align: 'stretch' },
				items:[{
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
			}]
		},{
			region: 'west',
			minWidth: 500,
			title: 'Order Cost Table View',
			flex: 1,
			collapsed: true,
			collapsible: true,
			split: true,
			xtype: 'panel',
			layout: { type: 'vbox', align: 'stretch' },
			//border:0,
			items:[{
				xtype: 'tSapOrderC',
				flex: 1,
				jdl: 'WO Type',
				dstore: 'SapOrderCot',
				title: 'Order Costing (WO Type)'
			},{
				xtype: 'tSapOrderC',
				flex: 1,
				dstore: 'SapOrderCwo',
				jdl: 'Object Type',
				title: 'Order Costing (Object Type)'
			}]
		}];
		me.callParent(arguments);
	}
	//*/
});
