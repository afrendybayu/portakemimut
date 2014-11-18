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
<<<<<<< HEAD
        region	: 'center',     
        xtype	: 'panel',
		height	: '30%',
		layout	: 'fit',
		autoScroll: true,
		frame	: true,
		items	: [{
			xtype 	: 'fDamage'
			
			
		}]
		
        
		// collapsible: true,
		// collapsed	: true,
		// split	: true
=======
        region	: 'east',     
        xtype	: 'fDamage',
		minWidth: '420',
		collapsible	: true,
		split	: true

>>>>>>> jono
	},{
		title	: 'Data Damages',
        region	: 'center',     
        xtype	: 'gridDamage',
<<<<<<< HEAD
		html	: 'bawah',
        height	: '70%',
        collapsible	: true,
		// collapsed	: true,
		split	: true
		
		
		
		
	
	}]
	
	
});
=======
	
	}]
	
});
>>>>>>> jono
