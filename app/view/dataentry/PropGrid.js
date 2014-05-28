/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.PropGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'propgrid',
	
	requires: [
	//	'rcm.view.Util',
	],
	
	store: 'DetailGagal',
    columnLines: true,

	columns: {
		defaults: {
			draggable: false,
			resizable: false,
			hideable: false,
			groupable: false
		},
		items: [
			{ text: 'Parameter',  dataIndex: 'nama' },
			{ text: 'Nilai', dataIndex: 'nilai', flex: 1 }
		]
    },
	
	initComponent: function() {
		var me=this;
		
		
		me.callParent(arguments);
	}
	
});
