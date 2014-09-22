/* AfrendyBayu, 13Nov2013 */

Ext.define('rcm.view.dataentry.DaftarGagal', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.daftarGagal',
	xtype: 'taskDaftarGagal',
	id: 'daftargagal',
	store: 'DaftarGagal',
	visible : false,
	requires: [
		'rcm.view.dataentry.BlnGagal'
	],
	start: '-',
	end: '-',
	jdl: '',
	// enableColumnHide: false,
	
	viewConfig: {
        getRowClass: function(record, index) {
            var c = record.get('event');
            if (c.localeCompare("Breakdown")==0) {
                return 'rusak';
			} else if (c.localeCompare("Stand By")==0) {
                return 'sip';
            } else {
                return 'baik';
            }
        }
    },
    
    features: [{ftype: 'filters',local: true }],
    loadMask: true,
    
	dockedItems: [{
		dock: 'top',
		xtype: 'tblnGagal'
    }],
	

	initComponent: function() {
		var me=this, ceditp=Ext.create('Ext.grid.plugin.RowEditing');//clicksToEdit: 1
		//me.plugins = [ceditp];

		me.listeners = {
			itemclick: function(view, rec, item, index, e) {
				var pos = view.getPositionByEvent(e),
					col = pos.column;
				alert(col);
				console.log('unit: '+rec.get('eqid')+', id: '+rec.get('id'));
				if (col==13)	{
					me.end = '-';
					//if ()
					me.end = {u:rec.get('eqid'), id:rec.get('id'), n:index};
					me.jdl = {l:rec.get('lok'), n:rec.get('nama')};
				}
				if (col==14)	{
					me.start = '-';
					if (me.end.u!=rec.get('eqid') && (me.end!='-' ))	{
						me.hpsRStart();
						rcmSettings.end = me.end;
						rcmSettings.start = me.start;
						Ext.Msg.alert('Status', me.end+'Nama atau TIpe Unit Start dan End TIDAK SAMA !!<br/>Cek Lokasi dan Unitnya..');
					}
					else if (me.end.n==index) {
						me.hpsRStart();
						Ext.Msg.alert('Status', 'Pilih baris event yang beda');
					}
					else {
						me.start = {u:rec.get('eqid'),id:rec.get('id')};
					}
				}
			},
			itemdblclick: function(dv, record, item, index, e)	{
				//alert("double click, "+record.get('idevent')+"-- "+record.get('event'));
				me.row2Click(record.get('id'), record.get('idevent'));	//	record.raw.value
			}
			
		},
		
		me.columns = {	items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Lokasi',dataIndex:'lok',width:100, hideable : false, filter: { 	type: 'string'  } },
			{ header:'Nama Unit',dataIndex:'nama',width:135, hideable : false, filter: { type: 'string' } },
			{ header:'Kejadian',dataIndex:'event',width:75, tdCls: 'x-change-cell', hideable : false,
			//*	
				filter: {
					type: 'string',
					store: 'EventList'
				}//*/
			},
			{ header:'Unit Down',
				hideable : false,
				columns: 
					[	{ header: 'Tanggal', dataIndex: 'downt', width:80,
							editor: {
								xtype: 'datefield',
								allowBlank: false,
								format: 'd-m-Y',
								minValue: '01-01-2006',
								minText: 'Tanggal kejadian unit down harus diisi !',
								//maxValue: Ext.Date.format(new Date(),'d-m-Y')
								maxValue: new Date()
						} },
						{ header:'Jam',dataIndex:'downj',width:60,editor: {xtype:'timefield',format:'H:i'} }
					]
			},{ text:'Mulai Perbaikan', 
				hideable : false,
				columns: 
					[	{ header:'Tanggal',dataIndex:'startt',width:80, 
							editor: {
								xtype:'datefield',
								allowBlank:true,
								format:'d-m-Y',
								minValue:'01-01-2006',
								minText:'Tanggal kejadian unit down harus diisi !',
								maxValue:Ext.Date.format(new Date(),'d-m-Y')
						} },
						{ header:'Jam',dataIndex:'startj',width:60,editor:{xtype:'timefield',allowBlank:true,format:'H:i'} }
					]
			},{ text:'Selesai Perbaikan',
				hideable : false,
				columns: 
					[	{ header: 'Tanggal', dataIndex: 'endt', width:80, 
							editor: {
								xtype: 'datefield',
								allowBlank: true,
								format: 'd-m-Y',
								minValue: '01-01-2006',
								minText: 'Tanggal kejadian unit down harus diisi !',
								maxValue: Ext.Date.format(new Date(), 'd-m-Y')
						} },
						{ header: 'Jam', dataIndex: 'endj', width:60, editor: {xtype: 'timefield',allowBlank:true,format:'H:i'} }
					]
			},{ header: 'Unit Running', 
				hideable : false,
				columns: 
					[	{ header: 'Tanggal', dataIndex: 'upt', width:80, 
							editor: {
								xtype: 'datefield',
								allowBlank: false,
								format: 'd-m-Y',
								minValue: '01-01-2006',
								minText: 'Tanggal kejadian unit down harus diisi !',
								maxValue: Ext.Date.format(new Date(), 'd-m-Y')
						} },
						{ header:'Jam',dataIndex:'upj',width:60,editor: {xtype:'timefield',format:'H:i'} }
					]
			}, { header: 'Mode Kegagalan / Keterangan', dataIndex: 'fm', flex:1, hideable : false
			
			}, {
				header:'End', width:40, editor: { xtype:'radio' },	//id: 'idrstop',
				renderer: function()	{
					 return '<input type= "radio" name="rend" style="margin-left:10px;"/>';
				}
			}, {
				header:'Start', width:40, editor: { xtype:'radio' },	//id: 'idrstart',
				renderer: function()	{
					 return '<input type= "radio" name="rstart" style="margin-left:10px;"/>';
				}
			
			}, {
				xtype:'actioncolumn',
				width:25,
				iconCls: 'editEvent',
				hidden : true,
				id	: 'gridedit',
				hideable : false,
				tooltip: 'Edit Kejadian',
				handler: Ext.bind(me.hdlEditDGClick, me)
				
			}, {
				xtype:'actioncolumn',
				width:25,
				iconCls: 'hpsEvent',
				hidden : true,
				hideable : false,
				id	: 'griddel',
				//icon: 'modul/icons/delete.gif',  // Use a URL in the icon config
				tooltip: 'Hapus Kejadian',
				handler: Ext.bind(me.hdlHapusDGClick, me)
			}
		]};
		me.callParent(arguments);
		me.addEvents(
			'editDGClick',
			'hapusDGClick'
        );
        
	},
	/*
	afterRender: function() {
        this.superclass.afterRender.apply(this, arguments);
        this.el.on('click', this.checkRadioClick, this);
    },
    
    checkRadioClick: function(event) {
        if (event.getTarget('input[type="radio"]')) {
            //radio clicked... do something
            //alert('fefwef');
            rcmSettings.ewewe = event;
        }
    },
	//*/
	row1Click: function(id)	{
		//alert(id);
		//this.fireEvent('infoDetailGagal', id,ev);
		//rcmSettings.asa = record;
		//rcmSettings.sas = record.raw.value;
	},

	row2Click: function(id, ev, dv, record, item, index, e)	{
		//alert(id);
		this.fireEvent('infoDetailGagal', id,ev);
		//rcmSettings.asa = record;
		//rcmSettings.sas = record.raw.value;
	},

	hdlEditDGClick: function(grid, row, col, column, e) {
		var rec = grid.getStore().getAt(row);
		//alert("Edit kejadian "+ rec.get('event')+" "+rec.get('nama')+", id: "+rec.get('id'));
		//grid.getStore().removeAt(rowIndex);
		this.fireEvent('editDGClick', rec);
	},
	
	hdlHapusDGClick: function(grid, row, col, column, e) {
		var rec = grid.getStore().getAt(row);
		//var rec = grid.getStore();
		//alert("hapus kejadian "+ rec.get('event')+" "+rec.get('nama'));
		//grid.getStore().removeAt(rowIndex);
		this.fireEvent('hapusDGClick', rec, row, col);
	},
	
	hpsREnd: function()	{
		var re = Ext.select('*[name=rend]').elements;
		for (var i=0; i<re.length; i++)	{
			re[i].checked = false;
		}
	},
	
	hpsRStart: function()	{
		var re = Ext.select('*[name=rstart]').elements;
		for (var i=0; i<re.length; i++)	{
			re[i].checked = false;
		}
	}
});
