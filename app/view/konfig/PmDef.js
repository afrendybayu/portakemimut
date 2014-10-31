Ext.define('rcm.view.konfig.PmDef', {
    extend: 'Ext.panel.Panel',
    xtype: 'tPmDef',
	
	requires: [
        'rcm.view.konfig.PmDefForm',
		'rcm.view.konfig.PmDefGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
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
			xtype 	: 'f_PmDef',
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Predictive Maintenance',
        region	: 'south',     
        xtype	: 'gridPmDef',
        height	: '60%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
	}]
	
	
});