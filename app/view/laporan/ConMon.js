// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.ConMon', {
    xtype: 'tConMon',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.GridConMon',
		'rcm.view.laporan.ConMonUnit'
		//'rcm.view.laporan.EPOPie'

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
			height: 120,
			//flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					html: ' ',
					flex: 2
				},{
					//html: '',
					xtype: 'tGridConMon',
					flex: 1
				},{
					html: ' ',
					flex: 2
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
				},{
					xtype: 'tEPOPie',
					flex: 1
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
				},{
					xtype: 'tEPOPie',
					flex: 1
			}]
		}]
	}]
});
