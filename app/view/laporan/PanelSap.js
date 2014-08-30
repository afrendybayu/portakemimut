/* Afrendy Bayu, 25Nov2013 */

Ext.define('rcm.view.laporan.PanelSap', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.isiFormGagal',
	xtype: 'tpSapHistori',
	require: [
		'rcm.view.laporan.FilterHistori'
	],

	dockedItems: [{
		dock: 'top',
		xtype: 'tFHistori',
	}],
	
	
	
	initComponent: function() {		
		var me=this;
		
		me.items= [{
			//iconCls: 'Reliability',
			xtype: 'tHistori',
			dstore: me.dstore
		}];
		me.callParent(arguments);
		
	}
});
