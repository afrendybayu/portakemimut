
Ext.define('rcm.view.nav.AppHeader', {
	extend: 'Ext.container.Container',
	//extend: 'Ext.Component',
	xtype: 'appHeader',
	requires : ['rcm.view.login.LogoutInfo',
				'rcm.view.login.LoginAuth'
				],
	
	layout: 'hbox',
	//dock: 'top',
	//bodyStyle: "background:url('modul/image/front_image.png') no-repeat;  padding:10px;",
	items: [{
			xtype: 'component',
			autoEl: {
				tag: 'h2'
			},
			html: document.title,
			flex: 1
		}, {
			
			xtype : 'authlogin',
			//title : 'login'
		},{
			xtype : 'authlogout',
			hidden : true
		}]
});
