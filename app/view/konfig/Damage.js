Ext.define('rcm.view.konfig.Damage', {
    extend: 'Ext.panel.Panel',
    xtype: 'tDamage',
	
	requires: [
        'rcm.view.konfig.DamageForm',
		'rcm.view.konfig.DamageGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Damages',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fDamage',
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Damages',
        region	: 'south',     
        xtype	: 'gridDamage',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
		/*xstore		: 'Damages',
		kolgrid1	: 'Nama Damage',
		kolgrid2	: 'Kode Damage',
		// kolgrid3	: 'Obama',
		// kolgrid4	: 'SAP',
		// kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		// idgrid3		: 'obama',
		// idgrid4		: 'sap',
		// idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: true,
		hidegrid4	: true,
		hidegrid5	: true*/
		
		
	
	}]
	
	
});