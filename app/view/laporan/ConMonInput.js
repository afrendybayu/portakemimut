Ext.define('rcm.view.laporan.ConMonInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iConMon',
	requires : 'rcm.view.laporan.ConMonForm',
	
	
	//features: [{ftype:'grouping',startCollapsed:true,hideGroupedHeader:true}],

	store: 'ConMonIn',
    //columnLines: true,
	
	enableColumnHide: false,
	
	
	
	
	dockedItems: [
        {
            xtype: 'taskConMon',
            dock: 'top',
            // the grid's column headers are a docked item with a weight of 100.
            // giving this a weight of 101 causes it to be docked under the column headers
            weight: 101,
            bodyStyle: {
                'background-color': '#E4E5E7'
            }
        }
    ],
	
	
	initComponent: function() {
		var me=this; 
		ed=Ext.create('Ext.grid.plugin.CellEditing',{ clicksToEdit: 1	});
		
		me.plugins = [ed];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false,
			},
			items : [{ 
				xtype:'rownumberer',width:25 
			},{
				header : 'Tanggal',
				width : 100,
				dataIndex : 'tgl',
				xtype : 'datecolumn',
				// editor : 'datefield',
				format : 'Y-m-d'
			},{
				header : 'Lokasi',
				// flex : 1,
				width : 150,
				dataIndex : 'lokasi',
				// editor : 'textfield',
				
				
				
			},{
				header : 'Unit',
				// flex : 1,
				width : 150,
				
				dataIndex : 'unit',
			},{
				header : '#WO',
				flex : 1,
				// width : 200,
				dataIndex : 'wo',
				editor: {
                        xtype: 'textfield',
                        selectOnFocus: true
                    }
			},{
				header : '#SAP',
				flex : 1,
				// width : 150,
				dataIndex : 'sap',
				// editor : 'textfield'
			},{
				header : 'Laporan',
				flex :1,
				// width : 200,
				dataIndex : 'url'
			},{
				header : 'Eksekutor',
				flex : 1,
				// width : 200,
				dataIndex : 'pic',
				// editor : 'textfield'
			},{
				header : 'Keterangan',
				flex : 2,
				// width : 150,
				dataIndex : 'ket',
				// editor : 'textfield'
			},{
				xtype:'actioncolumn',
				width:25,
				iconCls: 'editEvent',
				menuDisabled: true,
				sortable: false,
				// hidden : true,
				tooltip: 'Edit',
				handler: Ext.bind(me.hEditConMonClick, me)
			},{
				xtype:'actioncolumn',
				width:25,
				iconCls: 'hpsEvent',
				menuDisabled: true,
				sortable: false,
				// hidden : true,
				tooltip: 'Hapus',
				handler: Ext.bind(me.hDeleteConMonClick, me)
				
			
			}]
		};
		me.callParent(arguments);
		me.addEvents(
			'editconmon',
			'recordedit'
		);
		
        ed.on('edit', me.handleCellEdit, this);
	},
	hDeleteConMonClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        this.fireEvent('deleteconmon', gridView, rowIndex, colIndex, column, e);
    },
	hEditConMonClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        this.fireEvent('editconmon', gridView, rowIndex, colIndex, column, e);
    },

	handleCellEdit: function(editor, e) {
        this.fireEvent('recordedit', e.record);
    },
	
	
	
});