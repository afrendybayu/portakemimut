Ext.define('rcm.view.konfig.Aksi', {
    extend: 'Ext.panel.Panel',
    xtype: 'tAksi',
	
	requires: [
        'rcm.view.konfig.AksiFForm',
		'rcm.view.konfig.AksiGrid'
        
    ],
	
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Aksi',
<<<<<<< HEAD
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype : 'fAksi'
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
=======
        region	: 'east',     
        xtype	: 'f_Aksi',
		minWidth: '420',
		collapsible	: true,
		split	: true

>>>>>>> jono
	},{
		title	: 'Data Aksi',
        region	: 'center',     
        xtype	: 'gridAksi',
	
	}]
	
	
});
