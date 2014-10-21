Ext.define('rcm.view.konfig.Aksi', {
    extend: 'Ext.panel.Panel',
    xtype: 'tAksi',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Aksi',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype : 'fAksi',
			lnama:'Nama Aksi',lket:'Keterangan',
			nmnama:'nama',nmket:'ket',
			hidnama:false,hidkode:true,hidket:false,hidjab:true,hidckbox:true,hiduserid:true,hidpwd:true,hiddur:true,
			blanknama:false,blankkode:true,blankjab:true,blankldur:true,blankket:false,blankuid:true,blankpwd:true,
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Aksi',
        region	: 'south',     
        xtype	: 'gridAksi',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'GridAksi',
		kolgrid1	: 'Nama Aksi',
		kolgrid2	: 'Keterangan',
		// kolgrid3	: '',
		idgrid1		: 'nama',
		idgrid2		: 'ket',
		// idgrid3		: '',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: true,
		hidegrid4	: true
	
	}]
	
	
});