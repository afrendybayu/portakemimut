/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapCostCont', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.panel.Panel',
	xtype: 'tCostCont',
	
	requires: [
		 'rcm.view.laporan.GridContract'
        ,'rcm.view.laporan.SapContractLine'
        ,'rcm.view.laporan.FilterThnNo'
	],
	
	layout: 'border',
	
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnCont',
		idbSr: 'srCont',
		xtype: 'tFThnNo'
	}],
    
	initComponent: function() {
		var me=this;
		me.items = [{
			id: 'idGridKontrak',
			xtype: 'tGridContract',
			dstore: 'SapPMCost',
			region: 'north',
			duit: true,
			dstore: 'Contract',
			minHeight: 155,
			tot: true,
			split: true
		},{
		//*/
			id: 'grContL',
			region: 'center',
			title: 'ContractL',
			xtype: 'tContractL'
		}];
		me.callParent(arguments);
	}
});
