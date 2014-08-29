// afrendyBayu,25Jan2014 //
Ext.define('rcm.view.lapobama.BlnAv', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.blnAv',
	xtype: 'taskBlnAv',
	require: [
	//	'Ext.form.TextField'
	],

	initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'form',
			padding: '5 20 5 80',
			id: 'lapFL',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',

			items: [{
					name:  'iblnAvReU',
					xtype: 'monthfield',
					submitFormat: 'Y-m-d',
					value: new Date(),
					fieldLabel: '<b>Pilih Waktu</b>',
					format: 'F Y',
					margin: '0 10'
				},{
					id: 'btnCariAVx',
					xtype: 'button',
					width: 100,
					text: 'Submit'
				},{
					xtype: 'label',
					id: 'iflAvRe',
					flex: 1,
					itemId: 'funclocAvRe',
					cls: 'flAvReCh',
					text: 'Tampilkan Grafik dengan klik FuncLoc'
			}]
		}];
		
		me.listeners = {
			//*
			'select': {
				fn: function(dp, dt){
					alert("BlnAv.js select");
					//this.fireEvent('klikKalender', dt);
				}
				//scope: this
			}
			//*/
		};
		me.callParent();
		
		/*
		me.listeners= {
			'select': {
				fn: function(dp, dt){
					//console.log("Tanggalan.js select: "+dt);
					alert("Tanggalan.js select: ");
					//this.fireEvent('klikKalender', dt);
				},
				scope: this
			},
		};
		me.callParent();
		//*/
	}
	
});
