Ext.define('rcm.view.konfig.User', {
    extend: 'Ext.panel.Panel',
    xtype: 'tUser',
	
	requires: [
        'rcm.view.konfig.UserForm',
		// 'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form User List1',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fUser',
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data User List',
        region	: 'south',     
        xtype	: 'gridAksi',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		xstore		: 'Users',
		kolgrid1	: 'Nama ',
		kolgrid2	: 'UserID',
		kolgrid3	: 'Level',
		// kolgrid4	: 'SAP',
		//kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'userid',
		idgrid3		: 'akses',
		// idgrid4		: 'sap',
		// idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid4	: true,
		hidegrid5	: true,
	
		
	
	}]
	
	
});