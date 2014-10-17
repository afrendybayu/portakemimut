/* AfrendyBayu, 18Okt2014 */
Ext.define('rcm.view.konfig.PanelList', {
	extend: 'Ext.form.Panel',
    xtype: 'tpKonfigList',
    
    requires: [
		'rcm.view.konfig.GridL'
		,'rcm.view.konfig.GridEquip'
    ],
    
    
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
			xtype: 'label',
			region: 'center',
			
			//dstore: me.dstore,
			text: 'me.jdlGr',
			//btnFilter: me.btnFilter,
			//param: me.param
		},{
			title: me.jdlTb,
			xtype: 'label',
			region: 'east',
			text: 'me.dstore',
			minWidth:320,
			//collapsible: true,
			//split: true,
			iconCls: 'editEvent',
			//btnFilter: me.btnFilter
		},{
			collapsible: true,
			split: true,
			minHeight: 100,
			maxHeight: 300,
			height: 200,
			region: 'south',
			title: me.jdlDet,
			xstore: me.dstoreD,
			xtype: 'tGridKEq',
			iconCls: 'more'
		}];
		me.callParent(arguments);
	}
});
