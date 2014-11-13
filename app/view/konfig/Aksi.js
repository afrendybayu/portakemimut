Ext.define('rcm.view.konfig.Aksi', {
    extend: 'Ext.panel.Panel',
    xtype: 'tAksi',
	
	requires: [
        'rcm.view.konfig.AksiFForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Aksi',
        region	: 'east',     
        xtype	: 'f_Aksi',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Aksi',
        region	: 'center',     
        xtype	: 'gridAksi',
	
	}]
	
	
});
