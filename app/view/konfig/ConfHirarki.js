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
		idKfHir: me.idKfHir,
        region: 'west',     
        xtype: 'treeHirarki',
        width: 400,
        hideCat: true,
        collapsible: true,
		// collapsed	: true,
		split: true
	},{
		title : 'Form Hirarki dan Equipment',
		region : 'center',
		xtype : 'panLokasi'
	
	}]
})
