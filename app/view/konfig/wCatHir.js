Ext.define('rcm.view.konfig.wCatHir', {
    extend: 'Ext.window.Window',
    xtype: 'tWCatHir',

    title: 'Kategori Hirarki',
    layout: 'fit',
    //autoShow: true,

    initComponent: function() {
		var me=this;
        me.items = [{
			xtype: 'form',
			items: [{
				xtype: 'textfield',
				name : 'nama',
				fieldLabel: 'Nama'
			},{
				xtype: 'textfield',
				name : 'kode',
				fieldLabel: 'Kode'
			},{
				xtype: 'textfield',
				name : 'ket',
				fieldLabel: 'Keterangan'
			}]
		}];

        me.buttons = [{
			text: 'Save',
			action: 'save'
		},{
			text: 'Cancel',
			scope: this,
			handler: this.close
		}];

        this.callParent(arguments);
    }
});
