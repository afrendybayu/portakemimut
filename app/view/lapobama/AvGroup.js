// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.lapobama.AvGroup', {
    xtype: 'tAvGroup',
	extend: 'Chart.ux.Highcharts',
	
	waktu: 'Mei 2014',
	//jdl: 'dqwdwqd',
	loadMask: true,
	
	series : [{
		dataIndex: 'av',
		name: 'Availability'
	},{
		dataIndex: 're',
		name: 'Reliability'		
	}],
	store: 'AvGroup',
	xField: 'kode',

	initComponent: function() {
		var me=this;
		me.chartConfig= {
			
			colors: ['#66FF00','#FF6600'],
			chart: {
				type: 'bar',
				zoomType: 'xy',
				animation : {
					duration: 1500,
					easing: 'swing'
				},
				backgroundColor: '#d9e9ef'
			},
			
			title : {
				text: me.jdl
				
			},
			yAxis : {
				max: 100,
				min: 50,
				title : {
					text : 'Persen [%]'
				}
			},
			plotOptions : {
				
				/*bar: {
					dataLabels: {
						enabled: true,
						formatter : function() {
							return '<b>Av: '+this.y+'%</b>';
						}
					}
				},
				//*/
				series : {
					animation : {
						duration : 1000,
						easing : 'swing'
					},
					cursor: 'pointer',
					point: {
						events: {
							click: function(evt) {
								
								rcmSettings.bongkar = evt;
								//alert("x: "+this.x+" y: "+this.y );
								me.fireEvent('AvGroupCl', evt, this.category);
								
							}
						}
					},
					data: {
						id: 'id'
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
				//enabled: false,
			}
		};
		me.callParent(arguments);
	}
});

