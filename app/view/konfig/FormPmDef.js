Ext.define('rcm.view.konfig.FormPmDef', {
	extend: 'Ext.form.Panel',

	xtype: 'fPmDef',
	
	// layout: {
		// type :'form'
	// },
	
    bodyPadding: 5,       
	// padding : '10 10 0 10', //top right bottom left
	// plugins: {
            // ptype: 'datatip'
        // },
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