Ext.define('rcm.view.konfig.PmDef', {
    extend: 'Ext.panel.Panel',
    xtype: 'tPmDef',
	
	requires: [
        'rcm.view.konfig.PmDefForm',
		'rcm.view.konfig.PmDefGrid'
        
    ],
	
    layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Predictive Maintenance',
        region	: 'east',     
        xtype	: 'f_PmDef',
		minWidth: '420',
		collapsible	: true,
		split	: true
	},{
		title	: 'Data Predictive Maintenance',
        region	: 'center',     
        xtype	: 'gridPmDef',
	
	}]
	
	
});
