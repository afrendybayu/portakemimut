/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridContract', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridCause',
	xtype: 'tGridContract',
	//dstore:'Contract',
	
	initComponent: function() {
		var me=this;
		me.store = 'Contract';	//me.dstore,
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Equipment',dataIndex:'nama',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL COST From Contract'); 
				} },
			{ header:'Jan',dataIndex:'b1', width:70,align:'right',summaryType:'sum' },
			{ header:'Feb',dataIndex:'b2', width:70,align:'right',summaryType:'sum' },
			{ header:'Mar',dataIndex:'b3', width:70,align:'right',summaryType:'sum' },
			{ header:'Apr',dataIndex:'b4', width:70,align:'right',summaryType:'sum' },
			{ header:'May',dataIndex:'b5', width:70,align:'right',summaryType:'sum' },
			{ header:'Jun',dataIndex:'b6', width:70,align:'right',summaryType:'sum' },
			{ header:'Jul',dataIndex:'b7', width:70,align:'right',summaryType:'sum' },
			{ header:'Aug',dataIndex:'b8', width:70,align:'right',summaryType:'sum' },
			{ header:'Sep',dataIndex:'b9', width:70,align:'right',summaryType:'sum' },
			{ header:'Oct',dataIndex:'b10',width:70,align:'right',summaryType:'sum' },
			{ header:'Nov',dataIndex:'b11',width:70,align:'right',summaryType:'sum' },
			{ header:'Dec',dataIndex:'b12',width:70,align:'right',summaryType:'sum' },
			{ header:'Total Contract Value',dataIndex:'tot',flex:1,align:'right',summaryType:'sum' }
		]};
		
		me.callParent(arguments);
		//me.addEvents();
	}
});
