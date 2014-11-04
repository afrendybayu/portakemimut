Ext.define('rcm.view.konfig.UserForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fUser',
	
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
			fieldLabel	: 'Nama',
            name		: 'nama',
            allowBlank	: false
		},{
			fieldLabel	: 'User ID',
            name		: 'userid',
            allowBlank	: true
		},{
			fieldLabel	: 'Password',
            name		: 'pass',
           	inputType	: 'password',
            allowBlank	: true
        },{
			xtype		: 'combobox',
			fieldLabel	: 'Level Akses',
            name		: 'akses',
           	editable	: false,
            allowBlank	: false,
            store 		: '',
            displayField: 'nama',
            valueField 	: 'id',
            queryMode 	: 'local',
            emptyText	: 'Lokasi',

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