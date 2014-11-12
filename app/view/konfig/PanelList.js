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
			region: 'center',
			flex:1,
			xtype: 'panel',
			layout: {
				//type: 'hbox',
				type: 'border'
				//align: 'stretch'
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
				flex: 1,
				hide: me.dhideA,
				region: 'center'
				//collapsible: true,
			},{
				title: me.jdlKa,
				xtype: 'tKGridL',
				dragGroup: 'GrupB',
				dropGroup: 'GrupA',
				xstore: me.dstoreKa,
				flex: 1,
				jdlBtn: me.jdlBtnD,
				idBtn: me.idBtnD,
				dock: true,
				hidden: me.dhideB ? true:false,
				region: 'east',
				collapsible: true,
				//collapsed: true,
				split: true
			},{
				title: me.jdlKa,
				ngedit: me.ngedit,
				id: me.idTreeH,
				xtype: 'treeHirarki',
				idEqCH: me.idEqCH,
				hideDel: true,
				//dragGroup: 'GrupB',
				//dropGroup: 'GrupA',
				xstore: me.dstoreKa,
				flex: 1,
				jdlBtn: me.jdlBtnD,
				idBtn: me.idBtnD,
				dock: true,
				hidden: me.dhideC ? true:false,
				region: 'east',
				collapsible: true,
				//collapsed: true,
				split: true
			}]
			//*/
		},{
			id: me.cHir,
			//title: me.jdlTb,
			xtype: 'tCatHir',
			//xtype: 'label',
			idnC: me.idnC,
			iddC: me.iddC,
			text: 'kiri',
			region: 'west',
			//flex:1,
			minWidth:320,
			width:320,
			//collapsible: true,
			//split: true,
			//iconCls: 'editEvent',
			weight: 50
			//btnFilter: me.btnFilter
		},{
			collapsible: true,
			collapsed: true,
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
			iconCls: 'bullets'
		}];
		me.callParent(arguments);
	}
});
