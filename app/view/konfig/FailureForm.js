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
			width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Failure',
            name		: 'kode',
			width		: 400,
            allowBlank	: false
		
		},{
			fieldLabel	: 'Keterangan',
            name		: 'ket',
			width		: 400,
            xtype	: 'textarea'

		}];
		
		me.buttons = [{
			id : 'tblsmpfail',
			text: 'Simpan',
			formBind: true, 
			disabled: true
            
        },{
        	id : 'tbleditfail',
            text: 'Edit',
            formBind: true, 
			disabled: true,
			hidden	: true
            //
		},{
			text: 'Batal',
			handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpfail').setVisible(true);
        		Ext.getCmp('tbleditfail').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});