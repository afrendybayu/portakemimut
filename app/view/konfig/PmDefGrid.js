Ext.define('rcm.view.konfig.PmDefGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridPmDef',
	
	xstore 		: '',
	kolgrid1	: '',
	kolgrid2	: '',
	kolgrid3	: '',
	idgrid1		: '',
	idgrid2		: '',
	idgrid3		: '',
	hidegrid1	: '',
	hidegrid2	: '',
	hidegrid3	: '',
	
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
				header		: me.kolgrid1,
				dataIndex	: me.idgrid1,
				hidden		: me.hidegrid1,
				flex:1
				 
			},{ 
				header		: me.kolgrid2,
				dataIndex	: me.idgrid2,
				hidden		: me.hidegrid2,
				// width:60
				flex:1
			},{
				header		: me.kolgrid3,
				dataIndex	: me.idgrid3,
				hidden		: me.hidegrid3,
				// width:60
				flex:1
			},{
				header		: me.kolgrid4,
				dataIndex	: me.idgrid4,
				hidden		: me.hidegrid4,
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
				handler		: Ext.bind(me.dhlPmDefGridDel, me)
			}]
		};
		
		me.callParent(arguments);
	
	},
	dhlPmDefGridDel: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        // 
		var rec = gridView.getStore().getAt(rowIndex);
		// console.log (rec);
		this.fireEvent('PmDefGridDel', rec);
    },
});