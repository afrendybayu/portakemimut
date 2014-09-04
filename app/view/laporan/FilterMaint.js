// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.laporan.FilterMaint', {
    extend: 'Ext.form.Panel',
	xtype: 'tFMaint',
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
					id:  'iThnAwM',
					xtype: 'monthfield',
					submitFormat: 'Y-m-d',
					value: new Date(),
					fieldLabel: '<b>Pilih Waktu Awal</b>',
					displayField: 'thn',
					width: 200,
					labelWidth: 100,
					format: 'M Y',
					margin: '0 10 0 0'
				},{
					id:  'iThnAkM',
					xtype: 'monthfield',
					submitFormat: 'Y-m-d',
					//emptyText: 'Tahun '+rcm.view.Util.U1th(''),
					//valueField: 'thn',
					format: 'M Y',
					value: new Date(),
					//value: Ext.Date.add(new Date()),
					fieldLabel: '<b>Waktu Akhir</b>',
					//displayField: 'thn',
					width: 180,
					labelWidth: 80,
					margin: '0 10 0 0'
				},{
					id:  'iLokM',
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
					id:  'iWoTM',
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
					id:  'iMtAcM',
					xtype: 'combo',
					queryMode: 'local',
					store: 'SapMwc',
					value: 'ALL',
					//emptyText: 'ALL',
					displayField: 'mwc',
					labelWidth: 60,
					width: 180,
					fieldLabel: '<b>Maint Act</b>',
					margin: '0 10 0 0'
				},{
					id: 'btnCariSM',
					xtype: 'button',
					width: 100,
					text: 'Filter',
					margin: '2 0 0 0'				
				},{
					xtype: 'label',
					flex: 1,
					text: ''
				},{
					id: 'btnClearSM',
					xtype: 'button',
					//width: 100,
					flex: 1,
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
		Ext.getCmp('iWoTM').setValue('ALL');
		Ext.getCmp('iMtAcM').setValue('ALL');
		Ext.getCmp('iLokM').setValue('ALL');
	},
	
	sedotFilter: function()	{
		var o = {};
		o.iW = Ext.getCmp('iWoTM').getValue();
		o.iM = Ext.getCmp('iMtAcM').getValue();
		o.iTw = Ext.getCmp('iThnAwM').getSubmitValue();
		o.iTk = Ext.getCmp('iThnAkM').getSubmitValue();
		o.iL = Ext.getCmp('iLokM').getSubmitValue();
		return o;
	}
	
});
