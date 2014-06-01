// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.WOManCP', {
    xtype: 'tWOManCP',
	extend: 'Ext.panel.Panel',
	layout: 'fit',
	border: 1,

	initComponent: function() {
		var me=this;
		me.items = [{
			xtype: 'highchart',
			loadMask: true,
			defaultSerieType: 'column',

			series : [{
				dataIndex: 'woc',
				name: 'Persen Teco',
			}],
			store: 'HoMan',
			xField: 'nama',

			chartConfig: {
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
					title : {
						text : 'Persen [%]'
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
									me.fireEvent('AvHomeCl', evt.currentTarget, this.category);
								}
							}
						}
					},
					column: {
						dataLabels: {
							enabled: true,
							formatter : function() {
								return this.y+'%';
							}
						}
					},
				},
				tooltip : {
					formatter : function() {
						return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y+'%';
					}
				},
				credits : {
					text : 'hc'
				}
			}
		}];
		me.callParent(arguments);
	}
});
