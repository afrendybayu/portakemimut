Ext.define('rcm.view.konfig.PmDef', {
    extend: 'Ext.panel.Panel',
    xtype: 'tPmDef',
	
	requires: [
        'rcm.view.konfig.AksiForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Perdictive Maintenance',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fAksi',
			label1 	: 'Nama PM',
			idx1	: 'nama',
			label2 	: 'Kode PM',
			idx2	: 'kode',
			label3 	: 'Durasi',
			idx3	: 'durasi',
			hide1	: false,
			hide2	: false,
			hide3	: false
			
		
		
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
		
		xstore		: 'PMDefs',
		kolgrid1	: 'Nama PM',
		kolgrid2	: 'Kode PM',
		kolgrid3	: 'Durasi',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'durasi',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false
		
		
	
	}]
	
	
});