Ext.define('rcm.view.konfig.UserForm', {
	extend: 'Ext.form.Panel',

	xtype: 'f_User',
	
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
		},{
			fieldLabel	: 'Password',
            name		: 'pass',
           	inputType	: 'password',
        },{
			/*xtype		: 'combobox',
			fieldLabel	: 'Level Akses',
            name		: 'akses',
           	editable	: false,
            allowBlank	: false,
            // store 		: 'CbLvlUsers',
            emptyText	: 'Hak Akses',
            queryMode	: 'local',
		    // displayField: 'nama',
		    valueField	: 'level',
		},{*/
			xtype		: 'textarea',
			fieldLabel	: 'Keterangan',
            name		: 'ket',

		}];
		
		me.buttons = [{
			id : 'tblsmpuser',
			text: 'Simpan',
			formBind: true, 
			disabled: true
        },{
        	id : 'tbledituser',
        	text: 'Edit',
			formBind: true,
			disabled: true,
			hidden : true
			
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpuser').setVisible(true);
        		Ext.getCmp('tbledituser').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});