/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.PanelSap', {
    extend: 'Ext.panel.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapHistori',
	require: [
		'rcm.view.laporan.FilterSap'
	],
	//*
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
	//layout:'stretch',
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
		}];
		me.callParent(arguments);
		
	}
	//*/
});
