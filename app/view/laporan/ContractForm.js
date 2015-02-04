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
				xtype		:'textfield',
				emptyText 	: 'No Kontrak',
				editable	: false,
				allowBlank	: false,
				width		: 120, 	
				name		: 'nokont',
				displayField: 'no_kont',
				valueField 	: 'no_kont',
				queryMode 	: 'local'
			},{
				xtype		:'textfield',
				emptyText 	: 'Vendor',
				editable	: false,
				allowBlank	: false,
				width		: 120, 	
				name		: 'vend',
				displayField: 'vend',
				valueField 	: 'vent',
				queryMode 	: 'local'
							
			},{
				xtype		: 'datefield',
				emptyText	: 'Tanggal Awal',
				name		: 'awal',
				submitFormat: 'Y-m-d',
				format		: 'j M Y',
				width 		: 110,
				editable	: false,
				allowBlank	: false
			},{
				xtype		: 'datefield',
				emptyText	: 'Tanggal',
				name		: 'akhir',
				submitFormat: 'Y-m-d',
				format		: 'j M Y',
				width 		: 110,
				editable	: false,
				allowBlank	: false
			},{
				xtype		:'textfield',
				emptyText 	: 'Keterangan',
				name		: 'ket',
				flex 		: 1,
			},{
				xtype		:'textfield',
				emptyText 	: 'Nilai Kontrak',
				editable	: false,
				allowBlank	: false,
				width		: 100, 	
				name		: 'nilai',
				displayField: 'nilai',
				valueField 	: 'nilai',
				queryMode 	: 'local'
			},{
				xtype		:'component',
				emptyText 	: 'Terpakai',
				editable	: false,
				//allowBlank	: false,
				width		: 100, 	
				//name		: 'pakai',
				//displayField: 'pakai',
				//valueField 	: 'pakai',
				//queryMode 	: 'local'
			},{
				xtype		:'component',
				emptyText 	: 'Sisa',
				editable	: false,
				//allowBlank	: false,
				width		: 100, 	
				//name		: 'sisa',
				//displayField: 'sisa',
				//valueField 	: 'sisa',
				//queryMode 	: 'local'
			
			
			},{
				xtype:'button',
				//itemId: 'ConMonSave',
				itemId: 'ContraxSave',
				iconCls: 'add',
				text: 'Save',
				width : 50,
				tooltip: 'Simpan Kontrak Baru',
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
