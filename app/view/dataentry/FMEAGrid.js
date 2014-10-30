/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.FMEAGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.fmea',
	xtype: 'taskFMEAGrid',
	//id: 'idfmeagrid',
	
	requires: [
		/*
		'Ext.form.field.ComboBox',
		'Ext.form.FieldContainer',
		'Ext.form.field.Time',
		'Ext.grid.column.Action',
		'Ext.form.Label',
		'Ext.form.field.Hidden'
		//*/
		'Ext.form.*',
		'Ext.grid.*'
	],
	//features: [{ftype:'grouping',startCollapsed:true,hideGroupedHeader:true}],

	store: 'Event',
    columnLines: true,
	enableColumnHide: false,
	
	initComponent: function() {
		//var me=this, cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1 });
		var me=this, ed=Ext.create('Ext.grid.plugin.CellEditing',{ clicksToEdit: 1	});
		
		me.plugins = [ed];
		me.listeners = {
			'cellclick' : me.rowFMEAclick
		},
		me.columns = [
			{ xtype:'rownumberer',width:25 },
			{ text: "Equipment", dataIndex: 'eql', width:150, editor: {
				xtype: 'combo', store: 'Equip',editable: false,	emptyText: 'Pilih Equipment... ', flex:1,
				queryParam: 'tipe',name : 'eql',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihEquipGagal(record,list); } } }
			} },
			{ text: "Object Part", dataIndex: 'opart', /*flex:1*/width:250, editor: {
				xtype: 'combo', editable: false, emptyText: 'Pilih Object Part.. ', store: 'OPart',queryMode: 'local',
				queryParam: 'tipe',name : 'opart',displayField: 'nama',valueField: 'nama',sortable : true,
				listConfig: { listeners: { itemclick: function(list,record) { me.pilihOPartGagal(record, list); } } }
			} },
			{ text: "Failure Mode", dataIndex: 'mode', width:200,editor: {
				xtype: 'combo', store: 'FMode',editable: false,	emptyText: 'Pilih Mode... ',queryMode: 'local',
				queryParam: 'tipe',name : 'mode',displayField: 'nama',valueField: 'nama',sortable : true,
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihModeGagal(record,list); } } }
			} },
			{ text: "Cause", dataIndex: 'cause', width:200, editor: {
				xtype: 'combo', store: 'Cause',editable: false,	emptyText: 'Pilih Penyebab... ',sortable : true,
				queryParam: 'tipe',name : 'cause',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihCauseGagal(record); }}, 
				getInnerTpl: function() {	return '<div data-qtip="{nama}: {ket}">{nama}</div>'; }}
			} },
			{ text: "Tindakan", dataIndex: 'aksi', width:100, editor: {
				xtype: 'combo', store: 'Aksi',editable: false,	emptyText: 'Pilih Tindakan... ',sortable : true,
				queryParam: 'tipe',name : 'aksi',displayField: 'nama',valueField: 'nama',queryMode: 'local',
				listConfig: { listeners: { itemclick: function(list, record) { me.pilihAksiGagal(record); } } }
			} },
			{ xtype:'actioncolumn',	width:25,
				//icon: 'modul/icons/delete.gif', 
				iconCls:  'hpsEvent',
				tooltip: 'Hapus Analisa Event',
				handler: Ext.bind(me.hdlHapusFMEAClick, me)
				/*
				handler: function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					//alert("Hapus " + rec.get('eql'));
					grid.getStore().removeAt(rowIndex);
				}
				//*/
		}],
		
		me.callParent(arguments);
		me.addEvents(
			'edit',
			'plhOPartGagal',
			'plhEquipGagal',
			'plhModeGagal',
			'plhCauseGagal',
			'plhAksiGagal',
			'hpsFMEAGagal'
        );
        ed.on('edit', me.handleCellEdit, this);
	},
	
	hdlHapusFMEAClick: function(grid, row, col, column, e) {
		var rec = grid.getStore().getAt(row);
		//alert("hapus kejadian "+ rec.get('event')+" "+rec.get('nama'));
		//grid.getStore().removeAt(rowIndex);
		this.fireEvent('hpsFMEAGagal', rec, row, grid);
	},
	
	pilihOPartGagal: function(n, l) {
		//rcmSettings.aaaa = n;
		//alert(this.getView().getRow(0));
		rcmSettings.asa.opart = n.data.id;	// w
		//this.fireEvent('plhFilterFMEA');
		this.fireEvent('plhOPartGagal', n, rcmSettings.asa);
	},
	
	pilihEquipGagal: function(n)	{
		//var t = {cat:n.get('cat'), ideq:  n.get('idt')};
		rcmSettings.asa.cat = n.get('cat');		//n.data.cat;
		rcmSettings.asa.ideq = n.get('idt');	//data.idt;
		//console.log("pilihEquipGagal: "+n.data.cat+" id: "+n.data.idt+" id: "+rcmSettings.asa.idt+" row: "+rcmSettings.asa.row);
		//console.log("pilihEquipGagal cat: "+n.get('cat')+" id: "+n.get('idt')+" row: "+rcmSettings.asa.row);
		this.fireEvent('plhEquipGagal', rcmSettings.asa);
	},
	
	pilihModeGagal: function(n)	{
		rcmSettings.asa.mode = n.data.id;
		rcmSettings.asa.kode = n.data.kode;
		//aaaa = n;	
		this.fireEvent('plhModeGagal', n, rcmSettings.asa);
		//var a;
		//a.mode = n.data.id;		a.kode = n.data.kode;
		//alert("id: "+n.data.id+", kode:"+n.data.kode);
		//this.fireEvent('plhModeGagal', n, n.data);
	},
	
	pilihCauseGagal: function(n)	{
		rcmSettings.asa.cause = n.data.id;
		this.fireEvent('plhCauseGagal', n, rcmSettings.asa);
	},
	
	pilihAksiGagal: function(n)	{
		rcmSettings.asa.aksi = n.data.id;
		this.fireEvent('plhAksiGagal', n, rcmSettings.asa); //rcmSettings.asa=n.get('id')
	},

	rowFMEAclick: function(grid, td, cellIndex, record, tr, rowIndex){
		//if (1)	{
		if (rowIndex != grid.getStore().getCount())	{
			//alert("row: "+rowIndex+"/"+grid.getStore().getCount());
			var asa = grid.getStore().getAt(rowIndex);
			var x = {row: rowIndex, col: cellIndex, cat: asa.get('cat')};
			
			//console.log("rowFMEAclick baris: "+x.row+", kolom: "+x.col+", cat: "+x.cat);
			rcmSettings.asa = x;
			this.fireEvent('plhFilterFMEA', x);
		}
	},

	
    handleCellEdit: function(g, e) {
		
    }
	
});
