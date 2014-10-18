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
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			region: 'center',
			
			
			text: 'me.jdlGr',
			//btnFilter: me.btnFilter,
			//param: me.param,
			items:[{
				title: me.jdlKi,
				xtype: 'tKGridL',
				xstore: me.dstoreKi,
				dragGroup: 'GrupA',
				dropGroup: 'GrupB',
				flex: 1
			},{
				title: me.jdlKa,
				xtype: 'tKGridL',
				dragGroup: 'GrupB',
				dropGroup: 'GrupA',
				xstore: me.dstoreKa,
				flex: 1
			}]
		},{
			title: me.jdlTb,
			xtype: 'label',
			region: 'west',
			//xstore: me.dstoreKa,
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
