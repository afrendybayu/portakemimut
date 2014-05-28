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
			padding: '5 20 5 80',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',

			items: [{
					id:  'iblnDG',
					xtype: 'monthfield',
					submitFormat: 'Y-m-d',
					value: new Date(),
					fieldLabel: '<b>Pilih Waktu</b>',
					format: 'F Y',
					margin: '0 10'
				},{
					id: 'btnCariDGx',
					xtype: 'button',
					width: 100,
					text: 'Submit'
				
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
