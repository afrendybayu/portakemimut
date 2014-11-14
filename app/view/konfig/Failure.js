Ext.define('rcm.view.konfig.Failure', {
    extend: 'Ext.panel.Panel',
    xtype: 'tFailure',
	
	requires: [
        'rcm.view.konfig.FailureForm',
		'rcm.view.konfig.FailureGrid'
        
    ],
	
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Failures',
        region	: 'east',     
        xtype	: 'fFailure',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Failures',
        region	: 'center',     
        xtype	: 'gridFailure',
	
	}]
	
});