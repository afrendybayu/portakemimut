Ext.define('rcm.view.konfig.Cause', {
    extend: 'Ext.panel.Panel',
    xtype: 'tCause',
	
	requires: [
        'rcm.view.konfig.CauseForm',
		'rcm.view.konfig.CauseDefGrid'
        
    ],

    layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Cause',
        region	: 'east',     
        xtype	: 'f_Aksi',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Aksi',
        region	: 'center',     
        xtype	: 'gridCauseDef',
	
	}]
	
	
});
