/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridCauseInfo', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridCause',
	xtype: 'taskGridCauseInfo',
    
    dstore: '-',
	//store: 'SapCauseInfo',
	
	initComponent: function() {
		var me=this;
		me.store= me.dstore;
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:35 },
			{ header:'No Order',dataIndex:'noorder',width:75 },
			{ header:'Tipe',dataIndex:'tipe',width:40 },
			{ header:'Equipment',dataIndex:'equip',flex:1 },
			{ header:'Down Time',dataIndex:'downtime',width:80 },
			{ header:'Object Part',dataIndex:'opart',width:75 },
			{ header:'Damage',dataIndex:'damage',width:75 },
			{ header:'Main Work',dataIndex:'mainwork',width:75 },
			{ header:'Biaya ($)',dataIndex:'biaya',width:75 }
		]};
		me.callParent(arguments);
		me.addEvents(
			//'grcause'
        );
	},
	
});
