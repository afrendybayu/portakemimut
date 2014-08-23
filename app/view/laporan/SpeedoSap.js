// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.SpeedoSap', {
    xtype: 'tSapSpeedo',
    //alias: 'widget.tAvSpeedo',
	extend: 'Chart.ux.Highcharts',
	jdl: '-',
	subjdl: '-',
	//dstore: 'SapSpeedo',
	min: 0,
	hijau:10,
	kuning:40,

	ukur: 15,
	loadMask: true,
	
	series : [{
		type: 'gauge',
		name: 'av',
		tooltip: {
			valueSuffix: 'Persen'
		},
		//store: 'AvSpeedo',
		dataIndex: 'persen',

		dataLabels: {
			//color: '#E58964',
			borderWidth: 0,
			y: -40,
			x: 5,
			style: {
				fontSize: '24px',
				fontFamily: 'digital'
				//fontStyle: 'italic'
			},
			formatter: function() {
				return (this.y+ '%')
			}
		},
		zIndex: 1,
		pivot: {
			radius: '0'
		}
	}],
	
	initComponent: function() {
		var me=this;
		me.store=me.dstore;
		me.chartConfig={
			chart: {
				type: 'gauge',
				backgroundColor: '#d9e9ef'
			},
			pane: {
				center: ['50%', '100%'],
				size: [me.ukur],
				startAngle: -90,
				endAngle: 90,
				background: [{
					backgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, '#FFF'],
							[1, '#333']
						]
					},
					borderWidth: 0,
					outerRadius: '109%'
				}, {
					backgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, '#333'],
							[1, '#FFF']
						]
					},
					borderWidth: 1,
					outerRadius: '107%'
				}, {
					// default background
				}, {
					backgroundColor: '#DDD',
					borderWidth: 0,
					outerRadius: '105%',
					innerRadius: '103%'
				}]
			},

			title : {
				//text : 'Gas Compressor #2@ Borang',
				text: this.jdl
			},
			subtitle: {
				//text: 'Availability'
				text: this.subjdl
			},
			yAxis : {
					min: this.min,
					max: 100,
					//*
					minorTickInterval: 'auto',
					minorTickWidth: 1,
					minorTickLength: 10,
					minorTickPosition: 'inside',
					minorTickColor: '#666',
					//*/
					tickPixelInterval: 20,
					tickWidth: 2,
					tickPosition: 'inside',
					tickLength: 10,
					tickColor: '#666',
					//*
					labels: {
						step: 2,
						rotation: 'auto'
					},
					//*/
					title: {
						//text: ' '
					},
					plotBands: [{
						from: 0,
						to: this.hijau,
						color: '#55BF3B' // green
					}, {
						from: this.hijau,
						to: this.kuning,
						color: '#DDDF0D' // yellow
					}, {
						from: this.kuning,
						to: 100,
						color: '#DF5353' // red
					},{
						from: 0,
						to: 100,
						innerRadius: '40%',
						outerRadius: '65%'
						/*
						color: {linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
							stops: [
								[0, '#ff0000'],
								[1, '#00ff00']
							]} // green
						//*/
						/*
						color: { radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
							stops: [
							   [0, '#ff0000'],
							   [1, '#00ff00']
							]}
						//*/
					}]    
			},
			plotOptions : {
					series : {
						animation : {
							duration : 1000,
							easing : 'swing'
						}
					},
					column: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: Highcharts.getOptions().colors[3],
                            style: {
                                fontWeight: 'bold'
                                //margin: '10 0',
                            },
                            formatter: function() {
                                return this.y+'%';
                            }
                        }
					}
				},
				tooltip : {
					formatter : function() {
						return '<b>'+this.series.name+'</b>: '+this.y+'%';
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
					borderWidth : 0
				}
			
		};
		me.callParent(arguments);
	}
});
