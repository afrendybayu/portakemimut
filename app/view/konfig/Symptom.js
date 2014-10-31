Ext.define('rcm.view.konfig.Symptom', {
    extend: 'Ext.panel.Panel',
    xtype: 'tSymptom',
	
	requires: [
        // 'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
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
		
		xstore		: 'Symptoms',
		kolgrid1	: 'Nama Symptom',
		kolgrid2	: 'Kode Symptom',
		// kolgrid3	: 'Keterangan',
		// kolgrid4	: 'SAP',
		// kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		// idgrid3		: 'ket',
		// idgrid4		: 'sap',
		// idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: true,
		hidegrid4	: true,
		hidegrid5	: true
		
		
	
	}]
	
	
});