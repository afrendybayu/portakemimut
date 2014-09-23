Ext.define('rcm.view.laporan.OverHaulInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iOverHaul',
	requires : ['rcm.view.laporan.OverHaulForm'],
	// store: 'OverHaulIn',
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
		var me=this, rmode = 'rowmodel'; 
		ed = Ext.create('Ext.grid.plugin.RowEditing',{
			clicksToEdit: 2, 
			// autoCancel : false, 
			// hideTooltip: true
		});
		me.selType = rmode;
		me.plugins = [ed];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false,
			},
			items : [{ header : 'No', xtype:'rownumberer',width:25 },
						
						{header : 'Lokasi', width : 150,dataIndex : 'lokasi', editor :{
							xtype		:'combobox',
							// id			: 'cb_parent1',
							// store 		: 'CbParent',
							name		: 'lokasi',
							editable	: false,
							displayField: 'nama',
							valueField 	: 'nama',
							allowBlank	: false,
							queryMode 	: 'local',
							// listConfig : {
								// listeners	:{itemclick : function(list, record){ me.pilihLokasi(record);}}
							// }
							
						}},
						{header : 'Equip',width : 150,dataIndex : 'unit',editor :{
							xtype		:'combobox',
							emptyText 	: 'Equip',
							// id			: 'cb_unit1',
							// store 		: 'CbUnit',
							editable 	: false,
							allowBlank	: false,
							displayField: 'unit',
							// valueField : 'id_unit',
							queryMode 	: 'local',
							listConfig: { 
								listeners: { itemclick : function(list, record){ me.pilihUnit(record);}} 
							}
							
						}},
						{header : 'Order No',flex : 1,dataIndex : 'sap',editor : {allowBlank: false}},
						{header : 'Tanggal', width : 100,dataIndex : 'tgl',xtype : 'datecolumn', format : 'd-m-Y',editable : false, editor : { xtype : 'datefield', format: 'd-m-Y', allowBlank: false}},
						{header : 'Durasi',flex : 1,dataIndex : 'wo',editor : {allowBlank: false}},
						/*
						{header : 'Laporan',flex :1,dataIndex : 'url',editor : 'textfield'},
						{header : 'Eksekutor',flex : 1,dataIndex : 'pic',editor : {allowBlank: false}},
						{header : 'Keterangan',flex : 2,dataIndex : 'ket',editor : 'textfield'},
			/*{
				xtype:'actioncolumn',
				width:25,iconCls: 'editEvent',
				menuDisabled: true,
				sortable: false,// hidden : true,
				tooltip: 'Edit',
				handler: Ext.bind(me.hEditConMonClick, me)
			},*/
			{
				xtype		:'actioncolumn',
				width		:25,
				// id 			: 'conmondel', 
				iconCls		: 'hpsEvent',
				// menuDisabled: true,
				sortable	: false,
				visible		: false,
				tooltip		: 'Hapus',
				handler		: Ext.bind(me.hDeleteConMonClick, me)
				
			
			}]
		};
		me.callParent(arguments);
		me.addEvents(
			
		);
		
        // ed.on('edit', me.hdlGridRowEdit, this);
		// ed.on('beforeedit', me.GridEditEna, this);
	},
	
	
	
	
});