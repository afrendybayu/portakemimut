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
					id:  'iThnSaw',
					//xtype: 'monthfield',
					xtype: 'combo',
					submitFormat: 'Y',
					emptyText: 'Tahun '+rcm.view.Util.U1th(''),
					valueField: 'thn',
					//value: new Date('Y'),
					//value: Ext.Date.add(new Date()),
					fieldLabel: '<b>Pilih Waktu</b>',
					width: 180,
					labelWidth: 80,
					format: 'Y',
					//format: 'F Y',
					margin: '0 10 0 10'
				/*
				},{
					id:  'iblnSak',
					xtype: 'monthfield',
					submitFormat: 'Y-m-d',
					value: new Date(),
					fieldLabel: '<b>Waktu Akhir</b>',
					format: 'M Y',
					labelWidth: 80,
					width: 200,
					//margin: '0 10 0 0'
				//*/
				},{
					id:  'iLokS',
					xtype: 'combobox',
					submitFormat: 'Y-m-d',
					//value: new Date(),
					labelWidth: 50,
					fieldLabel: '<b>Lokasi</b>',
					format: 'd M Y',
					margin: '0 10 0 10'
				},{
					id:  'iWoT',
					xtype: 'combobox',
					submitFormat: 'Y-m-d',
					//value: new Date(),
					labelWidth: 60,
					fieldLabel: '<b>WO Type</b>',
					format: 'd M Y',
					margin: '0 10 0 0'
				},{
					id:  'iMtAc',
					xtype: 'combobox',
					submitFormat: 'Y-m-d',
					//value: new Date(),
					labelWidth: 60,
					fieldLabel: '<b>Maint Act</b>',
					//format: 'd M Y',
					margin: '0 10 0 0'
				},{
					id: 'btnCariSx',
					xtype: 'button',
					width: 100,
					text: 'Filter',
					margin: '2 30 0 0'
				},{
					id: 'btnClearSx',
					xtype: 'button',
					width: 100,
					text: 'Clear',
					margin: '2 0 0 0'
				},{
					xtype: 'label',
					text:'',
					flex: 1
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
	}
	
});
