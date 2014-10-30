Ext.define('rcm.view.konfig.FailureForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fFailure',
	
	// layout: {
		// type :'form'
	// },
	
    bodyPadding: 5,       
	// padding : '10 10 0 10', //top right bottom left
	// plugins: {
            // ptype: 'datatip'
        // },
	defaultType: 'textfield',
	// 
	
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama Failure',
            name		: 'nama',
			// hidden		: me.hidnama,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Failure',
            name		: 'kode',
			// hidden		: me.hidkode,
            allowBlank	: false
		
		},{
			fieldLabel	: 'Keterangan',
            name		: 'ket',
			// hidden		: me.hiddur,
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