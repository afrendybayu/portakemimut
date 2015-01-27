// afrendyBayu,15Feb2014 //
Ext.define('rcm.view.laporan.SapPie', {
    xtype: 'tSapPie',
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
	/*
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
	//*/
	initComponent: function() {
		var me=this;
		me.store=me.dstore;
			me.series= [{
			type: 'pie',
			colorField: 'color',
			categorieField: 'nama',
			dataField: me.field,
			name: 'Persen Order',
			dataLabels: {
				formatter: function() {
					//return this.y>1 ? '<b>'+this.point.name+':</b> '+this.y+me.dsat : null;
					console.log(this.y);
					return this.y>1 ? this.point.name+'<br/><b>'+this.y+me.dsat+'</b>' : null;
				}
			}
		}];
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
				text : me.jdl,
				x : -20 //center
			},
			subtitle: {
				//text: 'Availability'
				text: me.subjdl
			},
			plotOptions: { 
				pie: { 
					allowPointSelect: true 
				} 
			},
			tooltip : {
				formatter : function () {
					return '<b>'+this.point.name+': '+this.y+me.dsat+'</b>';
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
				text: 'hc'
			}
		};
		me.callParent(arguments);
	}
	/*
	,cariNilai: function(d)	{
		var sd = d.split("p");
		if (sd.length>1)	return parseFloat(sd[0]);
		else d;
	}
	
	,cariKet: function(d)	{
		var sd = d.split("p");
		if (sd.length>1)	return sd[1];
	}
	//*/
});
