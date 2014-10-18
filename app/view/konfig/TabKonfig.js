/* Jono, 03Oct2014 */
Ext.define('rcm.view.konfig.TabKonfig', {
	extend: 'Ext.tab.Panel',

    xtype: 't_Konfig',
    requires: [
		'rcm.view.konfig.ConfHirarki'
		,'rcm.view.konfig.Aksi'
		,'rcm.view.konfig.PmDef'
		
    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
			id: 'ts_list',
			title: 'PM List',
			xtype:'tpKonfigList',
			jdlKi: 'Pilih jadwal PM',
			jdlKa: 'PM Tersedia',
			dstoreKi: 'GridPMIn',
			dstoreKa: 'GridPMnIn',
			jdlDet: 'List Equipment',
			jdlTb: 'List Kiri',
			dstoreD: 'GridKfEquip'
		},{
			id: 'ts_aksi',
			title: 'Aksi',
			xtype:'tAksi'
		},{
			id: 'ts_pmdef',
			title: 'Predictive Maint',
			xtype:'tPmDef'
		},{
			id: 'ts_aksi_',
			title: 'pmdef',
			xtype:'panel'
		},{
			id: 'ts_hr',
			title: 'Lokasi',
			xtype:'cHirarki'
		}];

		me.callParent(arguments);
		this.on('tabchange', me.handleSapTab, this);
	},
	handleSapTab: function()	{
		rcmSettings.tkf = this.getActiveTab().getId();
	}
});
