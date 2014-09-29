Ext.define('rcm.view.laporan.OverHaulInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iOverHaul',
	requires : ['rcm.view.laporan.OverHaulForm'],
	store: 'OverHaulIn',
	// id 	: 'frmicmon' ,
    //columnLines: true,
	// idunit: '',
	// ngedit: 0,
	enableColumnHide: false,

	dockedItems: [
        {
            xtype: 'taskOverHaul',
            dock: 'top',
            weight: 101,
            bodyStyle: {
                'background-color': '#E4E5E7'
            }
        }
    ],
	
	
	initComponent: function() {
		var me=this; 
		// rmode = 'rowmodel'; 
		// ed = Ext.create('Ext.grid.plugin.RowEditing',{
			// clicksToEdit: 2, 
			// autoCancel : false, 
			// hideTooltip: true
		// });
		// me.selType = rmode;
		// me.plugins = [ed];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false,
			},
			items : [	{header : 'No', xtype:'rownumberer',width:25 },
						{header : 'Order No',width : 150,dataIndex : 'wo'},
						{header : 'Equip',flex : 1,dataIndex : 'equip'},
						{header : 'Tanggal', width : 100,dataIndex : 'tglplan',xtype : 'datecolumn', format : 'd-m-Y',editable : false},
						{header : 'Durasi',width : 100,dataIndex : 'durasiplan'},
						{
							xtype		:'actioncolumn',
							width		:25,
							// id 			: 'conmondel', 
							iconCls		: 'hpsEvent',
							// menuDisabled: true,
							sortable	: false,
							visible		: false,
							tooltip		: 'Hapus',
							handler		: Ext.bind(me.OhGridDelete, me)
							
			
					}]
		};
		me.callParent(arguments);
		// me.addEvents(		);
		
        // ed.on('edit', me.hdlGridRowEdit, this);
		// ed.on('beforeedit', me.GridEditEna, this);
	},
	
	
	OhGridDelete: function(gridView, rowIndex, colIndex, column, e) {
		var isi = gridView.getStore().getAt(rowIndex);
		// console.log (isi);
		this.fireEvent('deleteOverHaul', isi);
    },
	
});