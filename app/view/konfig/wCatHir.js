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
				name : 'wcNama',
				fieldLabel: 'Nama',
				allowBlank: false
			},{
				xtype: 'hiddenfield',
				id: 'idCatH'
			},{
				//xtype: 'textfield',
				name : 'wcKode',
				fieldLabel: 'Kode',
				allowBlank: false
			},{
				//xtype: 'textarea',
				//xtype: 'textfield',
				name : 'wcKet',
				fieldLabel: 'Keterangan',
				//anchor    : '100%'
			}]
		}];

        me.buttons = [{
			text: 'Save',
			//action: 'save'
			id: 'saveCatH'
		},{
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];

        this.callParent(arguments);
    }
});
