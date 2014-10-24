Ext.define('rcm.view.konfig.TreeHirarki', {
    extend: 'Ext.tree.Panel',
    xtype: 'treeHirarki',
	
	requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.column.Action'
    ],
	
    rootVisible: true,
    store: 'LokUnit',
	hideHeaders: true,
    
	dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
					text : 'Tambah Lokasi',
					id	: 'tambah_lokasi'
				},'->',{
                    iconCls: 'new_folder_tree',
                    tooltip: 'New Folder'
                },{
                    iconCls: 'delete_folder_tree',
                    id: 'delete-folder-btn',
                    tooltip: 'Delete Folder'
                }
            ]
        }
    ],
	
    
	initComponent: function() {
		var me = this;
        me.plugins = [me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing')];

        me.columns = [{
                xtype: 'treecolumn',
                dataIndex: 'nama',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
			},{
                xtype	: 'actioncolumn',
                width	: 24,
				icon	: 'resources/css/images/delete.png',
                iconCls	: 'x-hidden',
                tooltip	: 'Delete',
                handler	: Ext.bind(me.handleDeleteClick, me)
            }];
		
        me.callParent(arguments);
		
	},
	
	handleDeleteClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
		// alert ('klik hirarki delete');
        this.fireEvent('deleteclick', gridView, rowIndex, colIndex, column, e);
    }
});
