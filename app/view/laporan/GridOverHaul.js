/* AfrendyBayu, 12Sep4014 */

Ext.define('rcm.view.laporan.GridOverHaul', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.daftarGagal',
	xtype: 'tOverHaul',
	//id: 'daftargagal',
	store: 'OhTahun',
	//visible : false,
	requires: [
		'rcm.view.Util'
	],

    loadMask: true,
    columnLines: true,

	initComponent: function() {
		var me=this;	//, ceditp=Ext.create('Ext.grid.plugin.RowEditing');//clicksToEdit: 1
		//me.plugins = [ceditp];
		
		me.columns = { 
			items: rcm.view.Util.UxcolOH()
			/*
			items: [
			{ xtype:'rownumberer',width:25 
			},{ header:'Lokasi',dataIndex:'lok',width:100, hideable : false, 
				locked: true, filter: { type: 'string' }
			},{ header:'Nama Unit',dataIndex:'nama',width:135, hideable : false, 
				locked: true, filter: { type: 'string' } 
			//
			},{ header:'Januari', hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b1m1', width:40 },
						{ header: 'II', dataIndex: 'b1m2', width:40 },
						{ header: 'III', dataIndex: 'b1m3', width:40 },
						{ header: 'IV', dataIndex: 'b1m4', width:40 }
				]
			},{ header:'Februari',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b2m1', width:40 },
						{ header: 'II', dataIndex: 'b2m2', width:40 },
						{ header: 'III', dataIndex: 'b2m3', width:40 },
						{ header: 'IV', dataIndex: 'b2m4', width:40 }
				]
			},{ header:'Maret',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b3m1', width:40 },
						{ header: 'II', dataIndex: 'b3m2', width:40 },
						{ header: 'III', dataIndex: 'b3m3', width:40 },
						{ header: 'IV', dataIndex: 'b3m4', width:40 }
				]
			},{ header:'April',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b4m1', width:40 },
						{ header: 'II', dataIndex: 'b4m2', width:40 },
						{ header: 'III', dataIndex: 'b4m3', width:40 },
						{ header: 'IV', dataIndex: 'b4m4', width:40 }
				]
			},{ header:'Mei',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b5m1', width:40 },
						{ header: 'II', dataIndex: 'b5m2', width:40 },
						{ header: 'III', dataIndex: 'b5m3', width:40 },
						{ header: 'IV', dataIndex: 'b5m4', width:40 }
				]
			},{ header:'Juni',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b6m1', width:40 },
						{ header: 'II', dataIndex: 'b6m2', width:40 },
						{ header: 'III', dataIndex: 'b6m3', width:40 },
						{ header: 'IV', dataIndex: 'b6m4', width:40 }
				]
			},{ header:'Juli',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b7m1', width:40 },
						{ header: 'II', dataIndex: 'b7m2', width:40 },
						{ header: 'III', dataIndex: 'b7m3', width:40 },
						{ header: 'IV', dataIndex: 'b7m4', width:40 }
				]
			},{ header:'Agustus',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b8m1', width:40 },
						{ header: 'II', dataIndex: 'b8m2', width:40 },
						{ header: 'III', dataIndex: 'b8m3', width:40 },
						{ header: 'IV', dataIndex: 'b8m4', width:40 }
				]
			},{ header:'September',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b9m1', width:40 },
						{ header: 'II', dataIndex: 'b9m2', width:40 },
						{ header: 'III', dataIndex: 'b9m3', width:40 },
						{ header: 'IV', dataIndex: 'b9m4', width:40 }
				]
			},{ header:'Oktober',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b10m1', width:40 },
						{ header: 'II', dataIndex: 'b10m2', width:40 },
						{ header: 'III', dataIndex: 'b10m3', width:40 },
						{ header: 'IV', dataIndex: 'b10m4', width:40 }
				]
			},{ header:'November',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b11m1', width:40 },
						{ header: 'II', dataIndex: 'b11m2', width:40 },
						{ header: 'III', dataIndex: 'b11m3', width:40 },
						{ header: 'IV', dataIndex: 'b11m4', width:40 }
				]
			},{ header:'Desember',	hideable : false,
				columns: [	
						{ header: 'I', dataIndex: 'b12m1', width:40 },
						{ header: 'II', dataIndex: 'b12m2', width:40 },
						{ header: 'III', dataIndex: 'b12m3', width:40 },
						{ header: 'IV', dataIndex: 'b12m4', width:40 }
				]
			
			}, { header: 'Keterangan', dataIndex: 'ket', minWidth: 180, align:'center', flex:1, hideable : false 
		}]

		//*/
		};
		me.callParent(arguments);
		me.addEvents(
			//'editDGClick',
			//'hapusDGClick'
        );
        
	}
	
});
