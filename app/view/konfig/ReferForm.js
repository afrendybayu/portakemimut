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
            width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Referensi',
            name		: 'kode',
            width		: 400
            // allowBlank	: true
		}];
		
		me.buttons = [{
			id : 'tblsmprefer',
			text: 'Simpan',
			formBind: true, 
			disabled: true
        },{
        	id : 'tbleditrefer',
        	text: 'Edit',
			formBind: true,
			disabled: true,
			hidden	: true
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmprefer').setVisible(true);
        		Ext.getCmp('tbleditrefer').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});