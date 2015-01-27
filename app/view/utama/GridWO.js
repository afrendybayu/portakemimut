/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.utama.GridWO', {
	extend: 'Ext.grid.Panel',
	//alias: 'widget.gridWO',
	xtype: 'tGridWO',
    
	store: 'HoMan',
	
	initComponent: function() {
		var me=this;
		me.features = [{ftype: 'summary'}];
		me.columns = {
			items: [
			{ xtype:'rownumberer',width:25 },
			{ header:'Work Center',dataIndex:'nama',flex:1, 
				//*
				summaryRenderer: function() {
					return Ext.String.format('TOTAL ALL WO'); 
				} 
				//*/
			},
			{ header:'WO Compliance',dataIndex:'woc',width:110,xtype:'templatecolumn',tpl:'{woc} %',align: 'right'
				//*
				,summaryType: function(rec){
					var tot = rec.reduce(function(sums, rec){
						return [sums[0] + rec.data.teco, 
								sums[1] + rec.data.tot ];
					}, [0,0]);
					//alert("tot0: "+tot[0]+"tot1: "+tot[1]);
					var p = (tot[0]*100)/tot[1];
					return parseFloat(Math.round(p * 100) / 100).toFixed(3);
				}
				//*/
			}
		]};
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
