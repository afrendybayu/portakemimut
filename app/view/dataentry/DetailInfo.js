/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.DetailInfo', {
	extend: 'Ext.panel.Panel',
	//alias: 'widget.detailInfo',
	xtype: 'detailInfo',
	
	require: [
		'rcm.view.dataentry.PropGrid'
		,'rcm.view.dataentry.InfoFMEA'
	],
	
	layout: 'border',
	items: [{
			region: 'west',
			width: '28%',
			xtype: 'propgrid',
			weight: 100
		}, {
			title: 'Failure List',
			collapsible: true,
			collapsed: true,
			id: 'idinfofmea',
			title: 'Unit Failure List',
			region: 'center',
			flex: 1,
			xtype: 'infofmea'
		},{
			split: true,
			id: 'htmleddet',
			title: 'Note',
			//width: 600,
			region: 'south',
			//xtype: 'htmleditor',
			xtype: 'textarea',
			flex: 1
	}]
});
