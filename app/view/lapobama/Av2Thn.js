// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.lapobama.Av2Thn', {
    xtype: 'tAv2Thn',
	extend: 'Chart.ux.Highcharts',

	jdl: '-',
	loadMask: true,
	
	
	
	store: 'AvReUnit',
	xField: 'm',
	
	
	initComponent: function() {
		var me=this;
		me.series = [{
			//dataIndex: 'av2013',
			dataIndex: me.avrem1,
			name: me.navrem1
		},{
			type: 'spline',
			dataIndex: me.avrem1,
			//dataIndex: avre,
			name: me.navrem1,
			visible: false,
			marker: {
				lineWidth: 2,
				lineColor: Highcharts.getOptions().colors[1],
				fillColor: 'white'
			}
		},{
			//dataIndex: 'av2014',
			dataIndex: me.avre,
			name: me.navre
		},{
			type: 'spline',
			dataIndex: me.avre,
			name: me.navre,
			visible: false,
			marker: {
				lineWidth: 2,
				lineColor: Highcharts.getOptions().colors[3],
				fillColor: 'white'
			}
		}];
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
				text: me.jdl
				//x: 0
			},
			xAxis : [{
				title : {
					text : 'Waktu'
				}
			}],
			yAxis : {
				max: 100,
				title : {
					text : 'Persen [%]'
				},
				
				plotLines : [{
					value : 0,
					width : 1,
					color : '#808080'
				}]
			},
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
			credits : {
				text : 'hc'
			}
		};
		me.callParent(arguments);
	}
});
