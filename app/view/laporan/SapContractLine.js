// afrendyBayu,15Feb2014 //
Ext.define('rcm.view.laporan.SapContractLine', {
    xtype: 'tContractL',
	extend: 'Chart.ux.Highcharts',
	//*
	require: [
		'rcm.view.Util'
		//,'rcm.view.laporan.FilterHistori'
	],
	//*/
	loadMask: true,
	
	series : [{
			type: 'spline',
			dataIndex: 'gc',
			name: 'Gas Compressor'
		},{
			type: 'spline',
			dataIndex: 'gs',
			name: 'Generator Set'
		},{
			type: 'spline',
			dataIndex: 'pm',
			name: 'Pump'
	}],
	
	// store:'SapHistori',
	xField: 'bln',
	
	initComponent: function() {
		var me=this;
		me.store='SapHistori';
		me.store='ContractLine';
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
			colors: ['#10ae3d', '#f32727', '#0000FF'],
			title : {
				text: 'Trend Cost Center '+rcm.view.Util.U1th(''),
				x: -50
			},
			xAxis : [{
				title : {
					text : 'Waktu'
				}
			}],
			yAxis : [{
				title : {
					text : 'Cost'
				},
				min: 0
			}],
			plotOptions : {
				series : {
					animation : {
						duration : 1000,
						easing : 'swing'
					}
				},
				column: {
					dataLabels: {
						enabled: true,
						formatter : function() {
							return this.y;
							//return this.y;
						}
					}
				}
			},
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
				}
			},
			//*
			legend : {
                    layout : 'vertical',
                    align : 'right',
                    verticalAlign : 'top',
                    x : -10,
                    y : 10,
				borderWidth : 0
			},
			//*/
			credits : {
				text : 'hc'
			}
		};
		me.callParent(arguments);
	}
});
