Ext.define('rcm.view.laporan.OverHaulInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iOverHaul',
	requires : ['rcm.view.laporan.OverHaulForm'],
	store: 'OverHaulIn',
	idunit 	: '',
	ideq	: '',
	idoh	: '',
	
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
		edit = Ext.create('Ext.grid.plugin.RowEditing',{
			clicksToEdit: 2, 
			autoCancel : true 
			// hideTooltip: true
		});
		// me.selType = rmode;
		me.plugins = [edit];
				
		me.columns = {
			defaults : {
				draggable: false,
				resizable: false,
				hideable: false
			},
			items : [	{header : 'No', xtype:'rownumberer',width:25 },
						{header : 'Order No',width : 100,dataIndex : 'wo', editor: {allowBlank: false}},
						{header : 'Lokasi',width : 250,dataIndex : 'lokasi', editor:{
							xtype		:'combobox',
							editable	: false,
							allowBlank	: false,
							store 		: 'CbParent',
							name		: 'lokasi',
							displayField: 'nama',
							valueField 	: 'nama',
							queryMode 	: 'local',
							listeners: {
								select: function(combo, records, eOpts ) {
									me.plhcblok(records);
								}
							}
						
						}},
						{header : 'Unit',width:250,dataIndex : 'unit',editor:{
							xtype		:'combobox',
							editable	: false,
							allowBlank	: false,
							store 		: 'CbUnit',
							name		: 'unit',
							displayField: 'unit',
							valueField 	: 'unit',
							queryMode 	: 'local',
							listeners: {
								select: function(combo, records, eOpts ) {
									me.plhcbunit(records);
								}
							}
						
						}},
						{header : 'Equip',flex : 1,dataIndex : 'equip',editor:{
							xtype		:'combobox',
							editable	: false,
							allowBlank	: false,
							store 		: 'CbEquip',
							name		: 'equip',
							displayField: 'eq',
							valueField 	: 'eq',
							queryMode 	: 'local',
							listeners: {
								select: function(combo, records, eOpts ) {
									me.plhcbequip(records);
								}
							}
						}},
						{header : 'Tanggal', width : 100,dataIndex : 'tglplan',xtype : 'datecolumn', format : 'd-m-Y',editable : false, editor:{
							xtype		: 'datefield',
							name		: 'tglplan',
							format		: 'd-m-Y',
							// submitFormat : 'Y-m-d',
							editable	: false,
							allowBlank	: false
						}},
						{header : 'Durasi',width : 100,dataIndex : 'durasiplan',editor : {
							xtype		:'numberfield',
							allowBlank	: false,
							name		: 'durasiplan',
							maxValue	: 360,
							minValue	: 1
						}},
						{
							xtype		:'actioncolumn',
							width		:50,
							id 			: 'ohdel', 
							iconCls		: 'hpsEvent',
							sortable	: false,
							visible		: false,
							tooltip		: 'Hapus',
							disabled: true,
							//hidden : true,
							handler		: Ext.bind(me.OhGridDelete, me)
							
			
					}]
		};
		me.callParent(arguments);
		// me.addEvents(		);
		
        edit.on('edit', me.hdlGridOHEdit, this);
		// ed.on('beforeedit', me.GridEditEna, this);
	},
	
	
	OhGridDelete: function(gridView, rowIndex, colIndex, column, e) {
		var isi = gridView.getStore().getAt(rowIndex);
		// console.log (isi);
		this.fireEvent('deleteOverHaul', isi);
    },
	

	hdlGridOHEdit: function(record, e){
		// console.log (e);
		rcmSettings.eeeee = e;
		// rcmSettings.rrrrr = record;
		// console.log('id equip : '+e.record.get('id_equip')+' , id oh : '+e.record.get('oh'));
		
		var rec = e.newValues;
		// rec.id_unit = this.idunit == ''? e.record.get('id_unit') : this.idunit;
		rec.id_equip = this.ideq == ''? e.record.get('id_equip') : this.idunit;
		rec.oh = this.idoh == ''? e.record.get('oh') : this.idoh;
		rec.id = e.record.get('id'); //rec.oh = e.grid.idoh; //rec.id_equip = e.grid.ideq;
		// console.log (rec.id);
		
		this.fireEvent('updateoh',rec);
	
	},
	plhcblok : function(record){
		var lks = record[0].data.id;
		// console.log ('edit kode lokasi '+ lks);
		this.fireEvent('edohplhlokasi',lks);
		// console.log (n.get('kode'));
	},
	
	plhcbunit: function(record){
		var unt = record[0].data.id_unit;
		// console.log ('edit kode unit '+ unt);
		this.fireEvent('edohplhunit',unt);
		// console.log ('kode id_unit : '+unt);
		
	},
	
	plhcbequip: function(record){
		var eqp = record[0].data.id_eq;
		var ohid = record[0].data.id_oh
		// console.log ('edit kode equip '+ eqp +' edit kode ohid : '+ohid);
		this.fireEvent('edohplheq',eqp,ohid);
	}
	
});
