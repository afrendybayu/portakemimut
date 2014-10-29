Ext.define('rcm.view.konfig.CauseDefGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridCauseDef',
	
	/*xstore 		: '',
	kolgrid1	: '',
	kolgrid2	: '',
	kolgrid3	: '',
	idgrid1		: '',
	idgrid2		: '',
	idgrid3		: '',
	hidegrid1	: '',
	hidegrid2	: '',
	hidegrid3	: '',
	
	xstore		: 'Causes',
		kolgrid1	: 'Nama Cause',
		kolgrid2	: 'Kode Cause',
		kolgrid3	: 'Obama',
		kolgrid4	: 'SAP',
		kolgrid5	: 'Keterangan',
		idgrid1		: 'nama',
		idgrid2		: 'kode',
		idgrid3		: 'obama',
		idgrid4		: 'sap',
		idgrid5		: 'ket',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: false,
		hidegrid4	: false,
		hidegrid5	: false*/

	initComponent: function() {
		var me =this;
		
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
				flex:1
			},{
				xtype		: 'checkcolumn',
				header		: 'Obama',
				dataIndex	: 'obama',
				// hidden		: me.hidegrid3,
				// width:60
				flex:1
			},{
				xtype		:'checkcolumn',
				header		: 'SAP',
				dataIndex	: 'sap',
				
				// hidden		: me.hidegrid4,
				// width:60
				flex:1
			},{
				header		: 'Keterangan',
				dataIndex	: 'ket',
				
				// hidden		: me.hidegrid4,
				// width:60
				width	: '250'

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
		this.fireEvent('CauseGridDel', rec);
    },
});