// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.utama.HoChart', {
    xtype: 'tHoChart',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.utama.GridOrderC'
		,'rcm.view.utama.GridWO'
		,'rcm.view.utama.HoPie'
		,'rcm.view.utama.HoSpeedo'
		//,'rcm.view.utama.HoHistori'
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
			height: 140,
			xtype: 'tHoSpeedo'
		},{
			iconCls: 'accept',
			title: 'WO Compliance',
			xtype: 'panel',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'tGridWO',
				//text: 'label HoChart',
				flex: 3
			},{
				xtype: 'tHoPie',
				flex: 4,
				jdl: 'WO Compliance'
			},{
				dstore: 'SapHistoriUt',
				xtype: 'tHistori',
				flex: 6,
				jdl: 'Histori'
			}],
			flex: 5
		},{
			iconCls: 'dollar',
			xtype: 'tGridOrderC',
			flex: 4,
			title: 'Order Costing'
		}]
	}]
});