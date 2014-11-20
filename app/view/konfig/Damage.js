Ext.define('rcm.view.konfig.Damage', {
    extend: 'Ext.panel.Panel',
    xtype: 'tDamage',
	
	requires: [
        'rcm.view.konfig.DamageForm',
		'rcm.view.konfig.DamageGrid'
        
    ],
	layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form Damages',
        region	: 'east',     
        xtype	: 'fDamage',
		minWidth: '420',
		collapsible	: true,
		split	: true
	},{
		title	: 'Data Damages',
        region	: 'center',     
        xtype	: 'gridDamage',
	
	}]
	
});

