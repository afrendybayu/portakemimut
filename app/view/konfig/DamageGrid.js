Ext.define('rcm.view.konfig.DamageGrid', {
	extend: 'Ext.grid.Panel',

	xtype: 'gridDamage',
	
	initComponent: function() {
		var me =this;
		
		me.store = 'Damages';
		
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
				// hidden: me.hiden1
			},{ 
				header		: 'Nama Damage',
				dataIndex	: 'nama',
				// hidden		: me.hidegrid1,
				flex:1
				 
			},{ 
				header		: 'Kode Damage',
				dataIndex	: 'kode',
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
		this.fireEvent('DamageGridDel', rec);
    },
});