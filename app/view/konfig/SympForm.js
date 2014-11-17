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
            width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Symptom',
            name		: 'kode',
            width		: 400
            // allowBlank	: true
		}];
		
		me.buttons = [{
			id : 'tblsmpsymp',
			text: 'Simpan',
			formBind: true, 
			disabled: true
        },{
        	id : 'tbleditsymp'
        	text: 'Edit',
			formBind: true,
			disabled: true,
			hidden	: true
			
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpsymp').setVisible(true);
        		Ext.getCmp('tbleditsymp').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});