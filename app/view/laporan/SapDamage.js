/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapDamage', {
	xtype: 'damagechart',
	extend: 'Ext.chart.Chart',
	width:100,
	height:100,

	initComponent: function() {
		var me=this;
		//me.width=100;
		//me.height=100;
		me.store='SapDamage';
		me.animate=true;
		me.shadow=true;
		
		me.tbar= {
			
		};
        me.background= {
			gradient: {
				angle: 0,
				stops: {
				//	0: { color: '#ffff00' },
				//	100: {	color: '#eaf1f8' }
				}
			}
		};
		me.axes = [{
				title: 'Frequent',
				type: 'Numeric',
				position: 'bottom',
				fields: ['jml'],
				grid: true,
				minimum: 0,
			},{
				title: 'Damage',
				type: 'Category',
				position: 'left',
				fields: ['nama'],
				//grid: true,
				label: {
					//rotate: {
					//	degrees: -0
					//}
				}
		}];
		me.series = [{
				type: 'bar',
				highlight: true,
				axis: 'bottom',
				xField: 'nama',
				yField: ['jml'],
		}];
		me.items = [{
			type: 'text',
			text: 'Chart Damage Frequent',
			font: '20px Arial',
			width: 100,
			height: 30,
			x: 500, //the sprite x position
			y: 20  //the sprite y position
		}];
		me.callParent(arguments);
	}
});
