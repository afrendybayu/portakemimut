Ext.define('rcm.view.konfig.Failure', {
    extend: 'Ext.panel.Panel',
    xtype: 'tFailure',
	
	requires: [
        'rcm.view.konfig.FailureForm',
		'rcm.view.konfig.FailureGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Failures',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fFailure'
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Failures',
        region	: 'south',     
        xtype	: 'gridFailure',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true
		
		
		
		
	
	}]
	
	
});
