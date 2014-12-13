Ext.define('rcm.view.konfig.wCatHir', {
    extend: 'Ext.window.Window',
    xtype: 'tWCatHir',

    //title: 'Kategori Hirarki',
    layout: 'fit',
    modal: true,
	
    closable: false,
	resizable: false,
	plain: true,
    //autoShow: true,

    initComponent: function() {
		var me=this;
        me.items = [{
			xtype: 'form',
			//bodypadding : 40,
			//padding: '5 10',
			defaultType: 'textfield',
			items: [{
				//xtype: 'textfield',
				//name : 'wcNama',
				name : 'text',
				fieldLabel: 'Nama',
				allowBlank: false
			},{
				xtype: 'hiddenfield',
				id: 'idCatH'
			},{
				xtype: 'treepicker',
				//name : 'wcCat',
				name : 'parent',
				fieldLabel: 'Kategori',
				displayField: 'text',
				store: Ext.create('rcm.store.CatHir', {storeId: 'CatHir-TreeHirarki' }),
				hidden: true,
				id: 'idtpCatH'
			},{
				//xtype: 'textfield',
				//name : 'wcKode',
				name: 'tipe',
				fieldLabel: 'Kode',
				allowBlank: false
			},{
				//xtype: 'textarea',
				//xtype: 'textfield',
				//name : 'wcKet',
				name: 'ket',
				fieldLabel: 'Keterangan'
				//anchor    : '100%'
			}]
		}];

        me.buttons = [{
			text: 'Edit',
			//action: 'save'
			id: 'editCatH',
			hidden: true
		},{
			text: 'Simpan',
			//action: 'save'
			id: 'saveCatH',
			hidden: true
		},{
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];

        this.callParent(arguments);
    }
});
