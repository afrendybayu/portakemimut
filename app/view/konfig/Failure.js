Ext.define('rcm.view.konfig.Failure', {
    extend: 'Ext.panel.Panel',
    xtype: 'tFailure',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
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
			xtype 	: 'fAksi',
			lnama:'Nama Failure',lkode:'Kode Failure',lket:'Keterangan',
			nmnama:'nama',nmkode:'kode',nmket:'ket',
			hidnama:false,hidkode:false,hidket:false,hidjab:true,hidckbox:true,hiduserid:true,hidpwd:true,hiddur:true
			
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
		
		xstore		: 'ModeDefs',
		kolgrid1	: 'Nama Failure',
		kolgrid2	: 'Kode Failure',
		kolgrid3	: 'Keterangan',
		// kolgrid4	: 'SAP',
		// kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'ket',
		// idgrid4		: 'sap',
		// idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid4	: true,
		hidegrid5	: true
		
		
	
	}]
	
	
});