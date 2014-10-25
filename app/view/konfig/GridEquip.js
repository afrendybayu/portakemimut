Ext.define('rcm.view.konfig.GridEquip', {
	extend: 'Ext.grid.Panel',

	xtype: 'tGridKEq',
	xstore 		: '',
	
	initComponent: function() {
		var me =this;
		
		me.store = me.xstore;		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:45, 
				header : 'No'
			},{ 
				header		: 'Lokasi',
				dataIndex	: 'ket',
				minWidth:120
			},{ 
				header		: 'Nama',
				dataIndex	: 'nama',
				minWidth:350
			},{
				header		: 'Tag',
				dataIndex	: 'kode',
				flex:1
			}]
		};
		me.callParent(arguments);
	
	}
});
