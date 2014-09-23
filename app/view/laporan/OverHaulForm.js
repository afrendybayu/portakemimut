Ext.define('rcm.view.laporan.OverHaulForm', {
    extend: 'Ext.form.Panel',
	xtype: 'taskOverHaul',
	layout : 'hbox',
	// id : 'cmform',
	// disabled : true,
	initComponent: function() {
		var me=this; 
		me.items = [
            {
                xtype: 'component',
                // cls: 'tasks-new',
                 width: 25,
                // height: 25
            },{
				xtype		:'combobox',
				editable	: false,
				allowBlank	: false,
				width 		: 150,
				store 		: 'CbParent',
				emptyText	: 'Lokasi',
				name		: 'lokasi',
				displayField: 'nama',
				valueField 	: 'nama',
				queryMode 	: 'local',
				listeners: {
					select: function(combo, records, eOpts ) {
						me.plhlok(records);
					},
				}
				
			},{
				xtype		:'combobox',
				emptyText 	: 'Unit',
				editable	: false,
				allowBlank	: false,
				store 		: 'CbUnit',
				width		: 150, 	
				name		: 'unit',
				displayField: 'unit',
				valueField 	: 'unit',
				queryMode 	: 'local',
				listeners: {
					select: function(combo, records, eOpts ) {
						me.plhunit(records);
					},
				}
			},{
				xtype		:'combobox',
				emptyText 	: 'Equip',
				editable	: false,
				allowBlank	: false,
				store 		: 'CbEquip',
				width		: 150, 	
				name		: 'equip',
				displayField: 'eq',
				valueField 	: 'eq',
				queryMode 	: 'local',
				listeners: {
					select: function(combo, records, eOpts ) {
						me.plhequip(records);
					},
				}
			},{
				xtype		:'textfield',
				allowBlank	: false,
				emptyText 	: 'Order No',
				name		: 'wo',
				width		: 150
				// width		: 200 	
				// flex : 1
			},{
				xtype		: 'datefield',
				emptyText	: 'Tanggal',
				name		: 'tgl',
				format		: 'd-m-Y',
				width 		: 100,
				editable	: false,
				allowBlank	: false
			},{
				xtype		:'numberfield',
				allowBlank	: false,
				emptyText 	: 'Durasi',
				name		: 'durasi',
				maxValue	: 360,
				minValue	: 1,
				width		: 50
				// flex : 1
			},{
                
				xtype	:'button',
				itemId 	: 'OverHaulSave',
				iconCls	: 'add',
				text	: 'Save',
				width	:50,
				tooltip	: 'Save',
				disabled: true,
				formBind: true,
				
			
            }
			
			
        ];

        me.callParent(arguments);
		
		
		
	},
	
	plhlok : function(record){
		var lks = record[0].data.id;
		// console.log ('kode lokasi '+ lks);
		this.fireEvent('ohplhlokasi',lks);
		// console.log (n.get('kode'));
			// rcmSettings.aaaaaaa =record;
	},
	
	plhunit: function(record){
		var unt = record[0].data.id_unit;
		this.fireEvent('ohplhunit',unt);
	},
	plhequip: function(record){
		var eqp = record[0].data.id_eq;
		this.fireEvent('ohplheq',eqp);
	},
	
	
	
});