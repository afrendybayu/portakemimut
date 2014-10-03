/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapChartSaja', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.form.Panel',

    xtype: 'tSapCh',
    jdl: '-',
    param: '-',
	dstore: '-',
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
			dstore: me.dstore,
			jdl: me.jdl,
			btnFilter: me.btnFilter,
			param: me.param,
			yNama: me.yNama,
			duit: me.duit
		}];
		me.callParent(arguments);
	}
});
