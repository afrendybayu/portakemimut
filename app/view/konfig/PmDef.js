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
        region	: 'center',     
        xtype	: 'panel',
		height	: '40%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'f_PmDef'
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
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
