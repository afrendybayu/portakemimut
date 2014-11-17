Ext.define('rcm.view.konfig.CauseForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fCause',
    bodyPadding: 5,       
	defaultType: 'textfield',
		
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama Cause',
            name		: 'nama',
            width: 400,
			// hidden		: me.hidnama,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Cause',
            name		: 'kode',
			// hidden		: me.hidkode,
			width: 400,
            allowBlank	: false
	
		},{
			xtype		: 'checkboxgroup',
            fieldLabel	: 'Kategori Cause',
			columns		: [70, 70],
			width: 400,
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

		},{
			fieldLabel	: 'Keterangan',
            name		: 'ket',
            width: 400,
            xtype: 'textarea'
		}];
		
		me.buttons = [{
			text: 'Simpan',
			formBind: true, 
			disabled: true,
			id  :'tblsmpcause'
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	id : 'tbleditcause',
            text: 'Edit',
            formBind: true, 
			disabled: true,
			hidden	: true
            // handler: function() {
                // this.up('form').getForm().reset();
            // }
		},{
			text: 'Batal',
			handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpcause').setVisible(true);
        		Ext.getCmp('tbleditcause').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});
