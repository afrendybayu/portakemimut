/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapCostCont', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.panel.Panel',
	xtype: 'tCostCont',
	
	requires: [
		 'rcm.view.laporan.GridContract'
        ,'rcm.view.laporan.SapContractLine'
	],
	
	layout: {
		//type: 'vbox',
		type: 'fit',
		align: 'stretch'
	},
	
	dockedItems: [{
		xtype: 'tGridContract',
		dstore: 'SapPMCost'
	}],
    
	initComponent: function() {
		var me=this;
		me.items = [{
		/*
			title: 'Contract',
			xtype: 'tGridContract',
			dstore: 'SapPMCost'
		},{
		//*/
			title: 'ContractL',
			xtype: 'tContractL'
		}];
		me.callParent(arguments);
	}
});
