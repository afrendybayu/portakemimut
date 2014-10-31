Ext.define('rcm.view.konfig.Refer', {
    extend: 'Ext.panel.Panel',
    xtype: 'tRefer',
	
	requires: [
        'rcm.view.konfig.ReferForm',
		'rcm.view.konfig.ReferGrid'
        
    ],
	
	layout	: {
		type : 'border'
		
	},
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Referensi',
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		// autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fRefer',
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
	},{
		title	: 'Data Failures',
        region	: 'south',     
        xtype	: 'gridRefer',
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true,
		
	
	}]
	
	
});