/* Jono, 03Oct2014 */
Ext.define('rcm.view.konfig.TabKonfig', {
	extend: 'Ext.tab.Panel',

    xtype: 't_Konfig',
    requires: [
		'rcm.view.konfig.ConfHirarki'
		,'rcm.view.konfig.Aksi'
		,'rcm.view.konfig.PmDef'
		,'rcm.view.konfig.Cause'
		,'rcm.view.konfig.Damage'
		,'rcm.view.konfig.Failure'
    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
			id: 'ts_aksi',
			title: 'Aksi',
			xtype:'tAksi'
		},{
			id: 'ts_pmdef',
			title: 'Predictive Maint',
			xtype:'tPmDef'
		},{
			id: 'ts_cause',
			title: 'Cause',
			xtype:'tCause'
		},{
			id: 'ts_damage',
			title: 'Damage',
			xtype:'tDamage'
		},{
			id: 'ts_failure',
			title: 'Failure',
			xtype:'tFailure'
		},{
			id: 'ts_hr',
			title: 'Lokasi',
			xtype:'cHirarki'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tsp = this.getActiveTab().getId();
	}
});
