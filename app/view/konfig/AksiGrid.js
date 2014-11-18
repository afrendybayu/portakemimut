Ext.define('rcm.view.konfig.AksiGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridAksi',
	
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

	xstore		: 'FormAksis',
		kolgrid1	: 'Nama Aksi',
		kolgrid2	: 'Keterangan',
		// kolgrid3	: '',
		idgrid1		: 'nama',
		idgrid2		: 'ket',
		// idgrid3		: '',
		hidegrid1	: false,
		hidegrid2	: false,
		hidegrid3	: true,
		hidegrid4	: true*/
	
	initComponent: function() {
		var me =this;
		
		me.store = 'FormAksis';
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header		: 'Nama Aksi',
				dataIndex	: 'nama',
				flex:1
				 
			},{ 
				header		: 'Keterangan',
				dataIndex	: 'ket',
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
				handler		: Ext.bind(me.dhlAksiGridDel, me)
			}]
		};
		
		me.callParent(arguments);
	
	},
	dhlAksiGridDel: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        // 
		var rec = gridView.getStore().getAt(rowIndex);
		// console.log (rec);
		this.fireEvent('AksiGridDel', rec);
    }
});
