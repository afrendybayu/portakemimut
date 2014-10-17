Ext.define('rcm.view.konfig.GridL', {
	extend: 'Ext.grid.Panel',

	xtype: 'tKGridL',
	
	xstore 		: '',

	initComponent: function() {
		var me =this;
		
		me.store = me.xstore;
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header		: 'Nama',
				dataIndex	: 'nama',
				width:100
			},{ 
				header		: 'Kode',
				dataIndex	: 'kode',
				flex:1
			}]
		};
		
		me.callParent(arguments);
	
	}
});
