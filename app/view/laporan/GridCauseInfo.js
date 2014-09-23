/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridCauseInfo', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridCause',
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
			{ header:'No SAP',dataIndex:'nosap',width:75 },
			{ header:'Tipe',dataIndex:'tipe',width:40 },
			{ header:'Equipment',dataIndex:'equip',flex:1 },
			{ header:'Object Part',dataIndex:'opartnm',flex:1 },
			{ header:'Damage',dataIndex:'damagenm',width:150 },
			{ header:'Cause',dataIndex:'causenm',width:180 },
			{ header:'Down Time',dataIndex:'down',width:80 },
			{ header:'Main Work',dataIndex:'mainwork',width:75 },
			{ header:'Biaya ($)',dataIndex:'biaya',width:75 }
		]};
		me.callParent(arguments);
		me.addEvents(
			//'grcause'
        );
	}
	
});
