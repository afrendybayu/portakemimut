Ext.define('rcm.view.konfig.Symptom', {
    extend: 'Ext.panel.Panel',
    xtype: 'tSymptom',
	
	requires: [
        'rcm.view.konfig.SympForm',
		'rcm.view.konfig.SympGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Symptom',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fSymptom',
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Symptom',
        region	: 'south',     
        xtype	: 'gridSymptom',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		
		
		
	
	}]
	
	
});