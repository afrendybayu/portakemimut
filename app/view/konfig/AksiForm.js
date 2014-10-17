Ext.define('rcm.view.konfig.AksiForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fAksi',
	
	// layout: {
		// type :'form'
	// },
	
    bodyPadding: 5,       
	// padding : '10 10 0 10', //top right bottom left
	// plugins: {
            // ptype: 'datatip'
        // },
	defaultType: 'textfield',
	label1 : '',
	label2 : '',
	label3 : '',

	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel: me.label1,
            name: 'nama',
            allowBlank: false,
		},{
			fieldLabel: me.label2,
            name: 'kode',
            allowBlank: false,
		},{
			fieldLabel: me.label3,
            name: 'ket',
            allowBlank: false,
		}];
		
		me.buttons = [{
			text: 'Save',
			formBind: true, //only enabled once the form is valid
			disabled: true,
            handler: function() {
                alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            }
        },{
            text: 'Edit',
            // handler: function() {
                // this.up('form').getForm().reset();
            // }
		},{
			text: 'Cancel'
		}];
	
		me.callParent(arguments);
	}
	
	
	
});