/* AfrendyBayu, 12Sep2014 */

Ext.define('rcm.view.dataentry.HitungRelia', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.daftarGagal',
	xtype: 'tDaftarRelia',
	//id: 'daftargagal',
	store: 'DaftarRelia',
	//visible : false,
	requires: [
		'rcm.view.dataentry.BlnGagal'
	],

    loadMask: true,
    //columnLines: true,
    
    dockedItems: [{
		dock: 'top',
		xtype: 'label',
		id:'lblRelia',
		cls: 'txtka',
		text: 'Cobaan apa ini'
    }],
    
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

	initComponent: function() {
		var me=this;	//, ceditp=Ext.create('Ext.grid.plugin.RowEditing');//clicksToEdit: 1
		//me.plugins = [ceditp];
		
		me.columns = {	items: [
			{ xtype:'rownumberer',width:25 },
			//{ header:'Lokasi',dataIndex:'lok',width:100, hideable : false, filter: { 	type: 'string'  } },
			//{ header:'Nama Unit',dataIndex:'nama',width:135, hideable : false, filter: { type: 'string' } },
			{ header:'Kejadian',dataIndex:'event',width:75, tdCls: 'x-change-cell', hideable : false,
				filter: {
					type: 'string',
					store: 'EventList'
				}
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
			}, { header: 'RH Reliability', dataIndex: 'rh', width:80, hideable : false,align: 'right'
			}, { header: 'Keterangan', dataIndex: 'ket', flex:1, hideable : false
			}
		]};
		me.callParent(arguments);
		me.addEvents(
			'editDGClick',
			'hapusDGClick'
        );
        
	},
	
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