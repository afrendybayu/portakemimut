Ext.define('rcm.view.konfig.SympForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fSymptom',
	
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
			fieldLabel	: 'Nama Symptom',
            name		: 'nama',
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Symptom',
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