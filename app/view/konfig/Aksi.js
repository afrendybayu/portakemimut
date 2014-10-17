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
	
	items : [{
		title	: 'Form Aksi',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		frame	: true,
		items	: [{
			xtype : 'fAksi',
			label1 : 'Nama Aksi',
			label2 : 'Kode Aksi',
			label3 : 'Keterangan'
			
		
		
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
		split	: true
	
	}]
	
	
});