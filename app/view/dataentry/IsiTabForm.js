/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.dataentry.IsiTabForm', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.isiFormGagal',
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
                width: 140,
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
			},{
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
		}],
		
		me.callParent(arguments);
	},
	
	pilihEventG: function(rec)	{
		
	}
});
