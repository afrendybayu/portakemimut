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
		
		
		
		
	
	}]
	
	
});