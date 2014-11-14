Ext.define('rcm.view.konfig.Symptom', {
    extend: 'Ext.panel.Panel',
    xtype: 'tSymptom',
	
	requires: [
        'rcm.view.konfig.SympForm',
		'rcm.view.konfig.SympGrid'
        
    ],
	
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Symptom',
        region	: 'east',     
        xtype	: 'fSymptom',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data Symptom',
        region	: 'center',     
        xtype	: 'gridSymptom',
	
	}]

	
});