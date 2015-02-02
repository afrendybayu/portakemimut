Ext.define('rcm.view.laporan.ContractList', {
    extend: 'Ext.grid.Panel',
	xtype: 'iContx',
	
	requires : ['rcm.view.laporan.ContractForm'],
	store: 'SrKontrak',

	
	enableColumnHide: false,
	features: [{ftype: 'filters',local: true }],
	//*
	dockedItems: [{
            xtype: 'tContrxF',
            dock: 'top',
            weight: 101,
            bodyStyle: {
                'background-color': '#E4E5E7'
            }
        }
    ],
	//*/
	
	initComponent: function() {
		var me=this; 
		// rmode = 'rowmodel'; 
		var edit = Ext.create('Ext.grid.plugin.RowEditing',{
			clicksToEdit: 2, 
			autoCancel : true 
			// hideTooltip: true
		});
		me.selType = 'rowmodel';
		
		me.plugins = [edit];
		
		
		/*
		me.listeners = {
            'selectionchange': function(view, records) {
                //grid.down('#removeEmployee').setDisabled(!records.length);
                //alert("jos <!!");
                console.log(records);
            }
        };
		//*/	
		me.columns = {
			defaults : {
				draggable: false,
				//resizable: false,
				hideable: false
			},
			items : [{
					header:'No',xtype:'rownumberer',width:35 
				},{
					header : 'No Kontrak',dataIndex : 'noCont',width:120, filter: { type: 'string' }
						,editor: {
							allowBlank: false,
							xtype: 'textfield'
						}
				},{
					header : 'Vendor',dataIndex : 'noVend',width:120, filter: { type: 'string' }
						,editor: {
							allowBlank: false,
							xtype: 'textfield'
						}
				},{
					header:'Tanggal Awal',minWidth:110,dataIndex : 'tgl'
						,renderer : Ext.util.Format.dateRenderer('j M Y')
						,editor: {
							allowBlank: false,
							submitFormat: 'Y-m-d',
							format: 'j M Y',
							xtype: 'datefield'
						}
				},{
					header:'Tanggal Akhir',minWidth:110,dataIndex : 'tgl'
						,renderer : Ext.util.Format.dateRenderer('j M Y')
						,editor: {
							allowBlank: false,
							submitFormat: 'Y-m-d',
							format: 'j M Y',
							xtype: 'datefield'
						}
				},{
					header : 'Keterangan',dataIndex : 'ket',flex: 1, filter: { type: 'string' }
						,editor: {
							//allowBlank: false
							xtype: 'textfield'
						}
					/*
					,editor:{
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
						
					}
					//*/
				/*
				},{
					header:'Tipe', minWidth:200, dataIndex: 'cat', filter: { type: 'string' }
						,editor: {
							allowBlank: false,
							xtype:'combobox',
							store: 'SapCatH',
							name		: 'cat',
							displayField: 'nama',
							valueField 	: 'id',
							queryMode 	: 'local'
						}
						,renderer: me.renderCH
				//*/
				},{
					header:'Anggaran',minWidth:200,dataIndex:'nilai',renderer:'usMoney', filter: { type: 'string' }
						,editor: {
							allowBlank: false,
							xtype: 'textfield'
						}
				},{
					header:'Terpakai',minWidth:200,dataIndex:'used',renderer:'usMoney', filter: { type: 'string' }
				},{
					header:'Sisa',minWidth:200,dataIndex:'sisa',renderer:'usMoney', filter: { type: 'string' }
				
				},{
					header:'ID',dataIndex:'id',width:35, hidden: true
				},{
					xtype:'actioncolumn',
					width:25,
					//id 			: 'ohdel', 
					iconCls: 'icon-downtime',
					//text: 'Cek PO',
					sortable: false,
					//visible: true,
					tooltip: 'Cek PO',
					//disabled: true,
					//hidden : true,
					handler: Ext.bind(me.OhGridDelete, me)
				},{
					xtype		:'actioncolumn',
					width		:25,
					//id 			: 'ohdel', 
					iconCls		: 'hpsEvent',
					sortable	: false,
					visible		: false,
					tooltip		: 'Hapus',
					//disabled: true,
					//hidden : true,
					handler		: Ext.bind(me.OhGridDelete, me)
							
			
			}]
		};
		me.callParent(arguments);
		// me.addEvents(		);
		
		edit.on('edit', me.hdlGridRowEdit, this);
		//edit.on('edit', me.hdlGridOHEdit, this);
		//edit.on('beforeedit', me.GridEditEna, this);
	},
	
	
	OhGridDelete: function(gridView, rowIndex, colIndex, column, e) {
		var isi = gridView.getStore().getAt(rowIndex);
		//console.log (isi);
		this.fireEvent('delSContract', isi);
    },
	
	hdlGridRowEdit: function(rec, e)	{
		var rec = e.newValues;
		rec.id = e.record.get('id');
		this.fireEvent('updSContract',rec);
	},
	
	renderCH: function(val) {
		var stCatH = Ext.getStore('SapCatH'),
			node = val ? stCatH.getById(val) : "--";
		//console.log(node);
		return node.get('nama');
    }
	
});
