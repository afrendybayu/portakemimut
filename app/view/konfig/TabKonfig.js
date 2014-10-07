/* Jono, 03Oct2014 */
Ext.define('rcm.view.konfig.TabKonfig', {
	extend: 'Ext.tab.Panel',

    xtype: 't_Konfig',
    requires: [
		'rcm.view.konfig.ConfHirarki'
    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
				id: 'ts_hr',
				title: 'Lokasi',
				// xtype:'tOverHaul'
				xtype:'cHirarki'
			
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tsp = this.getActiveTab().getId();
	}
});
