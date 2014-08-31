/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridContract', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridCause',
	xtype: 'tGridContract',
    dstore:'-',
	
	initComponent: function() {
		var me=this;
		me.store = me.dstore,
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Equipment',dataIndex:'nama',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL COST From Contract'); 
				} },
			{ header:'Jan',dataIndex:'b1',flex:1,summaryType:'sum' },
			{ header:'Feb',dataIndex:'b2',flex:1,summaryType:'sum' },
			{ header:'Mar',dataIndex:'b3',flex:1,summaryType:'sum' },
			{ header:'Apr',dataIndex:'b4',flex:1,summaryType:'sum' },
			{ header:'May',dataIndex:'b5',flex:1,summaryType:'sum' },
			{ header:'Jun',dataIndex:'b6',flex:1,summaryType:'sum' },
			{ header:'Jul',dataIndex:'b7',flex:1,summaryType:'sum' },
			{ header:'Aug',dataIndex:'b8',flex:1,summaryType:'sum' },
			{ header:'Sep',dataIndex:'b19',flex:1,summaryType:'sum' },
			{ header:'Oct',dataIndex:'b10',flex:1,summaryType:'sum' },
			{ header:'Nov',dataIndex:'b11',flex:1,summaryType:'sum' },
			{ header:'Dec',dataIndex:'b12',flex:1,summaryType:'sum' },
			{ header:'Total Contract Value',dataIndex:'jml',flex:1,summaryType:'sum' }
		]};
		
		me.callParent(arguments);
		me.addEvents(
			'gridCauseFilter',
			'clrChartCause'
        );
	}
});
