Ext.define('rcm.view.konfig.DetailLokasi', {
    extend: 'Ext.form.Panel',
    xtype: 'panLokasi',

	bodyPadding: 10,  // Don't want content to crunch against the borders
    //width: 300,
    
    defaultType: 'textfield',
    defaults: {
		width: 400
	},
    // title: 'Filters',
    initComponent: function() {
		var me = this;
		me.items = [{
				//xtype: 'textfield',
				fieldLabel: 'Nama',
				name: 'nama',
				//width: 400
				//disabled: true
			},{
				//xtype: 'textfield',
				fieldLabel: 'Fuction Location',
				name: 'floc'
			},{
				//xtype: 'textfield',
				fieldLabel: 'Tag',
				name: 'tag',
				//width: 400
				//disabled: true
			},{
				xtype: 'numberfield',
				fieldLabel: 'No urut',
				name: 'urut',
				//width: 400
			},{
				//xtype: 'textfield',
				fieldLabel: 'Kode',
				name: 'kode',
				//width: 400
				//disabled: true
			},{
				//xtype: 'textfield',
				fieldLabel: 'Running Hour init',
				name: 'rhinit'
				//disabled: true
			
		}];
		me.callParent(arguments);
    }

});
