/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapCause', {
	xtype: 'causechart',

	extend: 'Chart.ux.Highcharts',
	dstore: 'SapCause',
	jdl: 'Grafik',
	param: 'Cause',
	yNama: 'Jumlah WO',
	loadMask: true,
	duit: 0,
	
	require: [
		'rcm.view.Util'
	],

	xField: 'desk',

	initComponent: function() {
		var me=this;
		me.series = [{
			dataIndex: 'jml',
			name: me.param,
			colorField: 'color'
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
				bar: {
					dataLabels: {
						enabled: true,
						formatter : function() {
							//return '<b>'+me.param+': '+this.y+'</b>';
							return '<b>'+rcm.view.Util.format2(me.duit,this.y,'$')+'</b>';
							//return '<b>'+this.y+'</b>';
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
								var f = {kode:(this.category).substr(1, (this.category).lastIndexOf("]")-1)};
								//alert("kode: "+f.kode+", filter:"+me.btnFilter);
								
								//alert((this.category).substr(1, (this.category).lastIndexOf("]")-1));
								//rcmS = this;
								//me.fireEvent('AvGroupCl', evt, this.category);
								me.fireEvent('sapFilter',me.btnFilter,f);	// .kode
							}
						}
					}
				}
			},
			tooltip : {
				formatter : function() {
					//return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + this.y;
					return '<b>' + this.series.name + '</b><br/>' + this.x + ': ' + rcm.view.Util.format2(me.duit,this.y,'$');
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
				y : 100
				//borderWidth : 0
			}
		};
		me.callParent(arguments);
	}
});
