/* AfrendyBayu, 20Jan2014 */
Ext.define('rcm.view.laporan.GridWork', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridWork',
	xtype: 'tGridWork',
    border: 0,
	store: 'HoMan',
	
	initComponent: function() {
		var me=this;//, sumFt=Ext.create('Ext.grid.feature.Summary');
		me.features = [{ftype: 'summary'}];
		me.columns = {	
			items: [
			{ xtype:'rownumberer',width:25 },
			{ text:'Work Centre',dataIndex:'nama',flex:1, 
				summaryRenderer: function() {
					return Ext.String.format('TOTAL ALL WO'); 
				} 
			},
			{ text:'Open',dataIndex:'open',flex:1,summaryType:'sum' },
			{ text:'Teco',dataIndex:'teco',flex:1,summaryType:'sum' },
			{ text:'Total Work Order<br/>Per Work Centre',dataIndex:'tot',flex:1,summaryType:'sum' },
			{ text:'WO Compliance',dataIndex:'woc',width:110,xtype:'templatecolumn',tpl:'{woc} %',
				summaryType: function(rec){
					var tot = rec.reduce(function(sums, rec){
						return [sums[0] + rec.data.teco, 
								sums[1] + rec.data.tot ];
					}, [0,0]);
					//alert("tot0: "+tot[0]+"tot1: "+tot[1]);
					var p = (tot[0]*100)/tot[1];
					return parseFloat(Math.round(p * 100) / 100).toFixed(3);
				}
			}
		]};
		me.callParent(arguments);
		me.addEvents(
        );
	}
});
