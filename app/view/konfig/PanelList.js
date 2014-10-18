/* AfrendyBayu, 18Okt2014 */
Ext.define('rcm.view.konfig.PanelList', {
	extend: 'Ext.form.Panel',
    xtype: 'tpKonfigList',
    
    requires: [
		'rcm.view.konfig.GridL'
		,'rcm.view.konfig.GridEquip'
		,'rcm.view.konfig.TreeCat'
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
			//xtype: 'label',
			//text: 'label',
			region: 'center',
			flex:1,
			//*
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			
			
			
			//text: 'me.jdlGr',
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
				flex: 1,
				jdlBtn: me.jdlBtnD,
				idBtn: me.idBtnD,
				dock: true
			}]
			//*/
		},{
			//title: me.jdlTb,
			xtype: 'tCatHir',
			//xtype: 'label',
			text: 'kiri',
			region: 'west',
			//flex:1,
			minWidth:320,
			width:320
			//collapsible: true,
			//split: true,
			//iconCls: 'editEvent',
			//weight: 50
			//btnFilter: me.btnFilter
		},{
			collapsible: true,
			split: true,
			minHeight: 100,
			maxHeight: 300,
			height: 200,
			region: 'south',
			title: me.jdlDet,
			//text: me.jdlDet,
			xstore: me.dstoreD,
			xtype: 'tGridKEq',
			//xtype: 'label',
			iconCls: 'more'
		}];
		me.callParent(arguments);
	}
});
