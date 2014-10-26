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
			{ header:'Equipment',dataIndex:'nama',flex:1, minWidth: 150,
				summaryRenderer: function() {
					if (me.duit)	return Ext.String.format('TOTAL Cost From Contract'); 
					else return Ext.String.format('TOTAL'); 
				} },
			{ header:'Jan',dataIndex:'b1', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'',
				maskRe: /[\d\-]/, regex: /^\d?$/},
			{ header:'Feb',dataIndex:'b2', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Mar',dataIndex:'b3', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Apr',dataIndex:'b4', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'May',dataIndex:'b5', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Jun',dataIndex:'b6', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Jul',dataIndex:'b7', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Aug',dataIndex:'b8', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Sep',dataIndex:'b9', width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Oct',dataIndex:'b10',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Nov',dataIndex:'b11',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ header:'Dec',dataIndex:'b12',width:70,align:'right',editor:'textfield',summaryType:'sum',renderer:me.duit?'usMoney':'' },
			{ hidden: me.tot, header:'Total',dataIndex:'tot',width:120,align:'right',summaryType:'sum' },
			{ hidden: me.totcv, header:'Total Contract Value',dataIndex:'tot',width:120,align:'right',summaryType:'sum',renderer:'usMoney' },
			{ hidden: me.budg, header:'Budget',dataIndex:'budget',flex:1,align:'right',summaryType:'sum',renderer:'usMoney',editor:'textfield' },
			{ hidden: me.pbudg, header:'% Budget',dataIndex:'persen',flex:1,align:'right' }
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
