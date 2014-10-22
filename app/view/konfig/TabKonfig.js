/* Jono, 03Oct2014 */
Ext.define('rcm.view.konfig.TabKonfig', {
	extend: 'Ext.tab.Panel',

    xtype: 't_Konfig',
    requires: [
		'rcm.view.konfig.ConfHirarki'
		,'rcm.view.konfig.Aksi'

		,'rcm.view.konfig.PmDef'		

		,'rcm.view.konfig.Cause'

    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
			id: 'tk_ak',
			title: 'Aksi',
			xtype:'tAksi'
		},{
			id: 'tk_pl',
			title: 'PM List',
			xtype:'tpKonfigList',
			jdlKi: 'Pilih Jadwal PM',
			jdlKa: 'PM Tersedia',
			dstoreKi: 'GridPMIn',
			dstoreKa: 'GridPMnIn',
			jdlDet: 'List Equipment',
			jdlTb: 'List Kiri',
			jdlBtnD: 'Go to PM Definition',
			idBtnD: 'iGPmdef',
			dstoreD: 'GridKfEquip'
		},{
			id: 'tk_ol',
			title: 'Object Part List',
			xtype:'tpKonfigList',
			jdlKi: 'Pilih Object Part',
			jdlKa: 'Object Part Tersedia',
			dstoreKi: 'GridOPIn',
			dstoreKa: 'GridOPnIn',
			jdlDet: 'List Equipment',
			jdlTb: 'List Kiri',
			jdlBtnD: 'Go to Object Part Definition',
			idBtnD: 'iGOpdef',
			dstoreD: 'GridKfEquip'
		},{
			id: 'tk_pd',
			title: 'Preventive Maintenance',
			xtype:'tPmDef'
		},{
			id: 'ts_cause',
			title: 'Cause',
			xtype:'tCause'
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
