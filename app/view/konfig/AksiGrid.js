Ext.define('rcm.view.konfig.AksiGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridAksi',
	
	akstore : 'GridAksi',
	// store : 'GridAksi',
	
	initComponent: function() {
		var me =this;
		
		me.store = me.akstore;
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
			},{ 
				header:'Nama Aksi',
				dataIndex:'nama',
				width:60 
			},{ 
				header:'Ket Aksi',
				dataIndex:'ket',
				flex:1
			}]
		};
		
		me.callParent(arguments);
	
	}
});