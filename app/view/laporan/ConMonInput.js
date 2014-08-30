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
		/*me.listeners = {
			'cellclick' : me.rowFMEAclick
		},//*/
		
		
		/*me.dockedItems= [{
		xtype: 'toolbar',
			items: {
				iconCls: 'add',
				text: 'Tambah',
				//scope: this,
				//handler: this.onAddClick
			}
		}],*/
		
		me.columns = [
			{ xtype:'rownumberer',width:25 
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
				/*editor : {
					xtype : 'combo',
					store : 'CbParent',
					emptyText	: 'Loc',
					queryParam 	: 'lokasi',
					name		: 'lokasi',
					displayField: 'nama',
					valueField 	: 'kode',
					queryMode 	: 'local'
				
				/*
				editor: {
				xtype: 'combo', store: 'Equip',editable: false,	emptyText: 'Pilih Equipment... ', flex:1,
				queryParam: 'tipe',name : 'eql',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihEquipGagal(record,list); } } }
						}*/
				//},
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
				hideable : false,
				tooltip: 'Edit',
				// handler: Ext.bind(me.hdlHapusDGClick, me)
			},{
				xtype:'actioncolumn',
				width:25,
				iconCls: 'hpsEvent',
				// hidden : true,
				hideable : false,
				tooltip: 'Hapus',
				// handler: Ext.bind(me.hdlHapusDGClick, me)
				
			
			/*},{ text: "Equipment", dataIndex: 'eql', width:150, /*editor: {
				xtype: 'combo', store: 'Equip',editable: false,	emptyText: 'Pilih Equipment... ', flex:1,
				queryParam: 'tipe',name : 'eql',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihEquipGagal(record,list); } } }
			} },
			{ text: "Object Part", dataIndex: 'opart', flex:1,width:250, /*editor: {
				xtype: 'combo', editable: false, emptyText: 'Pilih Object Part.. ', store: 'OPart',queryMode: 'local',
				queryParam: 'tipe',name : 'opart',displayField: 'nama',valueField: 'nama',
				listConfig: { listeners: { itemclick: function(list,record) { me.pilihOPartGagal(record, list); } } }
			} },
			{ text: "Failure Mode", dataIndex: 'mode', width:200,editor: {
				xtype: 'combo', store: 'FMode',editable: false,	emptyText: 'Pilih Mode... ',queryMode: 'local',
				queryParam: 'tipe',name : 'mode',displayField: 'nama',valueField: 'nama',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihModeGagal(record,list); } } }
			} },
			{ text: "Cause", dataIndex: 'cause', width:200, editor: {
				xtype: 'combo', store: 'Cause',editable: false,	emptyText: 'Pilih Penyebab... ',
				queryParam: 'tipe',name : 'cause',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihCauseGagal(record); }}, 
				getInnerTpl: function() {	return '<div data-qtip="{nama}: {ket}">{nama}</div>'; }}
			} },
			{ text: "Tindakan", dataIndex: 'aksi', width:100, editor: {
				xtype: 'combo', store: 'Aksi',editable: false,	emptyText: 'Pilih Tindakan... ',
				queryParam: 'tipe',name : 'aksi',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihAksiGagal(record); } } }
			} },
			{ xtype:'actioncolumn',	width:25,
				//icon: 'modul/icons/delete.gif', 
				iconCls:  'hpsEvent',
				tooltip: 'Hapus Analisa Event',
				handler: Ext.bind(me.hdlHapusFMEAClick, me)
				/*
				handler: function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					alert("Hapus " + rec.get('eql'));
					grid.getStore().removeAt(rowIndex);
				}
				//*/
		}],
		
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