// afrendyBayu,15Feb2014 //
Ext.define('rcm.view.laporan.EPOPie', {
    xtype: 'tEPOPie',
	extend: 'Chart.ux.Highcharts',
	
	loadMask: true,

	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	defaults: {
		flex: 1,
		hideLabel: true
	},
	series: [{
		type: 'pie',
		colorField: 'color',
		categorieField: 'nama',
		dataField: 'persen',
		name: 'Persen Order',
		dataLabels: {
			formatter: function() {
				return this.y>1 ? '<b>'+this.point.name+':</b> '+this.y+'%' : null;
			}
		}
	}],
	
	initComponent: function() {
		var me=this;
		me.store='SapEPO';
		me.chartConfig={
			chart : {
				type: 'pie',
				animation : {
					duration: 1500,
					easing: 'swing'
				},
				backgroundColor: '#d9e9ef'
				//marginRight : 130,
				//marginBottom : 120
			},
			title : {
				text : 'Work Order Compliance',
				x : -20 //center
			},
			plotOptions: { 
				pie: { 
					allowPointSelect: true 
				} 
			},
			tooltip : {
				formatter : function () {
					return '<b>'+this.point.name+': '+this.y+'%</b>';
				}
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : -10,
				y : 100,
				borderWidth : 0
			},
			credits: {
				text: 'hc',
			}
		};
		me.callParent(arguments);
	}
});
