Ext.define('rcm.view.konfig.AksiFForm', {
	extend: 'Ext.form.Panel',

	xtype: 'f_Aksi',
    bodyPadding: 5,       
	defaultType: 'textfield',
	
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama Aksi',
            name		: 'nama',
            width		: 400,
            allowBlank	: false
		},{
			xtype		: 'textarea',
			fieldLabel	: 'Keterangan',
			width		: 400,
            name		: 'ket',
		}];
		
		me.buttons = [{
			id : 'tblsmpaksi',
			text: 'Simpan',
			formBind: true, 
			disabled: true
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	id : 'tbleditaksi',
        	text: 'Edit',
			formBind: true,
			disabled: true,
			hidden	: true
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpaksi').setVisible(true);
        		Ext.getCmp('tbleditaksi').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});
