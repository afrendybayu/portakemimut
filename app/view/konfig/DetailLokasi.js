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
			items: ['->',{
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
					iconCls: 'savedisk',
					tooltip: 'Simpan Data Baru'
				},{
					id: 'bUptKEH',
					xtype: 'button',
					text: 'Update',
					formBind: true, 
					iconCls: 'editEvent',
					tooltip: 'Update Data'
				},{
					text: 'Clear',
					//iconCls: 'editEvent',
					tooltip: 'Bersihkan Form',
					handler: me.clrForm
			}]
		}];
		me.items = [{
				xtype:'label',
				//name: 'lbl',
				id: 'lblFormHir',
				cls: 'jdlForm',
				text: 'Form Hirarki dan Equipment',
				
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
				name: 'parent',
				xtype: 'treepicker',
				//store: 'HirDef',
				store: Ext.create('rcm.store.HirDef'),
				emptyText: 'Pilih Induk Hirarki/Equipment',
				dataIndex: 'parent',
				displayField: 'nama'
				//*/
			},{
				fieldLabel: 'Function Location',
				name: 'funcloc',
				emptyText: 'Masukkan nilai Func Loc',
				allowBlank: false,
				hidden: true
			},{
				fieldLabel: 'Tag',
				name: 'tag',
				emptyText: 'Masukkan nilai No Tag',
				allowBlank: false,
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
		console.log("nilai n: "+n);
		//*/
	},
	
	tmbhForm: function(n)	{
		this.showInput(n);
		this.chkVisBtn("t");
		if (n=="h")			Ext.fly('lblFormHir').update("Tambah Hirarki");
		else if (n=="u")	Ext.fly('lblFormHir').update("Tambah Unit");
		else if (n=="e")	Ext.fly('lblFormHir').update("Tambah Equipment");
	},
    
    editForm: function(n)	{
		this.showInput(n);
		this.chkVisBtn("u");
		if (n=="h")			Ext.fly('lblFormHir').update("Edit Hirarki");
		else if (n=="u")	Ext.fly('lblFormHir').update("Edit Unit");
		else if (n=="e")	Ext.fly('lblFormHir').update("Edit Equipment");
	},
    
    clrForm: function()	{			
		var me = this.up('form').getForm(),
			id = me.findField('id').getValue(),
			f  = me.findField('sil').getValue();

		me.reset();
		me.findField('sil').setValue(f);
		me.findField('rhinit').setValue(0);
		me.findField('id').setValue(id);
		if (f=="h")	{	// TAMBAHKAN INI buat manipulasi form dinamis
			me.findField('tag').setValue(" ");
			me.findField('funcloc').setValue(" ");
		}
		else if (f=="u")	{
			me.findField('tag').setValue(" ");
		}
		else if (f=="e")	{
			me.findField('funcloc').setValue(" ");
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
		}
		else if (n=="u")	{
			me.findField('funcloc').setVisible(true);
			me.findField('rhinit').setVisible(true);
			me.findField('tag').setVisible(false);
			me.findField('urut').setVisible(false);
		}
		else if (n=="e")	{
			me.findField('rhinit').setVisible(true);
			me.findField('tag').setVisible(true);
			me.findField('urut').setVisible(false);
			me.findField('funcloc').setVisible(false);
		}
		else {
			me.findField('rhinit').setVisible(false);
			me.findField('tag').setVisible(false);
			me.findField('funcloc').setVisible(false);
			me.findField('urut').setVisible(false);
			me.reset();
		}
		//*/
	}

});
