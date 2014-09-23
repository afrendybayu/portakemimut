/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.CmGasComp', {
	xtype: 'gascompcm',
	//extend: 'Ext.chart.Chart',
	extend: 'Chart.ux.Highcharts',
	dstore: '-',
	jdl: '-',
	yNama: '-',
	idx: '',
	warna: '',
	loadMask: true,

	xField: 'thn',

	initComponent: function() {
		var me=this;
		me.series = [{
			// colorByPoint: true,
			dataIndex: me.idx,
			name: me.param,
			color : me.warna,
			// drilldown : true
		}];
		me.store= me.dstore;
		me.chartConfig= {
			chart: {
				type: 'column',
				zoomType: 'y',
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
						enabled: true
					},
					animation : {
						duration : 1000,
						easing : 'swing'
					},
					cursor: 'pointer',
					point: {
						/*
						events: {
							click: function(evt) {
								alert("x: "+this.x+" "+this.y);
								//me.fireEvent('AvGroupCl', evt, this.category);
							}
						}
						//*/
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
