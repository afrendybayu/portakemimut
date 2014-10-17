/* Jono, 03Oct2014 */
Ext.define('rcm.view.konfig.TabKonfig', {
	extend: 'Ext.tab.Panel',

    xtype: 't_Konfig',
    requires: [
		'rcm.view.konfig.ConfHirarki'
		,'rcm.view.konfig.Aksi'
    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
			id: 'ts_aksi',
			title: 'Aksi',
			xtype:'tAksi'
		},{
			id: 'ts_hr',
			title: 'Lokasi',
			xtype:'cHirarki'
		},{
			id: 'ts_aksi_',
			title: 'pmdef',
			xtype:'panel'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tsp = this.getActiveTab().getId();
	}
});
