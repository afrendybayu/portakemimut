/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapChartDet', {
	extend: 'Ext.container.Container',

    xtype: 'tSapDet',
    jdlGr: '-',
    jdlTb: '--',
    param: '-',
	dstore: '-',
	dstoreD: '-',
    jdlDet: '--',
 
	layout: {
		type: 'border'
	},
    
	initComponent: function() {
		var me=this;
		me.items = [{
			xtype: 'causechart',
			region: 'center',
			dstore: me.dstore,
			jdl: me.jdlGr,
			param: me.param,
		},{
			title: me.jdlTb,
			xtype: 'taskGridCause',
			region: 'east',
			dstore: me.dstore,
			width:320,
			collapsible: true,
			split: true,
			icon: 'modul/icons/edit1.png',
			btnFilter: me.btnFilter
		},{
			collapsible: true,
			split: true,
			minHeight: 100,
			maxHeight: 300,
			height: 200,
			region: 'south',
			title: me.jdlDet,
			dstore: me.dstoreD,
			xtype: 'taskGridCauseInfo',
			icon: 'modul/icons/more.png',
		}];
		me.callParent(arguments);
	}
});
