Ext.define('rcm.view.laporan.ConMonForm', {
    extend: 'Ext.form.Panel',
	xtype: 'taskConMon',
	layout : 'hbox',
	
	initComponent: function() {
		var me=this; 
		me.items = [
            {
                xtype: 'component',
                // cls: 'tasks-new',
                width: 25,
                height: 25
            },{
				xtype: 'datefield',
				value : new Date(),
				format: 'Y-m-d',
				width : 100
			},{
				xtype	:'combobox',
				itemId	: 'cbparent1',
				//emptyText : 'Lokasi',
				flex : 1,
				store : 'CbParent',
				emptyText	: 'Loc',
				// queryParam 	: 'lokasi',
				name		: 'lokasi',
				displayField: 'lokasi',
				valueField 	: 'id',
				queryMode 	: 'local',
				// minwidth	: 50,
				/*listeners       : {
					select  : function (list, records) {
					
					selected = true
					var dd = records[0].get('lokasi');
					Ext.Msg.alert('Item selected', 'Selected: ' + records[ 0 ].get('lokasi'))
					console.log(dd);
					
					//this.pilihLokasi(records,list);
					}
					
					
				}*/
			},{
				xtype	:'textfield',
				emptyText : 'Unit',
				flex : 1
			},{
				xtype	:'textfield',
				emptyText : '#WO',
				flex : 1
			},{
				xtype	:'textfield',
				emptyText : '#SAP',
				flex : 1
			},{
				xtype	:'textfield',
				emptyText : 'url Link Laporan',
				flex : 1
			},{
				xtype	:'textfield',
				emptyText : 'Eksekutor',
				flex : 1
			},{
				xtype	:'textfield',
				emptyText : 'keterangan',
				flex : 2
			},{
                xtype: 'component',
                // cls: 'tasks-new',
                width: 50,
                height: 25
            }
			
			
        ];

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
	},
	
	pilihLokasi : function(n){
		this.fireEvent('plhLokasi',n.get('kode'));
		console.log (n.get('kode'));
	}
	
	
});