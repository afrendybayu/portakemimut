// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.laporan.FilterThn', {
    extend: 'Ext.form.Panel',
	xtype: 'tFThn',
	require: [
	//	'Ext.form.TextField'
	],
	idbSr:'-',
	idThn:'-',

	initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'form',
			padding: '5 20 5 10',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',

			items: [{
					//id:  'iThnH',
					id: me.idThn,
					xtype: 'combo',
					submitFormat: 'Y',
					emptyText: 'Tahun '+rcm.view.Util.U1th(''),
					valueField: 'thn',
					value: rcm.view.Util.U1th(''),
					fieldLabel: '<b>Pilih Waktu</b>',
					queryMode: 'local',
					store: 'SapThn',
					displayField: 'thn',
					width: 180,
					labelWidth: 80,
					format: 'Y',
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
				/*
				},{
					//id: 'btnClearSH',
					id: me.idbCl,
					xtype: 'button',
					width: 100,
					//flex: 1,
					text: 'Clear',
					margin: '2 0 0 0'
				//*/
			}]
		}];

		me.listeners = {
			//*
			'select': {
				fn: function(dp, dt){
					//alert("BlnGagal.js select");
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
		Ext.getCmp(me.idThn).setValue(rcm.view.Util.U1th(''));
	},
	
	sedotFilter: function()	{
		var t = Ext.getCmp(this.idThn).getValue();
		//	me = this;
		//o.iT = Ext.getCmp(this.idThn).getValue();
		//alert(this.idThn);
		return o;
	}
	
});
