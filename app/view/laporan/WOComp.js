// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.WOComp', {
    xtype: 'tWOComp',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.WOManCP',
		'rcm.view.laporan.GridWork',
		'rcm.view.laporan.WOStack'
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
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tHoPie',
					flex: 1,
					jdl: 'WO Compliance'
				},{
					xtype: 'tWOManCP',
					flex: 1,
					jdl: 'WO Compliance'
			}]
		},{
			xtype: 'panel',
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tWOStack',
					flex: 1,
					jdl: 'WO Compliance'
				},{
					//border: 0,
					xtype: 'tGridWork',
					flex: 1
			}]
		}]
	}]
});
