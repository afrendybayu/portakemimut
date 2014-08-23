// afrendyBayu,12Feb2014 //
Ext.define('rcm.view.laporan.EPOCol', {
    xtype: 'tEPOCol',
	extend: 'Chart.ux.Highcharts',
	loadMask: true,
	
	series : [{
		colorField: 'color',
		dataIndex: 'wo',
		name: 'Maintenance Order'
	}],
	
	store: 'SapEPO',
	xField: 'nama',
	
	initComponent: function() {
		var me=this;
		me.chartConfig = {
			//colors: ['#FF6600'],
			chart: {
				type: 'column',
				zoomType: 'x',
				animation : {
					duration: 1500,
					easing: 'swing'
				},
				backgroundColor: '#d9e9ef'
			},
			title : {
				text: me.jdl,
				//x: -40
			},
			xAxis : [{
				title : {
					//text : 'Waktu',
				}
			}],
			yAxis : {
					//max: 100,
					//min: 60,
				title : {
					text : 'Number of WO'
				}
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
								//rcmSettings.bongkar = evt;
								alert(evt.currentTarget.x);
								//me.fireEvent('ReHomeCl', evt.currentTarget.x, this.category);
							}
						}
					}
				},
				column: {
					dataLabels: {
						enabled: true,
						formatter : function() {
							return this.y;
						}
					}
				},
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
				}
			},
			credits : {
				text : 'hc'
			},
			legend : {
				enabled: false,
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : -10,
				//y : 100,
				borderWidth : 0
			}
		};
		me.callParent(arguments);
	}
});
