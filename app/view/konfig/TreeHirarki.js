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

	initComponent: function() {
		var me = this;
        me.plugins = [me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing')];
        me.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                dragGroup: me.dragGroup,
                dropGroup: me.dropGroup
            },
            listeners: {
                drop: function(node, data) {	// , dropRec, dropPosition
					//alert("listeners GridL "+me.dropGroup+" "+data.records[0].get("kode"));
					if (me.dropGroup=="GrupB")	{
						me.fireEvent('cdragdrop', data.records[0],rcmSettings.idc,rcmSettings.tkf);
						//console.log("listeners GridL "+me.dropGroup);
					}
					//*
					//console.log(me.dropGroup+" GrupA");
					if (me.dropGroup=="GrupA")	{
						me.fireEvent('ddragdrop', data.records[0],rcmSettings.idc,rcmSettings.tkf);
						//alert("listeners GridL "+me.dropGroup+" "+data.records[0].get("kode"));
					}
					//*/
                }
            }
        };
		me.dockedItems= me.dock ? []:[{
				xtype: 'toolbar',
				dock: 'bottom',
				items: [{
						text : 'Tambah Lokasi',
						//id	: 'tambah_lokasi'
					},'->',{
						iconCls: 'new_folder_tree',
						tooltip: 'New Folder'
					},{
						iconCls: 'delete_folder_tree',
						//id: 'delete-folder-btn',
						tooltip: 'Delete Folder'
					}
				]
			}];
        me.columns = [{
                xtype: 'treecolumn',
                dataIndex: 'nama',
                text: 'Hirarki',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
			},{
				text: 'Ketegori',
                width	: 100,
                dataIndex: 'cat'
			},{
				hidden  : true,
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
