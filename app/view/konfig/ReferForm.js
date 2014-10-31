Ext.define('rcm.view.konfig.ReferForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fRefer',
	
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
			fieldLabel	: 'Nama Referensi',
            name		: 'nama',
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Referensi',
            name		: 'kode',
            allowBlank	: true
		}];
		
		me.buttons = [{
			text: 'Simpan',
			formBind: true, 
			disabled: true
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