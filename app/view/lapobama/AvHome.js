// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.lapobama.AvHome', {
    xtype: 'tAvHome',
	extend: 'Chart.ux.Highcharts',
	loadMask: true,
	
	requires:[
		'rcm.view.Util',
    ],
	
	series : [{
		dataIndex: 'th1',
		name: rcm.view.Util.Uthm1(),
	},{
		dataIndex: 'avg',
		name: rcm.view.Util.Uytd(),
	},{
		dataIndex: 'bln',
		name: rcm.view.Util.Ublnini(),
	}],
	
	store: 'AvHome',
	xField: 'm',

	initComponent: function() {
		var me=this;
		me.chartConfig = {
			chart: {
				type: 'column',
				zoomType: 'xy',
				animation : {
					duration: 1500,
					easing: 'swing'
				},
				backgroundColor: '#d9e9ef'
			},
			colors: ['#0d233a','#2f7ed8','#8bbc21'],
			title : {
					text: me.jdl,
					//x: -40
				},
				xAxis : [{
					title : {
						//text : 'Waktu',
					},
				}],
				yAxis : {
					max: 100,
					//min: 60,
					title : {
						text : 'Persen [%]'
					},
					
					plotLines : [{
						value : 98,
						color : 'red',
						dashStyle: 'ShortDash',
						width : 2,
						zIndex: 100,
						label : {
							text : 'Target >98%'
						}
					}]
				},
				plotOptions : {
					series : {
						animation : {
							duration : 1000,
							easing : 'swing'
						},
						cursor: 'pointer',
						point: {
							events: {
								click: function(evt) {
									//alert(this.category+": "+rcm.view.Util.cid(this.category) );
									me.fireEvent('AvHomeCl', evt.currentTarget, this.category, rcm.view.Util.cid(this.category));
								}
							}
						}
					}
				},
				tooltip : {
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y+'%';
					}
				},
				credits : {
					text : 'hc'
				},
				legend : {
					/*
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'top',
					x : -10,
					//y : 100,
					borderWidth : 0
					//*/
				}
			};
		me.callParent(arguments);
	}
});
