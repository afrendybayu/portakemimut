Ext.define('rcm.view.laporan.ConMonForm', {
    extend: 'Ext.form.Panel',
	xtype: 'taskConMon',
	layout : 'hbox',
	id : 'cmform',
	disabled : true,
	initComponent: function() {
		var me=this; 
		me.items = [
            {
                xtype: 'component',
                // cls: 'tasks-new',
                 width: 25,
                // height: 25
            },{
				xtype		: 'datefield',
				emptyText	: 'Tanggal',
				name		: 'tgl',
				format		: 'd-m-Y',
				width 		: 100,
				editable	: false,
				allowBlank	: false
			},{
				xtype		:'combobox',
				itemId		: 'cb_parent',
				editable	: false,
				allowBlank	: false,
				width 		: 150,
				store 		: 'CbParent',
				emptyText	: 'Lokasi',
				name		: 'lokasi',
				displayField: 'nama',
				valueField 	: 'id',
				queryMode 	: 'local'
				
			},{
				xtype		:'combobox',
				emptyText 	: 'Unit',
				editable	: false,
				allowBlank	: false,
				id			: 'cb_unit',
				store 		: 'CbUnit',
				width		: 150, 	
				name		: 'unit',
				// flex 		: 1,
				displayField: 'unit',
				valueField 	: 'id_unit',
				queryMode 	: 'local'
			},{
				xtype		:'textfield',
				allowBlank: false,
				emptyText 	: '#WO',
				name		: 'wo',
				// width		: 200 	
				flex : 1
			},{
				xtype		:'textfield',
				allowBlank	: false,
				emptyText 	: '#SAP',
				name		: 'sap',
				// width		: 150
				flex : 1
			},{
				xtype		:'textfield',
				emptyText 	: 'url Link Laporan',
				name		: 'url',
				// width		: 200,
				flex : 1				
			},{
				xtype		:'textfield',
				allowBlank: false,
				emptyText 	: 'Eksekutor',
				name		: 'pic',
				// width		: 200,
				flex : 1
			},{
				xtype		:'textfield',
				emptyText 	: 'keterangan',
				id			: 'ket_enter',
				name		: 'ket',
				flex : 2
				
			}/*,{
                
				xtype:'button',
				iconCls: 'add',
				text	: 'Cari',
				width:50,
				tooltip: 'Cari',
				disabled : true,
				formBind: true
			
				/*
				xtype: 'component',
                // cls: 'tasks-new',
                width: 50
                */
            //}
			
			
        ];

        me.callParent(arguments);
		
		
		
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