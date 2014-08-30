// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.laporan.FilterHistori', {
    extend: 'Ext.form.Panel',
	xtype: 'tFHistori',
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
					id:  'iThnH',
					xtype: 'combo',
					submitFormat: 'Y',
					emptyText: 'Tahun '+rcm.view.Util.U1th(''),
					valueField: 'thn',
					value: rcm.view.Util.U1th(''),
					//value: Ext.Date.add(new Date()),
					fieldLabel: '<b>Pilih Waktu</b>',
					queryMode: 'local',
					store: 'SapThn',
					displayField: 'thn',
					width: 180,
					labelWidth: 80,
					format: 'Y',
					//format: 'F Y',
					margin: '0 10 0 10'
				},{
					id:  'iLokH',
					xtype: 'combo',	
					store: 'SapLoc',
					labelWidth: 50,
					value: 'ALL',
					queryMode: 'local',
					displayField: 'nama',
					valueField: 'id',
					fieldLabel: '<b>Lokasi</b>',
					margin: '0 10 0 10'
				},{
					id:  'iWoTH',
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
					id:  'iMtAcH',
					xtype: 'combo',
					queryMode: 'local',
					store: 'SapMwc',
					value: 'ALL',
					//emptyText: 'ALL',
					displayField: 'mwc',
					labelWidth: 60,
					fieldLabel: '<b>Maint Act</b>',
					margin: '0 10 0 0'
				},{
					id: 'btnCariSH',
					xtype: 'button',
					width: 100,
					text: 'Filter',
					margin: '2 30 0 0'
				},{
					xtype: 'label',
					flex: 1,
					text: ''
				},{
					id: 'btnClearSH',
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
		Ext.getCmp('iWoTH').setValue('ALL');
		Ext.getCmp('iMtAcH').setValue('ALL');
		Ext.getCmp('iLokH').setValue('ALL');
	},
	
	sedotFilter: function()	{
		var o = {};
		o.iW = Ext.getCmp('iWoTH').getValue();
		o.iM = Ext.getCmp('iMtAcH').getValue();
		o.iT = Ext.getCmp('iThnH').getValue();
		o.iL = Ext.getCmp('iLokH').getSubmitValue();
		return o;
	}
	
});
