Ext.define('rcm.view.konfig.AksiGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridAksi',
	
	akstore : 'GridAksi',
	// store : 'GridAksi',
	kol1	: '',
	kol2	: '',
	// kol3	: '',
	hiden1	: '',
	hiden2	: '',
	// hiden3	: '',
	
	initComponent: function() {
		var me =this;
		
		me.store = me.akstore;
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header:me.kol1,
				dataIndex:'nama',
				hidden: me.hiden1,
				flex:1
				 
			},{ 
				header:me.kol2,
				dataIndex:'ket',
				hidden: me.hiden2,
				// width:60
				flex:1
			}]
		};
		
		me.callParent(arguments);
	
	}
});