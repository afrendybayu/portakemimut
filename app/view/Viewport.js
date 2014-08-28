Ext.define('rcm.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
        'rcm.view.nav.Tanggalan',
        'rcm.view.nav.Navigation',
        'rcm.view.nav.AppHeader',
		'rcm.view.Content'
    ],

	/*
    layout: {
        type: 'fit'
    },
    //*/
    layout: 'border',
    
    items: [{
	//*
		region: 'north',
        xtype: 'appHeader'
    }, {
		region: 'center',
		xtype: 'content'
	//*
	}, {
		id: 'idwest',
		region: 'west',
		title: 'South Sumatera Extension',
		//icon: 'modul/icons/bullets.png',
		iconCls: 'bullets',
		width: 210,
		minWidth:210,
		//collapsed : true,
		collapsible: true,
		split: true,
		layout: {
            type: 'border'
        },

		items: [{
			region: 'center',
			xtype: 'taskNav',
			align: 'stretch',
			flex: 1
		}, {
			align: 'stretch',
			region: 'south',
			xtype: 'tanggalan',
			height: 200
		}]
	//*/
    }]
});
