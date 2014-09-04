/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.PanelSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapHistori',
	require: [
		'rcm.view.laporan.FilterSap'
	],
	
	layout: {
		type: 'fit',
		align: 'stretch'
	},
	
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

	defaults: {
		flex: 1,
		hideLabel: true
	},
	
	//*
	initComponent: function() {		
		var me=this;
		
		me.items= [{
			//iconCls: 'Reliability',
			xtype: 'tHistori',
			//flex: 1,
			dstore: me.dstore
		/*
		},{
			xtype: 'label'
		//*/
		}];
		me.callParent(arguments);
		
	}
	//*/
});
