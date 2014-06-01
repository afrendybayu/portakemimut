// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.lapobama.AvHome', {
    xtype: 'tAvHome',
	extend: 'Ext.panel.Panel',
	layout: 'fit',
	//width: 300,
	border: 1,


	initComponent: function() {
		var me=this;
		me.items = [{
			xtype: 'highchart',
			loadMask: true,
			defaultSerieType: 'column',

			series : [{
				dataIndex: 'th1',
				name: '2013',
			},{
				dataIndex: 'avg',
				name: 'YTD/Avg 2014',
			},{
				dataIndex: 'bln',
				name: 'Feb 2014',
			/*
			},{
				type: 'spline',
				name: 'Target',
				dataIndex: 'tgt'
			//*/
			}],
			store: 'AvHome',
			xField: 'm',

			chartConfig: {
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
									me.fireEvent('AvHomeCl', evt.currentTarget, this.category);
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
			}
		}];
		me.callParent(arguments);
	}
});
