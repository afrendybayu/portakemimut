// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.EPO', {
    xtype: 'tEPO',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.EPOCol'
		,'rcm.view.laporan.EPOPie'
	//	,'rcm.view.laporan.SpeedoSap'
	//	'rcm.view.laporan.WOStack'
	],
	
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
					text: 'Jml: 3449, %-to-Total: 84.83 %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo7s30',
					cls: 'cTextAlign',
					text: 'Jml: 255, %-to-Total: 6.27 %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo30s60',
					cls: 'cTextAlign',
					text: 'Jml: 56, %-to-Total: 1.38 %'
				},{
					flex: 1,
					xtype: 'label',
					id: 'wo60',
					cls: 'cTextAlign',
					text: 'Jml: 306, %-to-Total: 7.52 %'
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
	}]
});
