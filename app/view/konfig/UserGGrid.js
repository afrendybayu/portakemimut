Ext.define('rcm.view.konfig.UserGGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridUserList',

	initComponent: function() {
		var me =this;
		
		me.store = 'Users';
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header		: 'Nama',
				dataIndex	: 'nama',
				// hidden		: me.hidegrid1,
				flex:1
				 
			},{ 
				header		: 'UserID',
				dataIndex	: 'userid',
				// hidden		: me.hidegrid2,
				// width:60
				flex:1
			
			/*},{
				header		: 'Password',
				dataIndex	: 'pass',
				// hidden		: me.hidegrid2,
				// width:60
				flex:1*/
			
			},{
				header		: 'Akses',
				dataIndex	: 'akses',
				// hidden		: me.hidegrid2,
				// width:60
				flex:1
			
			},{
				header		: 'Keterangan',
				dataIndex	: 'ket',
				// hidden		: me.hidegrid2,
				// width:60
				flex:1
			
			},{
				
				xtype		:'actioncolumn',
				width		:25,
				// id 			: 'conmondel', 
				iconCls		: 'hpsEvent',
				// menuDisabled: true,
				//sortable	: false,
				//visible		: false,
				//disabled: true,
				tooltip		: 'Hapus',
				handler		: Ext.bind(me.dhlGridDel, me)
			}]
		};
		
		me.callParent(arguments);
	
	},
	dhlGridDel: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        // 
		var rec = gridView.getStore().getAt(rowIndex);
		// console.log (rec);
		this.fireEvent('UserGridDel', rec);
    }
});