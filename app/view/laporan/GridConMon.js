/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridConMon', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridConMon',
	xtype: 'tGridConMon',
    border: 0,
	store: 'ConMon',
	
	initComponent: function() {
		var me=this;
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25, header : 'No' },
			{ header:'Year',dataIndex:'tahun',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL'); 
				} 
			},
			{ header:'Condition Monitoring',dataIndex:'jml',flex:1,summaryType:'sum' }
		]};
		me.listeners = { 
			'celldblclick' : function(list, record, row, e ){
				// rcmSettings.itemmmmm = list;
				// rcmSettings.eeeeeeee = e;
				// rcmSettings.rrrrrrrr = record;
				var thn = e.data.tahun;
				// console.log(thn);
				this.fireEvent('filterThConMon', thn);
			}
		};
		me.bbar = {
			items : ['->',{
				xtype : 'button',
				id	: 'clr_filter',
				text : 'Clear Filter',
				iconCls: 'clrFilter'
				
			}]
		
		}
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
