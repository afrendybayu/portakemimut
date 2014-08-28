// afrendyBayu,15Feb2014 //
Ext.define('rcm.view.utama.HoHistori', {
    xtype: 'tHoHistori',
	extend: 'Chart.ux.Highcharts',

	loadMask: true,
	
	
	
	store: 'AvReUnit',
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
			title : {
				text: 'Histori',
				x: -50
			},
			series : [{
					type: 'column',
					dataIndex: 'av2013',
					name: 'Within',
					marker: {
						lineWidth: 2,
						lineColor: Highcharts.getOptions().colors[2],
						fillColor: 'white'
					}
				},{
					type: 'column',
					dataIndex: 'av2014',
					name: 'Overdue',
					marker: {
						lineWidth: 2,
						lineColor: Highcharts.getOptions().colors[3],
						fillColor: 'white'
					}
				},{
					type: 'spline',
					dataIndex: 'av2014',
					name: '% Past Due',
					yAxis: 1
			}],
			xAxis : [{
				title : {
					text : 'Waktu',
				},
			}],
			yAxis : [{
				//max: 100,
				title : {
					text : '# Work Orders'
				},
				
				plotLines : [{
					value : 0,
					width : 1,
					color : '#808080'
				}]
			},{
				max: 100,
				title : {
					text : 'Persen [%]'
				},
				labels: {
                    format: '{value}%',
                    style: {
                        color: '#4572A7'
                    }
                },
				
				plotLines : [{
					value : 0,
					width : 1,
					//color : '#808080'
				}],
				opposite: true
			}],
			plotOptions : {
				series : {
					animation : {
						duration : 1000,
						easing : 'swing'
					}
				}
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y+'%';
				}
			},
			legend : {
                    layout : 'vertical',
                    align : 'right',
                    verticalAlign : 'top',
                    x : -10,
                    y : 10,
				borderWidth : 0
			},
			credits : {
				text : 'hc'
			}
		};
		me.callParent(arguments);
	}
});
