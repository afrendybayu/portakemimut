/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.utama.GridOrderC', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridOrderC',
	xtype: 'tGridOrderC',
    
	store: 'HoOrderC',
	
	initComponent: function() {
		var me=this;//, sumFt=Ext.create('Ext.grid.feature.Summary');
		me.features = [{ftype: 'summary'}];
		me.columns = {
			/*
			defaults: {
                draggable: false,
                resizable: false,
                hideable: false,
                groupable: false,
            },
            //*/
			items: [
				{ xtype:'rownumberer',width:25 },		// 
				{ header:'Order Costing (Object Type)',//flex:3,
					columns: [{ 
						header: 'Object Type',dataIndex:'otipe'
					},{ header: 'Description',dataIndex:'desc',width: 160
						,summaryRenderer: function() {
							return Ext.String.format('  TOTAL  '); 
						} 
					}]
				},
				{ header:'Planned Cost',//flex:1,
					columns: [{ 
						header: 'WH Stock Cost',dataIndex:'plstcost',align: 'right'
					},{ header: 'Internal Cost',dataIndex:'plincost',align: 'right',
						summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('tplcost'));
							}
							return total.toFixed(2);
						}
					},{ header: 'Total Planning Cost',dataIndex:'tplcost',flex:2,align: 'right'
					}]
				},
				{ header:'Actual',//flex:1,
					columns: [{ 
						header: 'WH Stock Cost',dataIndex:'acstcost',align: 'right'
					},{ header: 'Internal Cost',dataIndex:'acincost',align: 'right'
					},{ header: 'Service Cost',dataIndex:'srvcost',align: 'right'
						,summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('taccost'));
							}
							return total.toFixed(2);
						}
					},{ header: 'Total Actual Cost',dataIndex:'taccost',align: 'right'
					}]
				}
				/*
				,{ header:'Budget 2014',dataIndex:'budget',flex:1 },
				{ header:'% Budget 2014',dataIndex:'persen',flex:1 }
				//*/
		]};
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
