/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridCauseInfo', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridCause',
	xtype: 'taskGridCauseInfo',
	loadMask: true,
	
	require: [
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.ux.grid.FiltersFeature'
	],

    
    dstore: '-',
    features: [{ftype: 'filters',local: true }],
	//store: 'SapCauseInfo',
	
	initComponent: function() {
		var me=this;
		me.store= me.dstore;
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:50 },
			{ header:'No PID',dataIndex:'noorder',width:75 },
			{ header:'No Order',dataIndex:'nosap',width:75 },
			{ header:'Tipe',dataIndex:'tipe',width:40, minWidth:40, 
				filter: { type: 'list', store: Ext.create('rcm.store.SapTipe') } 
				//filter: { type: 'string' }
			},
			{ header:'Equipment',dataIndex:'equip',flex:1, minWidth:100, filter: { type: 'string' } },
			{ header:'Object Part',dataIndex:'opartnm',flex:1, minWidth:120, filter: { type: 'string' } },
			{ header:'Plan Start',dataIndex:'plnstr',flex:1 },
			{ header:'Description Order',dataIndex:'orderdesc', minWidth: 250,flex:1 },
			{ header:'Damage',dataIndex:'damagenm',width:120, filter: { type: 'string' } },
			{ header:'Cause',dataIndex:'causenm',width:180, filter: { type: 'string' } },
			{ header:'Down Time',dataIndex:'down',width:80 },
			{ header:'Main Work',dataIndex:'mainwork',width:75, filter: { type: 'string' } },
			{ header:'Biaya ($)',dataIndex:'biaya',width:75,renderer:'usMoney' }
		]};
		me.callParent(arguments);
		me.addEvents(
			//'grcause'
        );
	}
	
});
