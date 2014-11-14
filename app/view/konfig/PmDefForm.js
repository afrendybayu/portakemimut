Ext.define('rcm.view.konfig.PmDefForm', {
	extend: 'Ext.form.Panel',

	xtype: 'f_PmDef',
	
    bodyPadding: 5,       
	defaultType: 'textfield',
	
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama PM',
            name		: 'nama',
            width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode PM',
            name		: 'kode',
            width		: 400,
            allowBlank	: false
		},{
			xtype		: 'numberfield',
			fieldLabel	: 'Durasi PM',
            name		: 'durasi',
            width		: 400,
            allowBlank	: false
		},{
			xtype		: 'textarea',
			fieldLabel	: 'Keterangan',
            name		: 'ket',
            width		: 400,
            allowBlank	: true
		}];
		
		me.buttons = [{
			text: 'Simpan',
			formBind: true, 
			disabled: true
        },{
        	text: 'Edit',
			formBind: true,
			disabled: true
			
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});