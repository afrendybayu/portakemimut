// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.WOComp', {
    xtype: 'tWOComp',
	//extend: 'Ext.container.Container',
	extend: 'Ext.form.Panel',

	requires: [
		'rcm.view.laporan.WOManCP'
		,'rcm.view.laporan.GridWork'
		,'rcm.view.laporan.WOStack'
		,'rcm.view.laporan.WoPie'
		,'rcm.view.laporan.FilterThn'
	],
	//*
	dockedItems: [{
		dock: 'top',
		idThn: 'iThnCom',
		idbSr: 'srCom',
		xtype: 'tFThn'
	}],
	//*/
	
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
					xtype: 'tWoPie',
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
