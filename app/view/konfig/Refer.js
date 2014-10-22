Ext.define('rcm.view.konfig.Refer', {
    extend: 'Ext.panel.Panel',
    xtype: 'tRefer',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Referensi',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fAksi',
			lnama:'Nama Referensi',lkode:'Kode Referensi',
			nmnama:'nama',nmkode:'kode',
			hidnama:false,hidkode:false,hidket:true,hidjab:true,hidckbox:true,hiduserid:true,hidpwd:true,hiddur:true
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Failures',
        region	: 'south',     
        xtype	: 'gridAksi',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'Refers',
		kolgrid1	: 'Nama Referensi',
		kolgrid2	: 'Kode Refrensi',
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