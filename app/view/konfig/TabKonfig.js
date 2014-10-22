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
		,'rcm.view.konfig.Refer'
		,'rcm.view.konfig.Symptom'
		,'rcm.view.konfig.Opart'
		,'rcm.view.konfig.User'

    ],
    
	initComponent: function() {
		var me=this;
		
		me.items = [{
			id: 'tk_ak',
			title: 'Aksi Def.',
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
			id: 'tk_md',
			title: 'Mode List',
			xtype:'tpKonfigList',
			jdlKi: 'Pilih Mode',
			jdlKa: 'Mode Tersedia',
			dstoreKi: 'GridModeIn',
			dstoreKa: 'GridModenIn',
			jdlDet: 'List Equipment',
			jdlTb: 'List Kiri',
			jdlBtnD: 'Go to Mode Definition',
			idBtnD: 'iGMddef',
			dstoreD: 'GridKfEquip'
		},{
			id: 'tk_pd',
			title: 'Pd. Maintenance Def.',
			xtype:'tPmDef'
		},{
			id: 'ts_cause',
			title: 'Cause Def.',
			xtype:'tCause'
		},{
			id: 'ts_damage',
			title: 'Damage Def.',
			xtype:'tDamage'
		},{
			id: 'ts_failure',
			title: 'Failure Mode Def.',
			xtype:'tFailure'
		},{
			id: 'ts_refer',
			title: 'Referensi Def.',
			xtype:'tRefer'
		},{
			id: 'ts_symptom',
			title: 'Symptom Def.',
			xtype:'tSymptom'
		},{
			id: 'ts_opart',
			title: 'Object Part Def.',
			xtype:'tOpartDef'
		},{
			id: 'ts_user',
			title: 'User List Def.',
			xtype:'tUser'
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
