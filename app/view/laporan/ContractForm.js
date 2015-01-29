Ext.define('rcm.view.laporan.ContractForm', {
    extend: 'Ext.form.Panel',
	xtype: 'tContrxF',
	layout : 'hbox',
	//id : 'cmform',
	//disabled : true,
	initComponent: function() {
		var me=this; 
		me.items = [
            {
				xtype: 'component',
				width: 35
            },{
				xtype		: 'datefield',
				emptyText	: 'Tanggal',
				name		: 'tgl',
				submitFormat: 'Y-m-d',
				format		: 'j M Y',
				width 		: 110,
				editable	: false,
				allowBlank	: false
			},{
				xtype		:'combobox',
				//itemId: 'cb_parent',
				editable	: false,
				allowBlank	: false,
				width 		: 200,
				store 		: 'SapCatH',	//Ext.create('rcm.store.SapCatH', {storeId: 'CatHir0' }),
				emptyText	: 'Kategori',
				name		: 'cat',
				displayField: 'nama',
				valueField 	: 'id',
				queryMode 	: 'local'
			},{
				xtype		:'textfield',
				emptyText 	: 'Nilai Kontrak',
				editable	: false,
				allowBlank	: false,
				width		: 200, 	
				name		: 'nilai',
				displayField: 'unit',
				valueField 	: 'id_unit',
				queryMode 	: 'local'
			},{
				xtype		:'textfield',
				emptyText 	: 'Keterangan',
				name		: 'ket',
				flex 		: 1,
			},{
				xtype:'button',
				//itemId: 'ConMonSave',
				itemId: 'ContraxSave',
				iconCls: 'add',
				text: 'Save',
				width:65,
				tooltip: 'Save',
				//disabled : true,
				formBind: true
            }
			
			
        ];

        me.callParent(arguments);
		
		
		
	}
	
	/*pilihLokasi : function(n){
		this.fireEvent('plhLokasi',n.get('kode'));
		//console.log (n.get('kode'));
	}*/
	/*pilihUnit: function(n)	{
		//console.log(n.get('lokasi'));
		this.fireEvent('plhUnit', n.get('lokasi'));
	},*/
	
	
});
