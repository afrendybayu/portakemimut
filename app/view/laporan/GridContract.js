/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridContract', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridCause',
	xtype: 'tGridContract',
	//dstore:'Contract',	
	ngedit: 0,	
	
	requires: [
		'rcm.view.Util',
		'Ext.grid.plugin.CellEditing',
		'Ext.grid.column.RowNumberer'
	],
	
	thn: rcm.view.Util.U1th(''),
	
	columnLines: true,
	selType: 'cellmodel',
	
	initComponent: function() {
		var me=this,
			ce=Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit: 1});
			
		me.store = 'Contract';	//me.dstore,
		me.plugins = ce;
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Equipment',dataIndex:'nama',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL Cost From Contract'); 
				} },
			{ header:'Jan',dataIndex:'b1', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney',
				maskRe: /[\d\-]/, regex: /^\d?$/},
			{ header:'Feb',dataIndex:'b2', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Mar',dataIndex:'b3', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Apr',dataIndex:'b4', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'May',dataIndex:'b5', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Jun',dataIndex:'b6', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Jul',dataIndex:'b7', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Aug',dataIndex:'b8', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Sep',dataIndex:'b9', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Oct',dataIndex:'b10',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Nov',dataIndex:'b11',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Dec',dataIndex:'b12',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:'usMoney' },
			{ header:'Total Contract Value',dataIndex:'tot',width:120,align:'right',summaryType:'sum',renderer:'usMoney' },
			{ header:'Budget',dataIndex:'budget',flex:1,align:'right',summaryType:'sum',renderer:'usMoney',editor:'textfield' },
			{ header:'% Budget',dataIndex:'persen',flex:1,align:'right' }
		]};
		
		me.callParent(arguments);
		me.addEvents(
			'recordedit'
			//'budgetedit'
        );
        ce.on('edit', me.handleCellEdit, this);
        ce.on('beforeedit', me.hdlCellEna, this);
		//me.addEvents();
	},
	
	handleCellEdit: function(gridView, e) {
		
        var rec = e.grid.getStore().getAt(e.rowIdx), tt=e.field;
		if (e.colIdx==15)
			//alert("handleCellEdit kontrak thn: "+e.field);
			this.fireEvent('recordedit',e,e.value,'b15',rec.get('tipe'),this.thn );
		else
			this.fireEvent('recordedit',e,e.value,e.field,rec.get('tipe'),this.thn );
		
    },
    
    hdlCellEna: function(editor,a,eOpts)	{
		//alert(this.ngedit);
		if (this.ngedit)	return true;
		else return false;
	}
});
