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
		'Ext.grid.column.RowNumberer',
	],
	
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
			{ header:'Jan',dataIndex:'b1', width:70,align:'right',editor:'textfield',summaryType:'sum',
				maskRe: /[\d\-]/, regex: /^\d?$/},
			{ header:'Feb',dataIndex:'b2', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Mar',dataIndex:'b3', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Apr',dataIndex:'b4', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'May',dataIndex:'b5', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Jun',dataIndex:'b6', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Jul',dataIndex:'b7', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Aug',dataIndex:'b8', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Sep',dataIndex:'b9', width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Oct',dataIndex:'b10',width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Nov',dataIndex:'b11',width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Dec',dataIndex:'b12',width:70,align:'right',editor:'textfield',summaryType:'sum' },
			{ header:'Total Contract Value',dataIndex:'tot',flex:1,align:'right',summaryType:'sum' }
		]};
		
		me.callParent(arguments);
		me.addEvents(
			'recordedit'
        );
        ce.on('edit', me.handleCellEdit, this);
        ce.on('beforeedit', me.hdlCellEna, this);
		//me.addEvents();
	},
	
	handleCellEdit: function(gridView, e) {
		//alert("handleCellEdit kontrak");
        var rec = e.grid.getStore().getAt(e.rowIdx), tt=e.field;
		//console.log("handleCellEdit tipe: "+rec.get('tipe')+", nilai: "+e.value+', bulan: '+e.field);
		this.fireEvent('recordedit',e,e.value,e.field,rec.get('tipe'),'2014' );
		
    },
    
    hdlCellEna: function(editor,a,eOpts)	{
		//alert(this.ngedit);
		if (this.ngedit)	return true;
		else return false;
	},
});
