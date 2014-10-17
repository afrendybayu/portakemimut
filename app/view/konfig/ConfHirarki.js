//* Jono, 01Oct2014 *//
Ext.define('rcm.view.konfig.ConfHirarki', {
    xtype: 'cHirarki',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.konfig.TreeHirarki',
		'rcm.view.konfig.DetailLokasi'

	],
	layout: 'border',
	
	items : [{
		title: 'Konfigurasi Hirarki',
        region: 'west',     
        xtype: 'treeHirarki',
        width: 200,
        collapsible: true,
		// collapsed	: true,
		split: true
	},{
		title : 'satu',
		region : 'center',
		xtype : 'panLokasi'
	
	}]
})