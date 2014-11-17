Ext.define('rcm.view.konfig.User', {
    extend: 'Ext.panel.Panel',
    xtype: 'tUser',
	
	requires: [
        'rcm.view.konfig.UserForm',
		'rcm.view.konfig.UserGGrid'
        
    ],

    layout	: 'border',
	defaults: {autoScroll: true},
	
	items : [{
		title	: 'Form User List',
        region	: 'east',     
        xtype	: 'f_User',
		minWidth: '420',
		collapsible	: true,
		split	: true

	},{
		title	: 'Data User List',
        region	: 'center',     
        xtype	: 'gridUserList',
	
	}]
	
	
});