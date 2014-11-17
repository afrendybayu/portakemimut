Ext.define('rcm.view.konfig.DamageForm', {
	extend: 'Ext.form.Panel',

	xtype: 'fDamage',
	
    bodyPadding: 5,       
	defaultType: 'textfield',
	
	initComponent: function() {
		var me = this;
		me.items = [{
			fieldLabel	: 'Nama Damage',
            name		: 'nama',
            width		: 400,
            allowBlank	: false
		},{
			fieldLabel	: 'Kode Damage',
            name		: 'kode',
            width		: 400,
		}];
		
		me.buttons = [{
			id : 'tblsmpdamage',
			text: 'Simpan',
			formBind: true, 
			disabled: true
            // handler: function() {
                // fireEvent('SimpanAksi', args ) ;
				// alert ('simpan dulu');
				// this.up('form').getForm().isValid();
            // }
        },{
        	id : 'tbleditdamage',
        	text: 'Edit',
			formBind: true,
			disabled: true,
			hidden	: true
			// handler : function(){
			// 		onChange(newVal, oldVal) {
	  //               alert(newVal);
   //          	}	
			// }
			
        },{
            text: 'Batal',
            handler: function() {
                this.up('form').getForm().reset();
                Ext.getCmp('tblsmpdamage').setVisible(true);
        		Ext.getCmp('tbleditdamage').setVisible(false);
            }
		}];
	
		me.callParent(arguments);
	}
	
	
	
});