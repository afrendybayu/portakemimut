Ext.define('rcm.view.laporan.ConMonInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iConMon',
	requires : ['rcm.view.laporan.ConMonForm', 'Ext.grid.RowEditor'],
	store: 'ConMonIn',
	id 	: 'frmicmon' ,
    //columnLines: true,
	idunit: '',
	ngedit: 0,
	enableColumnHide: false,
	
	
	
	
	dockedItems: [
        {
            xtype: 'taskConMon',
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
			autoCancel : true
			// hideTooltip: true
		});
		me.selType = rmode;
		me.plugins = [ed];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false
			},
			items : [{ xtype:'rownumberer',width:25 },
						{header : 'Tanggal', width : 100,dataIndex : 'tgl',xtype : 'datecolumn', format : 'd-m-Y',editable : false, editor : { xtype : 'datefield', format: 'd-m-Y', allowBlank: false}},
						{header : 'Lokasi', width : 150,dataIndex : 'lokasi', editor :{
							xtype		:'combobox',
							store 		: 'CbParent',
							name		: 'lokasi',
							editable	: false,
							displayField: 'nama',
							valueField 	: 'nama',
							allowBlank	: false,
							queryMode 	: 'local',
							listConfig : {
								listeners	:{itemclick : function(list, record){ me.pilihLokasi(record);}}
							}
							
						}},
						{header : 'Unit',width : 180,dataIndex : 'unit',editor :{
							xtype		:'combobox',
							emptyText 	: 'Unit',
							store 		: 'CbUnit',
							editable 	: false,
							allowBlank	: false,
							displayField: 'unit',
							// valueField : 'id_unit',
							queryMode 	: 'local',
							listConfig: { 
								listeners: { itemclick : function(list, record){ me.pilihUnit(record);}} 
							}
							
						}},
						{header : '#WO',width : 70,dataIndex : 'wo',editor : {allowBlank: false}},
						{header : '#SAP',width : 70,dataIndex : 'sap',editor : {allowBlank: false}},
						//{header : 'Laporan',width : 150,dataIndex : 'url',editor : 'textfield'},
						{header : 'Eksekutor',width : 150,dataIndex : 'pic',editor : {allowBlank: false}},
						{header : 'Keterangan',flex : 1,dataIndex : 'ket',editor : 'textfield'},
			/*{
				xtype:'actioncolumn',
				width:25,iconCls: 'editEvent',
				menuDisabled: true,
				sortable: false,// hidden : true,
				tooltip: 'Edit',
				handler: Ext.bind(me.hEditConMonClick, me)
			},*/{
				xtype		:'actioncolumn',
				width		:25,
				id 			: 'conmondel', 
				iconCls		: 'hpsEvent',
				// menuDisabled: true,
				//sortable	: false,
				//visible		: false,
				//disabled: true,
				tooltip		: 'Hapus',
				handler		: Ext.bind(me.hDeleteConMonClick, me)
				
			
			}]
		};
		me.callParent(arguments);
		me.addEvents(
			
		);
		
        ed.on('edit', me.hdlGridRowEdit, this);
		ed.on('beforeedit', me.GridEditEna, this);
	},
	hDeleteConMonClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
        // 
		var rec = gridView.getStore().getAt(rowIndex);
		// console.log (rec);
		this.fireEvent('deleteconmon', rec);
    },
	
	GridEditEna : function(editor,a,eOpts)	{
		//alert(this.ngedit);
		if (this.ngedit)	return true;
		else return false;
	},
	
	
	hdlGridRowEdit : function(record, e){
		// rcmSettings.aaddddaa = record;
		// rcmSettings.aaddddcc = e;
		
		var rec = e.newValues; //idx = e.record.get('id'),
		/*
		if (this.idunit == ''){
			rec.id_unit = e.record.get('id_unit')
		} else {
			rec.id_unit = this.idunit
		} */
		rec.id_unit = this.idunit == ''? e.record.get('id_unit') : this.idunit;
		rec.id = e.record.get('id');
		// console.log('isi id_unit : '+rec.id_unit);
		// console.log('id '+idx);
		this.fireEvent('updatecm',rec);
		
	},

	// pilihLokasi : function(combo, value){
	pilihLokasi : function(record){
		// console.log(record)
		var rec = record.data.id;
		// console.log(rec);
		this.fireEvent('plhLokasi', rec);
	},
	
	pilihUnit : function(record){
		// console.log(record);
		var unit = record.data.id_unit;
		this.fireEvent('plhUnit', unit);
	}
	
	
	
});
