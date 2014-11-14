Ext.define('rcm.view.konfig.OpartForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fOpart',
	
    bodyPadding: 5,       
	defaultType: 'textfield',
		
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama Object Part',
            name		: 'nama',
			width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Object Part',
            name		: 'kode',
			width		: 400,
            allowBlank	: false
	
		},{
			xtype		: 'checkboxgroup',
            fieldLabel	: 'Kategori Cause',
			columns		: [70, 70],
			// hidden		: me.hidckbox,
			items: [{
				boxLabel: 'Obama', 
				name: 'obama',
				inputValue : 1
			},{
				boxLabel: 'SAP', 
				name: 'sap', 
				inputValue : 1
				// checked: true
			}]

		/*},{
			fieldLabel	: 'Keterangan',
            name		: 'ket'
			// hidden		: me.hidkode,
            // allowBlank	: true*/
		}];
		
		me.buttons = [{
			text: 'Simpan',
			formBind: true, 
			disabled: true,
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