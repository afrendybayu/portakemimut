Ext.define('rcm.view.konfig.Symptom', {
    extend: 'Ext.panel.Panel',
    xtype: 'tSymptom',
	
	requires: [
        'rcm.view.konfig.AksiForm',
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
			xtype 	: 'fAksi',
			label1 : 'Nama Symptom',
			label2 : 'Kode Symptom',
			// label3 : 'Keterangan',
			// label5 : 'Kategori',
			// chklbl1 : 'Obama',
			// chklbl2	: 'SAP',
			fnama1	: 'nama',
			fnama2	: 'kode',
			// fnama3	: 'ket',
			// chkname1 : 'chkobama',
			// chkname2 : 'chksap',
			fhide1	: false,
			fhide2	: false,
			fhide3	: true,
			fhide4	: true,
			fhide5	: true
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Symptom',
        region	: 'south',     
        xtype	: 'gridAksi',
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