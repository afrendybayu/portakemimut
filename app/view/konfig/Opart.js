Ext.define('rcm.view.konfig.Opart', {
    extend: 'Ext.panel.Panel',
    xtype: 'tOpartDef',
	
	requires: [
        'rcm.view.konfig.OpartForm',
		'rcm.view.konfig.OpartGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Object Part',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fOpart',
		}]
		
	},{
		title	: 'Data Object Part',
        region	: 'south',     
        xtype	: 'gridOpart',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
	
	}]
	
	
});