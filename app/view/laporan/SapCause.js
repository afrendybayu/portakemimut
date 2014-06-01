/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapCause', {
	xtype: 'causechart',
	//extend: 'Ext.chart.Chart',
	extend: 'Chart.ux.Highcharts',
	dstore: 'SapCause',
	jdl: 'Grafik',
	param: 'Cause',
	loadMask: true,

	xField: 'nama',

	initComponent: function() {
		var me=this;
		me.series = [{
			dataIndex: 'jml',
			name: me.param,
		}];
		me.store= me.dstore;
		me.chartConfig= {
			chart: {
				type: 'bar',
				zoomType: 'x',
				animation : {
				duration: 1500,
					easing: 'swing'
				},
				backgroundColor: '#d9e9ef',
			},
			
			title : {
				text: me.jdl,
			},
			yAxis : {
				title : {
					text : 'Jumlah WO'
				}
			},
			plotOptions : {
				bar: {
					dataLabels: {
						enabled: true,
						formatter : function() {
							return '<b>'+me.param+': '+this.y+'</b>';
						}
					}
				},

				series : {
					animation : {
						duration : 1000,
						easing : 'swing'
					},
					cursor: 'pointer',
					point: {
						events: {
							click: function(evt) {
								//alert("x: "+this.x+" "+this.y);
								//me.fireEvent('AvGroupCl', evt, this.category);
							}
						}
					}
				}
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
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : -10,
				y : 100,
				//borderWidth : 0
			},
		};
		me.callParent(arguments);
	}
});
