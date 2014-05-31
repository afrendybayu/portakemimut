/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.dataentry.IsiTabForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.isiFormGagal',
	xtype: 'taskIsiFormGagal',
	require: [
		'Ext.form.TextField',
		'Ext.grid.Panel'
	],

	dockedItems: [{
		dock: 'bottom',
		xtype: 'container',
		layout: {
			type: 'hbox',
			align: 'middle'
		},
		padding: '5 0 0 0',
		items: [{
				xtype: 'component',
				flex: 1
			},{
				xtype: 'button',
				text: 'Batal',
				width: 70,
				id: 'cancel-eg',
				icon: 'modul/icons/cross.gif',
				margin: '0 10 0 0'
			},{
				xtype: 'button',
                //formBind: true,
                id:'save-task-fg-btn',
                icon: 'modul/icons/savedisk.png',
                disabled: true,
                text: 'Simpan Data',
                width: 140
			},{
				xtype: 'button',
                //formBind: true,
                id:'update-rh',
                icon: 'modul/icons/savedisk.png',
                hidden: true,
                text: 'Update',
                width: 140
		 }]
	}],
	
	initComponent: function() {
		var me=this,ed=Ext.create('Ext.grid.plugin.CellEditing',{ clicksToEdit: 1	});
		
		me.items = [{	// 0 tipe kejadian
				xtype:          'combo',
				fieldLabel: 'Tipe Kejadian',
				mode:           'local',
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText:      'Pilih Tipe Kejadian ... ',
				name:           'tfevent',
				id: 'idtfevent',
				displayField:   'name',
					//defaultMargins: {top: 0, right: 5, bottom: 0, left: 0},
				valueField: 'value',
				queryMode: 'local',
				store:          Ext.create('Ext.data.Store', {
					fields : ['name', 'value'],
					data   : [
						{name : 'Stand By',  value: 1},							
						{name : 'PM', value: 2},
						{name : 'Corrective', value: 3},
						{name : 'Breakdown', value: 4}
					]
				}),
				maxWidth: 405,
				listConfig: {
					listeners: {
						itemclick: function(list, record) {
							me.pilihEventG(record.raw.value);
						}
					}
				}
			},{			// 1 Tipe PM
				xtype: 'combo',
				mode: 'local',
				//triggerAction:  'all',
				forceSelection: true,
				editable: false,
				fieldLabel: 'Penyebab',
				emptyText: 'Pilih Tipe PM ... ',
				name: 'tipepm',
				id: 'tipepm',
				displayField: 'nama',
				valueField: 'id',
				multiSelect: true,
				queryMode: 'local',
				combineErrors: true,
				//store: 'PM',
				maxWidth: 405,
				allowBlank: false
			},{			// 2 Unit Stop
				xtype: 'fieldcontainer',
				fieldLabel: 'Unit Stop',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype: 'datefield',
						name: 'datedown',
						id: 'datedown',
						fieldLabel: 'Tanggal',
						format: 'd-m-Y',
						emptyText: 'Pilih Tanggal ... ',
						margin: '0 5 0 0',
						//vtype: 'daterange',
						endDateField: 'dateup',
						maxWidth: 200,
						allowBlank: false
					}, {
						xtype: 'timefield',
						//vtype: 'timerange',
						name: 'timedown',
						id: 'timedown',
						endTimeField: 'timeup',
						startDateField: 'datedown',
						endDateField: 'dateup',
						emptyText: 'Pilih jam ...',
						labelAlign: 'top',
						format: 'H:i',
						maxWidth: 200,
						anchor: '100%',
						allowBlank: false
				}]
			},{			// 3 Mulai Tindakan
				xtype: 'fieldcontainer',
				fieldLabel: 'Mulai Tindakan',
				id: 'TFmt',
				//name: 'timemulai',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype : 'datefield',
						name : 'datemulai',
						id : 'datemulai',
						fieldLabel: 'Tanggal',
						format: 'd-m-Y',
						emptyText: 'Pilih Tanggal ... ',
						maxWidth: 200
						//allowBlank: false
					},{
						xtype: 'timefield',
						name: 'timemulai',
						id: 'timemulai',
						emptyText: 'Pilih jam ...',
						labelAlign: 'top',
						format: 'H:i',
						maxWidth: 200,
						margin: '0 5 0 5',
						anchor: '100%'
					},{
						xtype: 'button',
						text: 'Sejak Unit Stop',
						name: 'timemulai',
						maxWidth: 120,
						id: 'samadown-fmea-btn',
						//params: {'datedown','datemulai','timedown','timemulai'},
						icon: 'modul/icons/connect.png'
				//*/
				}]
			},{			// 4 Unit Beroperasi
				xtype: 'fieldcontainer',
				fieldLabel: 'Unit Beroperasi',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype: 'datefield',
						name: 'dateup',
						id: 'dateup',
						//vtype: 'daterange',
						startDateField: 'datedown',
						startTimeField: 'timedown',
						endTimeField: 'timeup',
						endDateField: 'dateup',
						fieldLabel: 'Tanggal',
						format: 'd-m-Y',
						emptyText: 'Pilih Tanggal ... ',
						margin: '0 5 0 0',
						maxWidth: 200,
						allowBlank: false
					}, {
						xtype: 'timefield',
						name: 'timeup',
						id: 'timeup',
						//vtype: 'timerange',
						startTimeField: 'timedown',
						startDateField: 'datedown',
						endDateField: 'dateup',
						emptyText: 'Pilih jam ...',
						labelAlign: 'top',
						format: 'H:i',
						maxWidth: 200,
						anchor: '100%',
						allowBlank: false
				}]
			},{			// 5 Selesai Tindakan
				xtype: 'fieldcontainer',
				fieldLabel: 'Selesai Tindakan',
				combineErrors: true,
				msgTarget : 'side',
				id: 'TFst',
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype : 'datefield',
						name : 'dateselesai',
						id : 'dateselesai',
						fieldLabel: 'Tanggal',
						format: 'd-m-Y',
						emptyText: 'Pilih Tanggal ... ',
						maxWidth: 200
						//allowBlank: false
					}, {
						xtype: 'timefield',
						name: 'timeselesai',
						id: 'timeselesai',
						emptyText: 'Pilih jam ...',
						labelAlign: 'top',
						format: 'H:i',
						maxWidth: 200,
						anchor: '100%',
						margin: '0 5 0 5'
					},{
						xtype: 'button',
						text: 'Sejak Unit Operasi',
						name: 'timemulai',
						maxWidth: 120,
						id: 'samarun-fmea-btn',
						//id: 'samawaktu-fmea-btn',
						//params: {'dateup','dateselesai','timeup','timeselesai'},
						icon: 'modul/icons/connect.png'
				}]
			},{			// 6 Kegagalan Button
				xtype: 'fieldcontainer',
				fieldLabel: 'Kegagalan',
				id: 'TFTmbl',
				combineErrors: true,
				msgTarget : 'side',
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype: 'button',
						id: 'tambah-fmea-btn',
						icon: 'modul/icons/add.png',
						margin: '0 0 0 665',
						text: 'Tambah',
						maxWidth: 80
				}]
			},{			// 8 KetEditor
				width:509,
				xtype: 'textarea',
				name: 'tfket',
				id: 'idtfket',
				fieldLabel: 'Keterangan',
				msgTarget: 'side',
				flex: 1,
				height: 80
			},{
				xtype: 'textfield',
				width:509,
				hidden: true,
				fieldLabel: 'Pelaksana',
				msgTarget: 'side',
				name: 'exe',
				id: 'idexe',
				allowBlank: false,
				tooltip: 'Masukkan pelaksana pekerjaan',
				minLength: 2,
				combineErrors: true,
				defaults: {
					flex: 1,
					hideLabel: true
				}
		}],
		
		me.callParent(arguments);
	},
	
	pilihEventG: function(rec)	{
		
	}
});
