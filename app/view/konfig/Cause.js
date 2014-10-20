Ext.define('rcm.view.konfig.Cause', {
    extend: 'Ext.panel.Panel',
    xtype: 'tCause',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
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
			xtype 	: 'fAksi',
			label1 : 'Nama Cause',
			label2 : 'Kode Cause',
			label3 : 'Keterangan',
			label5 : 'Kategori',
			chklbl1 : 'Obama',
			chklbl2	: 'SAP',
			fnama1	: 'nama',
			fnama2	: 'kode',
			fnama3	: 'ket',
			chkname1 : 'chkobama',
			chkname2 : 'chksap',
			fhide1	: false,
			fhide2	: false,
			fhide3	: false,
			fhide4	: true,
			fhide5	: false
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Cause',
        region	: 'south',     
        xtype	: 'gridAksi',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'Causes',
		kolgrid1	: 'Nama Cause',
		kolgrid2	: 'Kode Cause',
		kolgrid3	: 'Obama',
		kolgrid4	: 'SAP',
		kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'obama',
		idgrid4		: 'sap',
		idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid4	: false,
		hidegrid5	: false
		
		
	
	}]
	
	
});