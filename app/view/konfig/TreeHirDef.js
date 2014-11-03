Ext.define('rcm.view.konfig.TreeHirDef', {
    extend: 'Ext.tree.Panel',
    xtype: 'tHirDef',
	
	requires: [
        'Ext.ux.TreePicker'
    ],
	
    rootVisible: true,
    store: 'HirDef',

	initComponent: function() {
		var me = this;

        me.columns = [{
			xtype: 'treecolumn',
			name: 'parent',
			dataIndex: 'parent',
			displayField: 'nama',
			flex: 1
		}];
		
        me.callParent(arguments);
	}
});
