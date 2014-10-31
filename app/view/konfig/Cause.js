Ext.define('rcm.view.konfig.Cause', {
    extend: 'Ext.panel.Panel',
    xtype: 'tCause',
	
	requires: [
        'rcm.view.konfig.CauseForm',
		'rcm.view.konfig.CauseDefGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form cause',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fCause'
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Cause',
        region	: 'south',     
        xtype	: 'gridCauseDef',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		
	
	}]
	
	
});