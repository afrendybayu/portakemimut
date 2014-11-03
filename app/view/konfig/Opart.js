Ext.define('rcm.view.konfig.Opart', {
    extend: 'Ext.panel.Panel',
    xtype: 'tOpartDef',
	
	requires: [
        'rcm.view.konfig.OpartForm',
		'rcm.view.konfig.OpartGrid'
        
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
			xtype 	: 'fOpart',
			// lnama:'Nama Object Part',lkode:'Kode Object Part',lckbox:'Kategori',lckbox1:'Obama',lckbox2:'SAP',
			// nmnama:'nama',nmkode:'kode',nmckbox1:'obama',nmckbox2:'sap',
			// hidnama:false,hidkode:false,hidket:true,hidjab:true,hidckbox:false,hiduserid:true,hidpwd:true,hiddur:true
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Object Part',
        region	: 'south',     
        xtype	: 'gridOpart',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
	
	}]
	
	
});