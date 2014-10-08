/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapChartTop10', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.form.Panel',

    xtype: 'tSapTop10',
    jdl: '-',
    param: '-',
	dstore1: '-',
	dstore2: '-',
    //jdlDet: '--',
 
	layout: 'border',

	initComponent: function() {
		var me=this;
		
		me.dockedItems = [{
			dock: 'top',
			idThn: me.idThn,
			idbSr: me.idbSr,
			xtype: 'tFThn',
			text: me.idThn			
		}],
		
		me.items = [{
			xtype: 'causechart',
			region: 'center',
			dstore: me.dstore1,
			jdl: me.jdl1,
			btnFilter: me.btnFilter,
			param: me.param1,
			yNama: me.yNama,
			duit: me.duit,
			flex:1
		},{
			xtype: 'causechart',
			region: 'south',
			dstore: me.dstore2,
			jdl: me.jdl2,
			btnFilter: me.btnFilter,
			param: me.param2,
			yNama: me.yNama,
			duit: me.duit,
			flex:1
		}];
		me.callParent(arguments);
	}
});
