/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.InfoFMEA', {
	extend: 'Ext.grid.Panel',
	xtype: 'infofmea',
	
	store: 'EventInfo',
    columnLines: true,

	columns: {
		defaults: {
			draggable: false,
			resizable: false,
			hideable: false,
			groupable: false
		},
		items: [
			{ xtype:'rownumberer',width:25 },
			{ text: 'Equipment',  dataIndex: 'eql', flex: 1 },
			{ text: 'Object Part', dataIndex: 'opart', width:220 },
			{ text: 'Failure Mode', dataIndex: 'mode', width:140 },
			{ text: 'Cause', dataIndex: 'cause', width:180 },
			{ text: 'Action', dataIndex: 'aksi', width:120, handler: Ext.bind(this.hdlHapusE, this) }
		]
    },
	
	initComponent: function() {
		var me=this;

		me.callParent(arguments);
	},
	
	hdlHapusE: function()	{
		alert("tess hos");
	}
	
});
