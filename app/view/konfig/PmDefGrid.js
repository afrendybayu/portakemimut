Ext.define('rcm.view.konfig.PmDefGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridPmDef',
	
	
	
	initComponent: function() {
		var me =this;
		
		me.store = 'FormPmDefs';
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				
			},{ 
				header		: 'Nama PM',
				dataIndex	: 'nama',
				flex:1
				 
			},{ 
				header		: 'Kode PM',
				dataIndex	: 'kode',
				flex:1
			},{
				header		: 'Durasi',
				dataIndex	: 'durasi',
				flex:1
			},{
				header		: 'Keterangan',
				dataIndex	: 'ket',
				flex:1
			},{
				xtype		:'actioncolumn',
				width		:25,
				// id 			: 'conmondel', 
				iconCls		: 'hpsEvent',
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
		this.fireEvent('PmDefGridDel', rec);
    },
});