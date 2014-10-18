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
			label1 : 'Nama Aksi',
			label2 : 'Keterangan Aksi',
			idx1	: 'nama',
			idx2	: 'ket',
			hide1	: false,
			hide2	: false,
			hide3	: true
			
		
		
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Predictive Maintenance',
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
		hidegrid3	: true
	
	}]
	
	
});