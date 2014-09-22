/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.DetCmGasComp', {
	xtype: 'detgascompcm',
	//extend: 'Ext.chart.Chart',
	extend: 'Chart.ux.Highcharts',
	dstore: '-',
	jdl: '-',
	param: '-',
	yNama: '',
	idx: '',
	warna: '',
	loadMask: true,

	xField: 'mbln',

	initComponent: function() {
		var me=this;
		var tgl = new Date();
		var	tskr = tgl.getFullYear(), tskr1= tskr-1, tskr2=tskr-2;
		me.series = [{
			dataIndex: 'skr2',
			name: tskr2
			// color : me.warna,
			// drilldown : true
		},{
			dataIndex: 'skr1',
			name: tskr1
		},{
			dataIndex: 'skr',
			name: tskr
		}];
		me.store= me.dstore;
		me.chartConfig= {
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
				text: me.jdl
			},
			yAxis : {
				title : {
					text : me.yNama
				}
			},
			plotOptions : {
				column: {
					dataLabels: {
						enabled: false,
						/*formatter : function() {
							return '<b>'+me.param+': '+this.y+'</b>';
						}*/
					}
				},

				series : {
					dataLabels: {
						enabled: false
					},
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
			//*
			tooltip : {
				formatter : function() {
					return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
				}
			},
			//*/
			credits : {
				text : 'hc'
			},
			/*
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'top',
				x : -10,
				y : 100
				//borderWidth : 0
			}
			*/
		};
		me.callParent(arguments);
	}
});
