Ext.define('rcm.view.konfig.Opart', {
    extend: 'Ext.panel.Panel',
    xtype: 'tOpartDef',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Object Part',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fAksi',
			lnama:'Nama Object Part',lkode:'Kode Object Part',lckbox:'Kategori',lckbox1:'Obama',lckbox2:'SAP',
			nmnama:'nama',nmkode:'kode',nmckbox1:'obama',nmckbox2:'sap',
			hidnama:false,hidkode:false,hidket:true,hidjab:true,hidckbox:false,hiduserid:true,hidpwd:true,hiddur:true
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Object Part',
        region	: 'south',     
        xtype	: 'gridAksi',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'OpartDefs',
		kolgrid1	: 'Nama OPart',
		kolgrid2	: 'Kode OPart',
		kolgrid3	: 'Obama',
		kolgrid4	: 'SAP',
		//kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'obama',
		idgrid4		: 'sap',
		// idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid4	: false,
		hidegrid5	: true
		
		
	
	}]
	
	
});