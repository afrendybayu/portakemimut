Ext.define('rcm.view.konfig.Cause', {
    extend: 'Ext.panel.Panel',
    xtype: 'tCause',
	
	requires: [
        'rcm.view.konfig.CauseForm',
		'rcm.view.konfig.CauseDefGrid'
        
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
			xtype 	: 'fCause'
			// lnama:'Nama Cause',lkode:'Kode Cause',lket:'keterangan',lckbox:'Kategori',lckbox1:'Obama',lckbox2:'SAP',
			// nmnama:'nama',nmkode:'kode',nmket:'ket',nmckbox1:'obama',nmckbox2:'sap',
			// hidnama:false,hidkode:false,hidket:false,hidjab:true,hidckbox:false,hiduserid:true,hidpwd:true,hiddur:true
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Cause',
        region	: 'south',     
        xtype	: 'gridCauseDef',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		/*xstore		: 'Causes',
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
		hidegrid5	: false*/
		
		
	
	}]
	
	
});