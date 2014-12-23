Ext.define('rcm.view.konfig.DetailLokasi', {
    extend: 'Ext.form.Panel',
    xtype: 'panLokasi',

	requires: [
	//	'rcm.view.konfig.TreeHirDef'
	],
	bodyPadding: 10,  // Don't want content to crunch against the borders
    
    defaultType: 'textfield',
    defaults: {
		width: 400
	},
    // title: 'Filters',
    initComponent: function() {
		var me = this;
		me.dockedItems= [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
					iconCls: 'newHir',
					tooltip: 'Tambah Hirarki'
				},{
					iconCls: 'newUnit',
					//id: 'delete-folder-btn',
					tooltip: 'Tambah Unit'
				},{
					iconCls: 'newEquip',
					//id: 'delete-folder-btn',
					tooltip: 'Tambah Equipment'
				},'->',{
					id: me.idEqCH,
					xtype: 'button',
					text: 'Hapus',
					//hidden: true,
					iconCls: 'hpsEvent',
					tooltip: 'Hapus Data'
				},{
					xtype: 'label',
					width: 30
				},{
					id: 'bSmpKEH',
					xtype: 'button',
					formBind: true, 
					text: 'Simpan',
					hidden: true,
					iconCls: 'savedisk'
					//tooltip: 'Simpan Data Baru'
				},{
					id: 'bUptKEH',
					xtype: 'button',
					text: 'Update',
					formBind: true, 
					iconCls: 'editEvent'
					//tooltip: 'Update Data'
				},{
					text: 'Clear',
					//iconCls: 'editEvent',
					//tooltip: 'Bersihkan Form',
					handler: me.clrForm
			}]
		}];
		me.items = [{
				xtype:'label',
				//name: 'lbl',
				id: 'lblFormHir',
				cls: 'jdlForm',
				text: 'Form Hirarki dan Equipment'
				
			},{
				xtype:'hiddenfield',
				name: 'sil'
			},{
				xtype:'hiddenfield',
				name: 'id'
			},{
				fieldLabel: 'Nama',
				name: 'nama',
				margin: '20 0 0 0',
				emptyText: 'Masukkan Nama Hirarki/Equipment',
				allowBlank: false
			},{
				fieldLabel: 'Hirarki Induk',
				//name: 'nama',
				//xtype: 'tHirDef'
				//*
				allowBlank: false,
				margin: '5 0 5 0',
				name: 'parent',
				xtype: 'treepicker',
				//store: 'HirDef',
				store: Ext.create('rcm.store.HirDef', {storeId: 'HirDef-DetailL' }),
				//store: Ext.create('rcm.store.LokUnit'),
				emptyText: 'Pilih Induk Hirarki/Equipment',
				dataIndex: 'parent',
				displayField: 'nama'
				//*/
			},{
				fieldLabel: 'Jenis Unit',
				name: 'flag',
				xtype: 'combobox',
				queryMode: 'local',
				displayField: 'nama',
			    valueField: 'id',
				//dataIndex: 'id',
				editable: false,
				store: 'UnitList',
				emptyText: 'Masukkan Jenis Unit',
				combineErrors: true,
				allowBlank: false,
				hidden: true
			//*/
			},{
				fieldLabel: 'Function Location',
				name: 'funcloc',
				emptyText: 'Masukkan nilai Func Loc',
				allowBlank: false,
				hidden: true
			//*
			},{
				fieldLabel: 'Tag',
				name: 'tag',
				emptyText: 'Masukkan nilai No Tag',
				allowBlank: false,
				hidden: true
			},{
				xtype: 'radiogroup',
				fieldLabel: 'Status Unit',
				name: 'radio',
				items: [
					{boxLabel: 'Aktif', name: 'status', inputValue: 1, checked: true},
					{boxLabel: 'Non Aktif', name: 'status', inputValue: 0}
				],
				hidden: true
			},{
				xtype: 'numberfield',
				fieldLabel: 'No urut',
				name: 'urut',
				minValue: 0,
				hidden: true
			},{
				fieldLabel: 'Kode',
				name: 'kode',
				emptyText: 'Masukkan Kode',
				allowBlank: false
			},{
				xtype: 'numberfield',
				fieldLabel: 'Running Hour init',
				name: 'rhinit',
				align: 'right',
				//emptyText: 0,
				minValue: 0,
				hidden: true
			},{
				xtype: 'textarea',
				fieldLabel: 'Keterangan',
				name: 'ket'
		}];
		me.callParent(arguments);
    },

    chkVisBtn: function(n)	{
		//*
		Ext.getCmp('bSmpKEH').setVisible(false);
		Ext.getCmp('bUptKEH').setVisible(false);
		//*
		if (n=="u")	{		// update
			Ext.getCmp('bUptKEH').setVisible(true);
		}
		else {				// tambah
			Ext.getCmp('bSmpKEH').setVisible(true);
		}
		//console.log("nilai n: "+n);
		//*/
	},
	
	tmbhForm: function(n)	{
		var me = this.getForm();
		this.showInput(n);		
		this.chkVisBtn("t");

		me.findField('id').setValue("");
		if (n=="h")			{
			Ext.fly('lblFormHir').update("Tambah Hirarki");
			me.findField('funcloc').setValue(" ");
			me.findField('tag').setValue(" ");
			me.findField('sil').setValue("h");
			me.findField('flag').setValue(0);
			//me.findField('status').setValue(0);
		}
		else if (n=="u")	{
			Ext.fly('lblFormHir').update("Tambah Unit");
			me.findField('funcloc').setValue("");
			me.findField('tag').setValue(" ");
			me.findField('sil').setValue('u');
			//me.findField('status').setValue(0);
		}
		else if (n=="e")	{
			Ext.fly('lblFormHir').update("Tambah Equipment");
			me.findField('funcloc').setValue(" ");
			me.findField('tag').setValue("");
			me.findField('sil').setValue("e");
			me.findField('flag').setValue(0);
			//me.findField('status').setValue(0);
		}
	},
    
    editForm: function(n)	{
		this.showInput(n);
		this.chkVisBtn("u");
		if (n=="h")			Ext.fly('lblFormHir').update("Edit Hirarki");
		else if (n=="u")	Ext.fly('lblFormHir').update("Edit Unit");
		else if (n=="e")	Ext.fly('lblFormHir').update("Edit Equipment");
	},
    
    clrForm: function()	{
		//console.log("clrForm");
		var me = this.up('form').getForm();
		this.up('form').clearIsi(me);
	},
    
    clearIsi: function(me)	{
		//var me = this.getForm()
		//rcmSettings.tttttt = me;
		var id = me.findField('id').getValue(),
			f  = me.findField('sil').getValue();
		me.reset();
		me.findField('sil').setValue(f);
		me.findField('rhinit').setValue(0);
		if (f=="h")	{	// TAMBAHKAN INI buat manipulasi form dinamis
			me.findField('tag').setValue(" ");
			me.findField('funcloc').setValue(" ");
			me.findField('flag').setValue(0);
		}
		else if (f=="u")	{
			me.findField('tag').setValue(" ");
			me.findField('flag').setValue(0);
		}
		else if (f=="e")	{
			me.findField('funcloc').setValue(" ");
			me.findField('flag').setValue(0);
		}
	},

    showInput: function(n)	{
		var me = this.getForm();
		//*
		if (n=="h")	{
			me.findField('rhinit').setVisible(false);
			me.findField('tag').setVisible(false);
			me.findField('funcloc').setVisible(false);
			me.findField('urut').setVisible(true);
			me.findField('flag').setVisible(false);
			me.findField('radio').setVisible(false);
		}
		else if (n=="u")	{
			me.findField('funcloc').setVisible(true);
			me.findField('rhinit').setVisible(true);
			me.findField('tag').setVisible(false);
			me.findField('urut').setVisible(false);
			me.findField('flag').setVisible(true);
			me.findField('radio').setVisible(true);
		}
		else if (n=="e")	{
			me.findField('rhinit').setVisible(true);
			me.findField('tag').setVisible(true);
			me.findField('urut').setVisible(false);
			me.findField('funcloc').setVisible(false);
			me.findField('flag').setVisible(false);
			me.findField('radio').setVisible(false);
		}
		else {
			me.findField('rhinit').setVisible(false);
			me.findField('tag').setVisible(false);
			me.findField('funcloc').setVisible(false);
			me.findField('urut').setVisible(false);
			me.findField('flag').setVisible(false);
			me.findField('radio').setVisible(false);
			me.reset();
		}
		//*/
	}

});
