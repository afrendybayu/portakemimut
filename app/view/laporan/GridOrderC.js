/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridOrderC', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridOrderC',
	xtype: 'tSapOrderC',
	//store: 'HoOrderC',
	//jdl: 'apa',
	
	initComponent: function() {
		var me=this;//, sumFt=Ext.create('Ext.grid.feature.Summary');
		me.store= me.dstore;
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
				{ header:'Order Costing',//flex:3,
					columns: [{ 
						header: me.jdl, dataIndex:'otipe'
					},{ header: 'Description',dataIndex:'desc', flex: 1//width: 160
						,summaryRenderer: function() {
							return Ext.String.format('  TOTAL  '); 
						} 
					}]
				},
				{ header:'Planned Cost',//flex:1,
					columns: [{ 
						header: 'WH Stock',dataIndex:'plstcost',align: 'right',width: 70,renderer:'usMoney'
					},{ header: 'Internal',dataIndex:'plincost',align: 'right',width: 70,renderer:'usMoney',
						summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('tplcost'));
							}
							return total.toFixed(2);
						}
					},{ header: 'Total Planning',dataIndex:'tplcost',flex:2,align: 'right',width: 80,renderer:'usMoney'
					}]
				},
				{ header:'Actual',//flex:1,
					columns: [{ 
						header: 'WH Stock',dataIndex:'acstcost',align: 'right',width: 70,renderer:'usMoney'
					},{ header: 'Internal',dataIndex:'acincost',align: 'right',width: 60,renderer:'usMoney'
					},{ header: 'Service',dataIndex:'srvcost',align: 'right',width: 70,renderer:'usMoney'
						,summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('taccost'));
							}
							return total.toFixed(2);
						}
					},{ header: 'Total Actual',dataIndex:'taccost',align: 'right',width: 70,renderer:'usMoney'
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
