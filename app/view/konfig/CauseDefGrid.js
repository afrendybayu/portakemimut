Ext.define('rcm.view.konfig.CauseDefGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridCauseDef',
	
	initComponent: function() {
		var me = this;
		me.store = 'Causes';
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header		: 'Nama Cause',
				dataIndex	: 'nama',
				// hidden		: me.hidegrid1,
				flex:1
				
			},{ 
				header		: 'Kode Cause',
				dataIndex	: 'kode',
				// hidden		: me.hidegrid2,
				// width:60
				width: 120
			},{
				xtype		: 'checkcolumn',
				header		: 'Obama',
				dataIndex	: 'obama',
				// hidden		: me.hidegrid3,
				// width:60
				//flex:1,
				width:60,
				listeners: { beforecheckchange: function () { return false; } }
			},{
				xtype		:'checkcolumn',
				header		: 'SAP',
				dataIndex	: 'sap',
				
				// hidden		: me.hidegrid4,
				// width:60
				//flex:1,
				width:60,
				listeners: { beforecheckchange: function () { return false; } }
			},{
				header		: 'Keterangan',
				dataIndex	: 'ket',
				
				// hidden		: me.hidegrid4,
				// width:60
				flex :3

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
		//console.log (rec);
		this.fireEvent('CauseGridDel', rec);
    }
});
