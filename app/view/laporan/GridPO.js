/* AfrendyBayu, 2Feb2015 */
Ext.define('rcm.view.laporan.GridPO', {
	extend: 'Ext.grid.Panel',

	xtype: 'tGridPO',
	store: 'POKontrak',	
	
	requires: [
		'rcm.view.Util',
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.column.RowNumberer'
	],

	columnLines: true,
	selType: 'cellmodel',
	
	
	
	initComponent: function() {
		var me=this,
			ce=Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1});
		me.plugins = [ce];
		//*
		me.columns = {	
			items: [
				{ header:'idk',dataIndex:'idk', minWidth: 130,hidden: true },
				{ header:'No Kontrak',dataIndex:'nokon', minWidth: 130 },
				{ header:'Keterangan',dataIndex:'ket', minWidth: 250 }
		]};
		//*/
		me.callParent(arguments);
		me.addEvents(
			'recordedit'
        );
        ce.on('edit', me.handleCellEdit, this);
        //ce.on('beforeedit', me.hdlCellEna, this);

		//me.addEvents();
	}
	//*
	,handleCellEdit: function(grid, e) {
		
        var rec = e.grid.getStore().getAt(e.rowIdx), tt=e.field;
        console.log(rec);
		//this.fireEvent('recordedit',e,e.value,e.field,rec.get('tipe'),this.thn );
    },
    //*/
    hdlCellEna: function(editor,a,eOpts)	{
		//alert(this.ngedit);
		if (this.ngedit)	return true;
		else return false;
	}
});
