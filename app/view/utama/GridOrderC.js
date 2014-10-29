/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.utama.GridOrderC', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridOrderC',
	xtype: 'tGridOrderC',
    
	store: 'HoOrderC',
	columnLines: true,
	
	viewConfig: {
        stripeRows: false
    //    enableTextSelection: true
    },
	
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
						header: 'WH Stock Cost',dataIndex:'plstcost',renderer:'usMoney',align: 'right'
					},{ header: 'Internal Cost',dataIndex:'plincost',renderer:'usMoney',align: 'right'
					},{ header: 'Total Planning Cost',dataIndex:'tplcost',flex:2,align: 'right',renderer:'usMoney',
						summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('tplcost'));
							}
							return total.toFixed(2);
							//return rcm.view.Util.format2(1,total.'$');
						}
					}]
				},
				{ header:'Actual',//flex:1,
					columns: [{ 
						header: 'WH Stock Cost',dataIndex:'acstcost',align: 'right',renderer:'usMoney'
					},{ header: 'Internal Cost',dataIndex:'acincost',align: 'right',renderer:'usMoney'
					},{ header: 'Service Cost',dataIndex:'srvcost',align: 'right',renderer:'usMoney'
						
					},{ header: 'Total Actual Cost',dataIndex:'taccost',align: 'right',renderer:'usMoney'
						,summaryType: function(records){
							var i = 0,length = records.length,total = 0,record;

							for (; i < length; i++) {
								record = records[i];
								total += parseFloat(record.get('taccost'));
							}
							return total.toFixed(2);
						}
					}]
				}
				//*
				,{ header:'Budget',dataIndex:'budget',flex:1, renderer:'usMoney',
					summaryType:'average',summaryRenderer: function(value) {
						//return Ext.String.format('${0}',value.toFixed(2));	} }
						return rcm.view.Util.format2(1,value,'$');	} }
				,{ header:'% Budget',dataIndex:'persen',flex:1,
					summaryType:'average',summaryRenderer: function(value) {
						return Ext.String.format('{0} %', value.toFixed(2));	} }
				//*/
		]};
		me.callParent(arguments);
		me.getView().on('refresh', this.updateRowSpan, this);
		me.addEvents(
        );
	},
	
	hitung: function(rec)	{
		
	},
	
	updateRowSpan: function() {
        var columns = this.columns,
            view = this.getView(),
            store = this.getStore(),
            rowCount = store.getCount(),
			
			col = [10,11],
            spanCell, spanCount, spanValue;

		for (var c=0; c<col.length; c++)	{
			spanCell = null;
            spanCount = null;
            spanValue = null;
			dtIndex = columns[col[c]].dataIndex;
			
			for (var row = 0; row < rowCount; ++row) {
				var cell = view.getCellByPosition({ row: row, column: col[c] }).dom,
					record = store.getAt(row),
					value = record.get(dtIndex);
				
				if (spanValue != value) {
					if (spanCell !== null) {
						spanCell.rowSpan = spanCount;
					}
					
					Ext.fly(cell).setStyle('display', '');
					spanCell = cell;
					spanCount = 1;
					spanValue = value;
				} else {
					spanCount++;
					Ext.fly(cell).setStyle('display', 'none');
				}
			}
			
			if (spanCell !== null) {
				spanCell.rowSpan = spanCount;
			}
		}
    }
});
