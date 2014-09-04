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
				editor : 'datefield',
				format : 'Y-m-d'
			},{
				header : 'Lokasi',
				flex : 1,
				// width : 75,
				dataIndex : 'lokasi',
				editor : 'textfield',
				
				
				
			},{
				header : 'Unit',
				flex : 1,
				// width : 75,
				
				dataIndex : 'unit',
			},{
				header : '#WO',
				flex : 1,
				// width : 75,
				dataIndex : 'wo',
				editor : 'textfield'
			},{
				header : '#SAP',
				flex : 1,
				// width : 50,
				dataIndex : 'sap',
				editor : 'textfield'
			},{
				header : 'Laporan',
				flex :1,
				// width : 100,
				dataIndex : 'url'
			},{
				header : 'Eksekutor',
				flex : 1,
				// width : 75,
				dataIndex : 'pic',
				editor : 'textfield'
			},{
				header : 'Keterangan',
				flex : 2,
				// width : 150,
				dataIndex : 'ket',
				editor : 'textfield'
			},{
				xtype:'actioncolumn',
				width:25,
				iconCls: 'editEvent',
				// hidden : true,
				tooltip: 'Edit',
				// handler: Ext.bind(me.hdlHapusDGClick, me)
			},{
				xtype:'actioncolumn',
				width:25,
				iconCls: 'hpsEvent',
				// hidden : true,
				tooltip: 'Hapus',
				// handler: Ext.bind(me.hdlHapusDGClick, me)
				
			
			}]
		};
		me.callParent(arguments);
		/*me.addEvents(
			'edit',
			'plhOPartGagal',
			'plhEquipGagal',
			'plhModeGagal',
			'plhCauseGagal',
			'plhAksiGagal',
			'hpsFMEAGagal'
        );
        ed.on('edit', me.handleCellEdit, this);*/
	}
	
	
	
});