// afrendyBayu,16Feb2014 //
Ext.define('rcm.view.laporan.WOStack', {
    xtype: 'tWOStack',
	extend: 'Chart.ux.Highcharts',

	loadMask: true,

	series: [{
		dataIndex: 'woo',
		name: 'Open'
	},{
		dataIndex: 'woc',
		name: 'Teco'
	}],
	
	store: 'HoMan',
	xField: 'nama',

	initComponent: function() {
		var me=this;
		me.chartConfig= {
			chart: {
				type: 'column',
				/*
				zoomType: 'x',
				animation : {
					duration: 1500,
					easing: 'swing'
				},
				//*/
				backgroundColor: '#d9e9ef'
			},
			colors:['#FF0000', '#00FF00'],
			
			title : {
				text:'Work Order Compliance',
			},
			yAxis : {
				max: 100,
				min: 0,
				title : {
					text : 'Persen [%]'
				}
			},
			plotOptions : {
				column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
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
								//rcmSettings.bongkar = evt;
								//alert("x: "+this.x+" "+this.y);
								//me.fireEvent('AvGroupCl', evt, this.category);
							}
						}
					}
				}
			},
			tooltip : {
				formatter : function(rec) {
					rcmSettings.bbbb = rec;
					rcmSettings.cccc = this;
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
