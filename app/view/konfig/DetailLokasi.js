Ext.define('rcm.view.konfig.DetailLokasi', {
    extend: 'Ext.form.Panel',
    xtype: 'panLokasi',

	bodyPadding: 10,  // Don't want content to crunch against the borders
    //fh: 'h',
    
    defaultType: 'textfield',
    defaults: {
		width: 400
	},
    // title: 'Filters',
    initComponent: function() {
		var me = this;
		me.buttons = [{
			text: 'Simpan',
			iconCls: 'savedisk',
			formBind: true, 
			disabled: true
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	text: 'Update',
        	iconCls: 'editEvent',
			formBind: true,
			disabled: true,
        },{
            text: 'Clear',
            handler: me.clrForm
            /*
            handler: function() {
                this.up('form').getForm().reset();
            }
            //*/
		}];
		me.items = [{
				//xtype:'hiddenfield',
				name: 'flag'
			},{
				//xtype:'hiddenfield',
				name: 'id'
			},{
				fieldLabel: 'Nama',
				name: 'nama',
				emptyText: 'Masukkan Nama Hirarki/Equipment',
				allowBlank: false
			},{
				fieldLabel: 'Hirarki Induk',
				name: 'parent',
				xtype: 'treepicker',
				store: Ext.create('rcm.store.LokUnit'),
				dataIndex: 'parent',
				displayField: 'nama'
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
    
    
    clrForm: function()	{			
		var me = this.up('form').getForm(),
			id = me.findField('id').getValue(),
			f  = me.findField('flag').getValue();

		me.reset();
		me.findField('flag').setValue(f);
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
		rcmSettings.yyy = me;
		//this.ubahFlag(n);
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
