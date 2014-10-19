Ext.define('rcm.view.konfig.PmDef', {
    extend: 'Ext.panel.Panel',
    xtype: 'tPmDef',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Predictive Maintenance',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fAksi',
			label1 : 'Nama PM',
			label2 : 'Kode PM',
			label3 : 'Durasi',
			label4 : 'Keterangan',
			
			fnama1	: 'nama',
			fnama2	: 'kode',
			fnama3	: 'durasi',
			fnama4	: 'ket',
			fhide1	: false,
			fhide2	: false,
			fhide3	: false,
			fhide4	: false,
			fhide5	: true
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Predictive Maintenance',
        region	: 'south',     
        xtype	: 'gridAksi',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'PMDefs',
		kolgrid1	: 'Nama PM',
		kolgrid2	: 'Kode PM',
		kolgrid3	: 'Durasi',
		kolgrid4	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'durasi',
		idgrid4		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid3	: false
		
		
	
	}]
	
	
});