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
			text: 'Simpan',
			formBind: true, 
			disabled: true
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	text: 'Edit',
			formBind: true,
			disabled: true,
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});