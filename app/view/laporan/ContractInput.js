Ext.define('rcm.view.laporan.ContractInput', {
    extend: 'Ext.grid.Panel',
	xtype: 'iContx',
	//requires : ['rcm.view.laporan.OverHaulForm'],
	store: 'SrKontrak',

	
	enableColumnHide: false,
	features: [{ftype: 'filters',local: true }],
	/*
	dockedItems: [{
            xtype: 'taskOverHaul',
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
		// me.selType = rmode;
		
		//me.plugins = [edit];
		
		
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
					header:'ID',dataIndex:'id',width:35, hidden: true
				},{
					header:'Tanggal',minWidth:110,dataIndex : 'tgl'
						,renderer : Ext.util.Format.dateRenderer('j M Y')
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
				},{
					header:'Tipe', minWidth:200, dataIndex: 'cat', filter: { type: 'string' }
						,renderer: me.renderCH
				},{
					header:'Nilai',minWidth:200,dataIndex:'nilai',renderer:'usMoney', filter: { type: 'string' }
				},{
					header : 'Keterangan',dataIndex : 'ket',flex: 1, filter: { type: 'string' }
						,editor: {
							//allowBlank: false
							xtype: 'textfield'
						}
				},{
					xtype		:'actioncolumn',
					width		:50,
					//id 			: 'ohdel', 
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
		console.log (isi);
		//this.fireEvent('deleteOverHaul', isi);
    },
	

	hdlGridOHEdit: function(record, e){
		// console.log (e);
		//rcmSettings.eeeee = e;
		// rcmSettings.rrrrr = record;
		// console.log('id equip : '+e.record.get('id_equip')+' , id oh : '+e.record.get('oh'));
		
		//console.log(record);
		var rec = e.newValues;
		rec.id = e.record.get('id');
		//console.log(rec);
		this.fireEvent('updateoh',rec);
		
		/*
		// rec.id_unit = this.idunit == ''? e.record.get('id_unit') : this.idunit;
		rec.id_equip = this.ideq == ''? e.record.get('id_equip') : this.idunit;
		rec.oh = this.idoh == ''? e.record.get('oh') : this.idoh;
		rec.id = e.record.get('id'); //rec.oh = e.grid.idoh; //rec.id_equip = e.grid.ideq;
		// console.log (rec.id);
		
		//this.fireEvent('updateoh',rec);
		//*/
	}
	
	,renderCH: function(val) {
		var stCatH = Ext.getStore('SapCatH'),
			node = val ? stCatH.getById(val) : "--";
		//console.log(node);
		return node.get('nama');
    }
	
});
