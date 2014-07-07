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
		padding: '15',//'5 0 0 0',
		items: [{
				xtype: 'component',
				flex: 1
			},{
				xtype: 'button',
				text: 'Batal',
				width: 70,
				id: 'cancel-eg',
				//icon: 'modul/icons/cross.gif',
				iconCls: 'cross',
				margin: '0 10 0 0'
			},{
				xtype: 'button',
                //formBind: true,
                id:'save-task-fg-btn',
                //icon: 'modul/icons/savedisk.png',
                iconCls: 'savedisk',
                disabled: true,
                text: 'Simpan Data',
                width: 140
			},{
				xtype: 'button',
                //formBind: true,
                id:'update-rh',
                //icon: 'modul/icons/savedisk.png',
                iconCls: 'savedisk',
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
				triggerAction:  'all',
				forceSelection: true,
				editable:       false,
				emptyText:      'Pilih Tipe Kejadian ... ',
				name:           'tfevent',
				id: 'idtfevent',
				displayField:   'nama',
				valueField: 'id',
				queryMode: 'local',
				store: 'EventList',
				maxWidth: 405,
				listConfig: {
					listeners: {
						itemclick: function(list, record) {
							me.pilihEventG(record.get('id'));
						}
					}
				}
			},{			// 1 Tipe PM
				xtype: 'combo',
				mode: 'local',
				hidden: true,
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
				hidden: true,
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
						//icon: 'modul/icons/connect.png'
						iconCls: 'connect',
				
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
				hidden: true,
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
						//icon: 'modul/icons/connect.png'
						iconCls: 'connect',
				}]
			},{			// 6 Kegagalan Button
				xtype: 'fieldcontainer',
				fieldLabel: 'Kegagalan',
				id: 'TFTmbl',
				combineErrors: true,
				msgTarget : 'side',
				hidden: true,
				layout: 'hbox',
				defaults: {
					flex: 1,
					hideLabel: true
				},
				items: [{
						xtype: 'button',
						id: 'tambah-fmea-btn',
						//icon: 'modul/icons/add.png',
						iconCls: 'add',
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
			},{			// 9 Pelaksana
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
	
	updateErrorState: function(a) {		
		var me = this, errorCmp, fields, errors;
		var ev = Ext.getCmp('idtfevent').getSubmitValue(),
			dd = Ext.getCmp('datedown').getSubmitValue(),
			td = Ext.getCmp('timedown').getSubmitValue(),
			du = Ext.getCmp('dateup').getSubmitValue(),
			tu = Ext.getCmp('timeup').getSubmitValue();
		var ex = Ext.getCmp('idexe').getSubmitValue();
		//console.log("ev: "+ev+", dd: "+dd+", td: "+td+", du"+du+", tu: "+tu);
		//if (ev && ev==1)	{		// standby
		if (a==1) {
			if (dd && td && du && tu)	{
				Ext.getCmp('save-task-fg-btn').enable();
			} else {
				Ext.getCmp('save-task-fg-btn').disable();
			}
		}
		else if (a==2)	{	// PM
		//else if (ev && ev==2)	{	// PM
			var pm = Ext.getCmp('tipepm').getSubmitValue();
			
			//console.log("pm: "+pm);
			if (dd && td && du && tu && pm && ex)	{
				Ext.getCmp('save-task-fg-btn').enable();
			} else {
				Ext.getCmp('save-task-fg-btn').disable();
			}
		}
		else if (a==3 || a==4)	{	// CR | BD
			//console.log("ev: "+ev+",pjg: "+ex.length);
			if (dd && td && du && tu && ex && ex.length>=2)	{
				Ext.getCmp('save-task-fg-btn').enable();
			} else {
				Ext.getCmp('save-task-fg-btn').disable();
			}
		}
		else {
			Ext.getCmp('save-task-fg-btn').disable();
		}
	},
	
	pilihEventG: function(n)	{
		this.fireEvent('plhEventGagalXY', n);
		if (n==1)	{		// StandBy
			Ext.getCmp('tipepm').setVisible(false);
			Ext.getCmp('TFmt').setVisible(false);
			Ext.getCmp('TFst').setVisible(false);
			Ext.getCmp('TFTmbl').setVisible(false);
			//Ext.getCmp('TFGrid').setVisible(false);
			Ext.getCmp('idexe').setVisible(false);
		} 
		else if (n==2)	{
			Ext.getCmp('tipepm').setVisible(true);
			Ext.getCmp('TFmt').setVisible(true);
			Ext.getCmp('TFst').setVisible(true);
			Ext.getCmp('TFTmbl').setVisible(false);
			Ext.getCmp('idexe').setVisible(true);
			//Ext.getCmp('TFGrid').setVisible(false);
			//*/
		} else	{ // BD & CR
			Ext.getCmp('tipepm').setVisible(false);
			Ext.getCmp('TFmt').setVisible(true);
			Ext.getCmp('TFst').setVisible(true);
			Ext.getCmp('TFTmbl').setVisible(true);
			Ext.getCmp('idexe').setVisible(true);
			//Ext.getCmp('TFGrid').setVisible(true);
		}
		this.updateErrorState(n);
	}
});
