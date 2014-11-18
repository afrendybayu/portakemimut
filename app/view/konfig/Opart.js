Ext.define('rcm.view.konfig.Opart', {
    extend: 'Ext.panel.Panel',
    xtype: 'tOpartDef',
	
	requires: [
        'rcm.view.konfig.OpartForm',
		'rcm.view.konfig.OpartGrid'
        
    ],
	
    layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Object Part',
        region	: 'east',     
        xtype	: 'fOpart',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Object Part',
        region	: 'center',     
        xtype	: 'gridOpart',
	
	}]
});