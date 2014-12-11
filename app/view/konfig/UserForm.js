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
	defaults: {
    	width : 400
    },

	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama',
            name		: 'nama',
            allowBlank	: false
		},{
			fieldLabel	: 'User ID',
            name		: 'userid',
            allowBlank	: false
		},{
			fieldLabel	: 'Password',
            name		: 'pass',
           	inputType	: 'password',
           	allowBlank	: false
        },{
        	xtype		: 'fieldcontainer',
            fieldLabel	: 'Level Akses',
            layout: 'hbox',
            items		: [{
            	xtype		: 'combobox',
            	flex		: 3,
	            name		: 'akses',
	           	editable	: false,
	            allowBlank	: false,
	            store 		: 'CbLvlUsers',
	            emptyText	: 'Hak Akses',
	            queryMode	: 'local',
			    displayField: 'nama',
			    valueField	: 'level',
			    allowBlank	: false
			},{
				xtype	: 'checkboxfield',
	            name	: 'active',
	            // checked: true,
	            inputValue : 1,
	            margins: '0 0 0 10',
	            boxLabel: 'Aktif',
	            flex : 1
            }]

			
		/*},{
			fieldLabel	: 'Aktif',
            name		: 'active',
           	xtype		: 'checkboxfield',
           	allowBlank	: false,
           	items: [{
                    // boxLabel  : 'Anchovies',
                    name      : 'active',
                    inputValue: '1',
                    id        : 'checkbox1'
                }]*/
           	
        },{
			xtype		: 'textarea',
			fieldLabel	: 'Keterangan',
            name		: 'ket'

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
