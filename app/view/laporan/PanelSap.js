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
		xtype: 'tFSap',
		dstr: 'SapThn12',
		dval: '12 Bulan'
	}],

	defaults: {
		flex: 1,
		hideLabel: true
	},

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
		
	},
	
	sedotFilter: function()	{
		var o = {},
			me = this;
		o.iW = Ext.getCmp('iWoTH').getValue();
		o.iM = Ext.getCmp('iMtAcH').getValue();
		o.iT = Ext.getCmp('iThnH').getValue();
		o.iL = Ext.getCmp('iLokH').getSubmitValue();
		//rcmSettings.gggg = o;
		return o;
	}
});
