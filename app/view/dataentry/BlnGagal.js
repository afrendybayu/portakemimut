// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.dataentry.BlnGagal', {
    extend: 'Ext.form.Panel',
	xtype: 'tblnGagal',
	require: [
	//	'Ext.form.TextField'
	],

	initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'form',
			padding: '5 10 5 10',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',

			items: [{
					id:  'iblnDGaw',
					xtype: 'datefield',
					submitFormat: 'Y-m-d',
					//value: new Date().add(Date.MONTH, -2),
					value: Ext.Date.add(new Date(), Ext.Date.MONTH, -2),
					fieldLabel: '<b>Pilih Waktu Awal</b>',
					labelWidth: 110,
					format: 'd M Y'
					//format: 'F Y',
					//margin: '0 10 0 10'
				},{
					id:  'iblnDGak',
					xtype: 'datefield',
					submitFormat: 'Y-m-d',
					value: new Date(),
					fieldLabel: '<b>Waktu Akhir</b>',
					format: 'd M Y',
					margin: '0 10 0 10'
				},{
					id: 'btnCariDGx',
					xtype: 'button',
					width: 100,
					text: 'Submit'
				
				},{
					xtype: 'label',
					text:'',
					flex: 1
				},{
					id: 'btnClrReliax',
					xtype: 'button',
					//width: 100,
					text: 'Clear',
					margin: '0 5 0 0'
				},{
					id: 'btnHtgReliax',
					xtype: 'button',
					//width: 100,
					text: 'Hitung Reliability'
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
	}
	
});
