// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.EPO', {
    xtype: 'tEPO',
	//extend: 'Ext.container.Container',
	extend: 'Ext.form.Panel',

	requires: [
		'rcm.view.laporan.EPOCol'
		,'rcm.view.laporan.EPOPie'
		,'rcm.view.laporan.FilterSap'
	],
	
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnM',
		idLok: 'iLokM',
		idWoT: 'iWoTM',
		idMtAc: 'iMtAcM',
		idbSr: 'btnCariSM',
		idbCl: 'btnClearSM',
		lThn: '<b>Tahun</b>',
		xtype: 'tFSap'
	}],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1,
		hideLabel: true
	},

    items: [{
		xtype: 'container',
		layout: {
			type: 'vbox',
			align: 'stretch'
        },
		items:[{
			xtype: 'panel',
			//flex: 1,
			height: 150,
			layout: {				
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tSapSpeedo',
					subjdl: "WO's Open/In Progress",
					flex: 1,
					jdl: '3 <= n < 7 hari',
					dstore: 'WoOpen7'
				},{
					xtype: 'tSapSpeedo',
					subjdl: "WO's Open/In Progress",
					flex: 1,
					jdl: '7 <= n < 30 hari',
					dstore: 'WoOpen30'
				},{
					xtype: 'tSapSpeedo',
					subjdl: "WO's Open/In Progress",
					flex: 1,
					jdl: '30 <= n < 60 hari',
					dstore: 'WoOpen60'
				},{
					xtype: 'tSapSpeedo',
					subjdl: "WO's Open/In Progress",
					flex: 1,
					jdl: 'n >= 60 hari',
					dstore: 'WoOpenL60'
			}]
		},{
			xtype: 'panel',
			//flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					flex: 1,
					xtype: 'label',
					id: 'wo3s7',
					cls: 'cTextAlign',
					text: 'Jml: x, %-to-Total: y %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo7s30',
					cls: 'cTextAlign',
					text: 'Jml: x, %-to-Total: y %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo30s60',
					cls: 'cTextAlign',
					text: 'Jml: x, %-to-Total: y %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo60',
					cls: 'cTextAlign',
					text: 'Jml: x, %-to-Total: y %'
			}]
		},{
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tEPOCol',
					flex: 1,
					jdl: 'Work Order Number'
				},{
					xtype: 'tEPOPie',
					flex: 1
			}]
		}]
	}],

	sedotFilter: function()	{
		var o = {},
			me = this;
		o.iW = Ext.getCmp('iWoTM').getValue();
		o.iM = Ext.getCmp('iMtAcM').getValue();
		o.iT = Ext.getCmp('iThnM').getValue();
		o.iL = Ext.getCmp('iLokM').getSubmitValue();
		//rcmSettings.gggg = o;
		return o;
	}

});
