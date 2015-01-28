/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapCostCont', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.panel.Panel',
	xtype: 'tCostCont',
	
	requires: [
		 'rcm.view.laporan.GridContract'
        ,'rcm.view.laporan.SapContractLine'
        ,'rcm.view.laporan.FilterThnNo'
        //,'rcm.view.laporan.SapAcdCont'
        ,'rcm.view.laporan.ContractInput'
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
			region: 'center',
			duit: true,
			dstore: 'Contract',
			minHeight: 80,
			tot: true,
			split: true
		},{
			
		/*
			region: 'south',
			//title: 'tes',
			//xtype: 'tAcdCont',
			//html: 'ess',
			flex: 1
		//*/
		//*
			id: 'grContL',
			flex: 2,
			region: 'south',
			title: 'ContractL',
			xtype: 'tContractL'
		//*/
		},{
			//id: 'grContLx',
			title: 'Input Kontrak',
			region: 'south',
			flex: 1,
			collapsible: true,
			split: true,
			xtype: 'iContx'
			//xtype: 'tContractL'
		//*/
		}];
		me.callParent(arguments);
	}
});
