/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridConMon', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridConMon',
	xtype: 'tGridConMon',
    //border: 0,
	store: 'ConMon',
	
	initComponent: function() {
		var me=this;
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Year',dataIndex:'thn',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL'); 
				} 
			},
			{ header:'Condition Monitoring',dataIndex:'jml',flex:1,summaryType:'sum' }
		]};
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
