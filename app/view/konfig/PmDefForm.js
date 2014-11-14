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
            allowBlank	: false
		},{
			fieldLabel	: 'Kode PM',
            name		: 'kode',
            allowBlank	: false
		},{
			xtype		: 'numberfield',
			fieldLabel	: 'Durasi PM',
            name		: 'durasi',
            allowBlank	: false
		},{
			fieldLabel	: 'Keterangan',
            name		: 'ket',
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