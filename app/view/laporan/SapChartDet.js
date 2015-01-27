/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.laporan.SapChartDet', {
	//extend: 'Ext.container.Container',
	extend: 'Ext.form.Panel',

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
		
		me.dockedItems = [{
			dock: 'top',
			idThn: me.idThn,
			idTipe: me.idTipe,
			idbSr: me.idbSr,
			//xtype: 'label',
			xtype: 'tFThnTp',
			text: me.idThn			
		}],
		
		me.items = [{
			xtype: 'causechart',
			region: 'center',
			dstore: me.dstore,
			jdl: me.jdlGr,
			btnFilter: me.btnFilter,
			param: me.param
		},{
			title: me.jdlTb,
			xtype: 'taskGridCause',
			region: 'east',
			dstore: me.dstore,
			width:320,
			collapsible: true,
			split: true,
			iconCls: 'editEvent',
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
			iconCls: 'more'
		}];
		me.callParent(arguments);
	}
});
