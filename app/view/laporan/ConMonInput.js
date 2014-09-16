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
		ed=Ext.create('Ext.grid.plugin.RowEditing');
		
		me.plugins = [ed];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false,
			},
			items : [{ xtype:'rownumberer',width:25 },
						{header : 'Tanggal', width : 100,dataIndex : 'tgl',xtype : 'datecolumn', editor : 'datefield', format : 'd-m-Y'},
						{header : 'Lokasi', width : 150,dataIndex : 'lokasi', editor :{
							xtype		:'combobox',
							id			: 'cb_parent1',
							store 		: 'CbParent',
							name		: 'lokasi',
							displayField: 'nama',
							queryMode 	: 'local',
							listeners: {
								'select' : me.pilihLokasi
							}
							
						}},
						{header : 'Unit',width : 150,dataIndex : 'unit',editor :{
							xtype		:'combobox',
							emptyText 	: 'Unit',
							id			: 'cb_unit1',
							store 		: 'CbUnit',
							displayField: 'unit',
							queryMode 	: 'local',
							listeners: {
								'select' : me.pilihUnit
							}
						}},
						{header : '#WO',flex : 1,dataIndex : 'wo',editor : 'textfield'},
						{header : '#SAP',flex : 1,dataIndex : 'sap',editor : 'textfield'},
						{header : 'Laporan',flex :1,dataIndex : 'url',editor : 'textfield'},
						{header : 'Eksekutor',flex : 1,dataIndex : 'pic',editor : 'textfield'},
						{header : 'Keterangan',flex : 2,dataIndex : 'ket',editor : 'textfield'},
			{
				xtype:'actioncolumn',
				width:25,iconCls: 'editEvent',
				menuDisabled: true,
				sortable: false,// hidden : true,
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
			'recordedit',
			'isiedit'
		);
		
        ed.on('edit', me.hdlGridRowEdit, this);
	},
	hDeleteConMonClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        this.fireEvent('deleteconmon', gridView, rowIndex, colIndex, column, e);
    },
	hEditConMonClick: function(gridView, rowIndex, colIndex, column, e) {
		var rec = gridView.getStore().getAt(rowIndex);
        // Fire a "deleteclick" event with all the same args as this handler
        // this.fireEvent('editconmon', gridView, rowIndex, colIndex, column, e);
        this.fireEvent('editconmon', rec,e);
    },
	/*
	handleCellEdit: function(editor, e) {
        this.fireEvent('isiedit', e.record);
    },
	*/
	hdlGridRowEdit: function(gridView, e) {
        var rec = e.grid.getStore().getAt(e.rowIdx); //tt=e.field;
		console.log('id lokasi : '+rec.get('id_lokasi')+', id row grid : '+rec.get('id')+' di field: -> '+e.field+', dengan value : '+e.value+ ' ,di unit id : '+rec.get('id_unit')+' unitnya: '+rec.get('unit'));
		//console.log("handleCellEdit tipe: "+rec.get('tipe')+", nilai: "+e.value+', bulan: '+e.field);
		// this.fireEvent('isiedit',e,e.value,e.field,rec.get('id'),'2014' );
		this.fireEvent('isiedit',e, rec.get('id_lokasi'));
		
		},
	
	pilihLokasi : function(combo, value){
		// rcmSettings.cccccc = records;
		// rcmSettings.dddddd = value;
		// console.log(records.value())
		var rec = combo.getValue();
		// console.log(combo.getValue());
		this.fireEvent('plhLokasi', rec);
	},
	
	pilihUnit : function(gridView, record){
		// rcmSettings.dddddd = record;
		// console.log(record[0].get('id_unit'));
		var unit = record[0].get('id_unit')
		this.fireEvent('plhUnit', unit);
	}
	
	
	
});