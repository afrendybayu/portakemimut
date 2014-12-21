// afrendyBayu,2Okt2014 //
Ext.define('rcm.view.laporan.FilterUpload', {
    extend: 'Ext.form.Panel',
	xtype: 'tFUpl',
	require: [
	//	'Ext.form.TextField'
	],

	idbDownL: '-',
	idbUpl: '-',
	idtLok: '-',
	//idbPdf: '-',
	idThn: '-',
	idbSr: '-',
	etext: '-',
	nameFile: '-',
	hdPdf: true,

	initComponent: function() {
		var me=this;
		me.items=[{
			xtype: 'form',
			padding: '2 20 2 10',
			border: 0,
			combineErrors: true,
			flex: 1,
			layout: 'hbox',

			items: [{
					id: me.idThn,
					xtype: 'numberfield',
					value: rcm.view.Util.U1th(''),
					fieldLabel: '<b>Pilih Tahun</b>',
					labelWidth: 90,
					width: 160,
					margin: '0 10 0 0'
				},{
					id: me.idLok,
					xtype: 'combo',	
					store: 'SapLoc',
					labelWidth: 50,
					width: 200,
					value: 'ALL',
					editable: false,
					queryMode: 'local',
					displayField: 'nama',
					valueField: 'id',
					fieldLabel: '<b>Lokasi</b>',
					margin: '0 10 0 0'
				},{
					id: me.idCatH,
					xtype: 'combo',	
					store: 'CatHirEq',
					labelWidth: 60,
					width: 180,
					value: 'ALL',
					editable: false,
					queryMode: 'local',
					displayField: 'text',
					valueField: 'id',
					fieldLabel: '<b>Kategori</b>',
					margin: '0 10 0 0'
				},{
					id: me.idbSr,
					xtype: 'button',
					width: 80,
					text: 'Filter',
					margin: '2 0 0 0'
				},{
					id: me.idbExc,
					xtype: 'button',
					//disabled : true,
					hidden : me.hdExc,
					iconCls: 'excel',
					//width: 100,
					text: 'Gabung',
					margin: '2 5'
				},{
					id: me.idbExcP,
					xtype: 'button',
					//disabled : true,
					hidden : me.hdExcP,
					iconCls: 'excel',
					//width: 100,
					text: 'Pisah',
					margin: '2 5'
					
				//*
				},{
					xtype: 'label',
					flex: 1,
					text: ''
				//*/
				},{
					//id: 'btnClearSH',
					id: me.idbDownL,
					xtype: 'button',
					width: 120,
					//flex: 1,
					text: 'Download Format',
					margin: '2 10 2 10'
				},{
					xtype: 'filefield',
					id : me.idtLok,
					name: me.nameFile,
					emptyText: me.etext,
					width: 250,
					msgTarget: 'side',
					//allowBlank: false,
					buttonText: ' Browse ',
					margin: '2 0'
				},{
					id: me.idbUpl,
					xtype: 'button',
					//disabled : true,
					//width: 100,
					text: 'Upload',
					disabled: true,
					iconCls: 'up',
					margin: '2 5'
				//*
				},{
					id: me.idbPdf,
					xtype: 'button',
					//disabled : true,
					hidden : me.hdPdf,
					width: 100,
					text: 'Export to PDF',
					margin: '2 0'
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
	}
	
});
