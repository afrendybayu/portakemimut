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
	label1 	: '',
	label2 	: '',
	label3 	: '',
	label4 	: '',
	label5	: '',
	
	chklbl1 : '',
	chklbl2	: '',
	
	fname1	: '',
	fname2	: '',
	fname3	: '',
	fname4	: '',
	chkname1: '',
	chkname2: '',
	
	fhide1	: '',
	fhide2	: '',
	fhide3	: '',
	fhide4	: '',
	fhide5	: '',
	

	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: me.label1,
            name		: me.fnama1,
			hidden		: me.fhide1,
            allowBlank	: false
		},{
			fieldLabel	: me.label2,
            name		: me.fnama2,
			hidden		: me.fhide2,
            allowBlank	: false,
		},{
			fieldLabel	: me.label3,
            name		: me.fnama3,
			hidden		: me.fhide3,
            allowBlank	: false,
		},{
			xtype		: 'checkboxgroup',
            fieldLabel	: me.label5,
			columns		: [70, 70],
			hidden		: me.fhide5,
			items: [{
				boxLabel: me.chklbl1, 
				name: me.chkname1
			},{
				boxLabel: me.chklbl2, 
				name: me.chkname2, 
				// checked: true
			}]
			
		},{
			fieldLabel	: me.label4,
            name		: me.fnama4,
			hidden		: me.fhide4,
            allowBlank	: false
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