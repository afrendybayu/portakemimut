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
	lnama:'',lkode:'',lket:'',ljab:'',lckbox:'',lckbox1:'',lckbox2:'',luserid:'',lpwd:'',ldur:'',
	nmnama:'',nmkode:'',nmket:'',nmjab:'',nmckbox1:'',nmckbox2:'',nmuserid:'',nmpwd:'',nmdur:'',
	hidnama:'',hidkode:'',hidket:'',hidjab:'',hidckbox:'',hiduserid:'',hidpwd:'',hiddur:'',
	blanknama:'',blankkode:'',blankjab:'',blankldur:'',blankket:'',blankuid:'',blankpwd:'',
	
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: me.lnama,
            name		: me.nmnama,
			hidden		: me.hidnama,
            allowBlank	: me.blanknama
		},{
			fieldLabel	: me.lkode,
            name		: me.nmkode,
			hidden		: me.hidkode,
            allowBlank	: me.blankkode
		},{
			xtype		: 'combobox',
			fieldLabel	: me.ljab,
            name		: me.nmjab,
			hidden		: me.hidjab,
            allowBlank	: me.blankjab
		},{
			fieldLabel	: me.ldur,
            name		: me.nmdur,
			hidden		: me.hiddur,
            allowBlank	: me.blankldur,
		},{
			xtype		: 'checkboxgroup',
            fieldLabel	: me.lckbox,
			columns		: [70, 70],
			hidden		: me.hidckbox,
			items: [{
				boxLabel: me.lckbox1, 
				name: me.nmckbox1
			},{
				boxLabel: me.lckbox2, 
				name: me.nmckbox2, 
				// checked: true
			}]	
		},{
			fieldLabel	: me.lket,
            name		: me.nmket,
			hidden		: me.hidket,
            allowBlank	: me.blankket
		},{
			fieldLabel	: me.luserid,
            name		: me.nmuserid,
			hidden		: me.hiduserid,
            allowBlank	: me.blankuid
		},{
			fieldLabel	: me.lpwd,
            name		: me.nmpwd,
			inputType	: 'password',
			hidden		: me.hidpwd,
            allowBlank	: me.blankpwd
		}];
		
		me.buttons = [{
			text: 'Save',
			formBind: true, //only enabled once the form is valid
			disabled: true,
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
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