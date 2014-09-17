// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.laporan.FilterSap', {
    extend: 'Ext.form.Panel',
	xtype: 'tFSap',
	require: [
	//	'Ext.form.TextField'
	],

	initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'form',
			padding: '5 20 5 10',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',
			/*
			layout: {
				type: 'border',
				padding: 5
			},
			//*/
			items: [{
					//id:  'iThnH',
					id: me.idThn,
					xtype: 'combo',
					submitFormat: 'Y',
					emptyText: 'Tahun '+rcm.view.Util.U1th(''),
					valueField: 'thn',
					value: rcm.view.Util.U1th(''),
					//fieldLabel: '<b>Pilih Waktu</b>',
					fieldLabel: me.lThn,
					queryMode: 'local',
					store: 'SapThn',
					displayField: 'thn',
					width: 180,
					labelWidth: 80,
					format: 'Y',
					margin: '0 10 0 0'
				},{
					//id:  'iLokH',
					id: me.idLok,
					xtype: 'combo',	
					store: 'SapLoc',
					labelWidth: 50,
					value: 'ALL',
					queryMode: 'local',
					displayField: 'nama',
					valueField: 'id',
					fieldLabel: '<b>Lokasi</b>',
					margin: '0 10 0 0'
				},{
					//id:  'iWoTH',
					id: me.idWoT,
					xtype: 'combo',
					labelWidth: 60,
					width: 140,
					fieldLabel: '<b>WO Type</b>',
					//emptyText: 'ALL',
					value: 'ALL',
					queryMode: 'local',
					store: 'SapOType',
					displayField: 'otype',
					margin: '0 10 0 0'
				},{
					//id:  'iMtAcH',
					id: me.idMtAc,
					xtype: 'combo',
					queryMode: 'local',
					store: 'SapMwc',
					width: 240,
					value: 'ALL',
					//emptyText: 'ALL',
					displayField: 'mwc',
					labelWidth: 140,
					fieldLabel: '<b>Maintenance Activity</b>',
					margin: '0 10 0 0'
				},{
					//id: 'btnCariSH',
					id: me.idbSr,
					xtype: 'button',
					width: 100,
					text: 'Filter',
					margin: '2 0 0 0'
				},{
					xtype: 'label',
					flex: 1,
					text: ''
				},{
					//id: 'btnClearSH',
					id: me.idbCl,
					xtype: 'button',
					width: 100,
					//flex: 1,
					text: 'Clear',
					margin: '2 0 0 0'
			}]
		}];

		me.listeners = {
			//*
			'select': {
				fn: function(dp, dt){
					alert("BlnGagal.js select");
					//this.fireEvent('klikKalender', dt);
				}
				//scope: this
			}
			//*/
		};
		me.callParent();
	},
	
	resetFilter: function()	{
		var me = this;
		Ext.getCmp(me.idWoT).setValue('ALL');
		Ext.getCmp(me.idMtAc).setValue('ALL');
		Ext.getCmp(me.idLok).setValue('ALL');
		Ext.getCmp(me.idThn).setValue(rcm.view.Util.U1th(''));
	},
	
	sedotFilter: function()	{
		var o = {},
			me = this;
		o.iW = Ext.getCmp(me.idWoT).getValue();
		o.iM = Ext.getCmp(me.idMtAc).getValue();
		o.iT = Ext.getCmp(me.idThn).getValue();
		o.iL = Ext.getCmp(me.idLok).getSubmitValue();
		//rcmSettings.gggg = o;
		return o;
	}
	
});
