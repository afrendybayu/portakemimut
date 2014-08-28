/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.utama.GridOrderC', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridOrderC',
	xtype: 'tGridOrderC',
    
	store: 'HoOrderC',
	
	initComponent: function() {
		var me=this;//, sumFt=Ext.create('Ext.grid.feature.Summary');
		//me.features = [{ftype: 'summary'}];
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
				{ xtype:'rownumberer' },		// ,width:25
				{ header:'Order Costing (Object Type)',flex:3,
					columns: [{ 
						header: 'Object Type',dataIndex:'otipe',
					},{ header: 'Description',dataIndex:'desc'/*,width: 180*/
					}]
				},
				{ header:'Planned Cost',flex:1,
					columns: [{ 
						header: 'WH Stock Cost',dataIndex:'plstcost',
					},{ header: 'Internal Cost',dataIndex:'plincost',
					},{ header: 'Total Planning Cost',dataIndex:'tplcost',flex:2
					}]
				},
				{ header:'Actual',flex:1,
					columns: [{ 
						header: 'WH Stock Cost',dataIndex:'acstcost',
					},{ header: 'Internal Cost',dataIndex:'acincost',
					},{ header: 'Service Cost',dataIndex:'srvcost',
					},{ header: 'Total Actual Cost',dataIndex:'taccost'
					}]
				},
				{ header:'Budget 2014',dataIndex:'budget',flex:1 },
				{ header:'% Budget 2014',dataIndex:'persen',flex:1 }
		]};
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
