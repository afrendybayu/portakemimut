Ext.define('rcm.view.konfig.DamageForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fDamage',
	
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
			fieldLabel	: 'Nama Damage',
            name		: 'nama',
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Damage',
            name		: 'kode',
            allowBlank	: true
		}];
		
		me.buttons = [{
			text: 'Simpan',
			formBind: true, 
			disabled: true
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	text: 'Edit',
			formBind: true,
			disabled: true
			// handler : function(){
			// 		onChange(newVal, oldVal) {
	  //               alert(newVal);
   //          	}	
			// }
			
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});
