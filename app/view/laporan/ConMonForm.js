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
                // height: 25
            },{
				xtype	: 'datefield',
				//value : new Date(),
				name	: 'tgl',
				format	: 'Y-m-d',
				width 	: 100,
				allowBlank: false
			},{
				xtype	:'combobox',
				itemId	: 'cb_parent',
				allowBlank: false,
				flex : 1,
				store 		: 'CbParent',
				emptyText	: 'Lokasi',
				name		: 'lokasi',
				displayField: 'loc',
				valueField 	: 'id_lokasi',
				queryMode 	: 'local'
				
			},{
				xtype		:'combobox',
				emptyText 	: 'Unit',
				allowBlank	: false,
				id			: 'cb_unit',
				store 		: 'CbUnit',
				name		: 'unit',
				flex 		: 1,
				displayField: 'unit',
				valueField 	: 'id_unit',
				queryMode 	: 'local'
			},{
				xtype		:'textfield', 
				name		: 'type',
				id			: 'cb_type',
				hidden		: true,
				store		: 'CbUnit',
				valueField 	: 'id_type',
				queryMode 	: 'local'
			},{
				xtype		:'textfield',
				emptyText 	: '#WO',
				name		: 'wo',
				flex : 1
			},{
				xtype		:'textfield',
				allowBlank	: false,
				emptyText 	: '#SAP',
				name		: 'sap',
				flex : 1
			},{
				xtype		:'textfield',
				emptyText 	: 'url Link Laporan',
				name		: 'url',
				flex : 1
			},{
				xtype		:'textfield',
				emptyText 	: 'Eksekutor',
				name		: 'pic',
				flex : 1
			},{
				xtype		:'textfield',
				emptyText 	: 'keterangan',
				id			: 'ket_enter',
				name		: 'ket',
				flex : 2
				
			},{
                
				xtype:'button',
				iconCls: 'add',
				text	: 'Add',
				width:50,
				tooltip: 'Simpan',
				disabled : true,
				formBind: true
			
				/*
				xtype: 'component',
                // cls: 'tasks-new',
                width: 50
                */
            }
			
			
        ];

        me.callParent(arguments);
		
		
		me.addEvents(
		//	'plhUnit'
			
			/*'edit',
			'plhOPartGagal',
			'plhEquipGagal',
			'plhModeGagal',
			'plhCauseGagal',
			'plhAksiGagal',
			'hpsFMEAGagal'*/
        );
        //ed.on('edit', me.handleCellEdit, this);
	},
	
	/*pilihLokasi : function(n){
		this.fireEvent('plhLokasi',n.get('kode'));
		console.log (n.get('kode'));
	}*/
	/*pilihUnit: function(n)	{
		console.log(n.get('lokasi'));
		this.fireEvent('plhUnit', n.get('lokasi'));
	},*/
	
	
});