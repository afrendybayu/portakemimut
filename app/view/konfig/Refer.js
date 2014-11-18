Ext.define('rcm.view.konfig.Refer', {
    extend: 'Ext.panel.Panel',
    xtype: 'tRefer',
	
	requires: [
        'rcm.view.konfig.ReferForm',
		'rcm.view.konfig.ReferGrid'
        
    ],
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Referensi',
        region	: 'east',     
        xtype	: 'fRefer',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Referensi',
        region	: 'center',     
        xtype	: 'gridRefer',
	
	}]

});