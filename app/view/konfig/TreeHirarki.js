Ext.define('rcm.view.konfig.TreeHirarki', {
    extend: 'Ext.tree.Panel',
    xtype: 'treeHirarki',
	
	requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.column.Action',
        'Ext.ux.TreePicker'
    ],
	
    rootVisible: true,
    store: 'LokUnit',
	//hideHeaders: true,

	initComponent: function() {
		var me = this,
			cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing');
        me.plugins = [cellEditingPlugin];
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
		me.dockedItems= [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: me.dock ? ['->',{
					//id: 'idTrEqCHir',
					id: me.idEqCH,
					xtype: 'button',
					text: 'Simpan',
					iconCls: 'savedisk',
					tooltip: 'Simpan Kategori'
				}]:[{
					text : 'Tambah Lokasi',
					//id	: 'tambah_lokasi'
				},'->',{
					iconCls: 'new_folder_tree',
					tooltip: 'New Folder'
				},{
					iconCls: 'delete_folder_tree',
					//id: 'delete-folder-btn',
					tooltip: 'Delete Folder'
			}]
		}];
        me.columns = [{
                xtype: 'treecolumn',
                dataIndex: 'nama',
                text: 'Hirarki',
                flex: 3,
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
			},{
				hidden  : me.hideCat,
				text: 'Kategori',
                minWidth : 100,
                flex:1,
                dataIndex: 'cat',
                editor: {
					xtype: 'treepicker',
					displayField: 'text',
					store: Ext.create('rcm.store.CatHir', {storeId: 'Lists-TaskGrid' }),
					renderer: me.renderList
				},
			},{
				//hidden  : me.hideDel,
                xtype	: 'actioncolumn',
                width	: 24,
				icon	: 'resources/css/images/edit1.png',
				iconCls	: 'x-hidden',
				tooltip	: 'Edit',
				//handler	: Ext.bind(me.hdlDelClk, me)
			},{
				hidden  : me.hideDel,
                xtype	: 'actioncolumn',
                width	: 24,
				icon	: 'resources/css/images/delete.png',
				iconCls	: 'x-hidden',
				tooltip	: 'Delete',
				handler	: Ext.bind(me.hdlDelClk, me)
            }];
		
        me.callParent(arguments);
		me.addEvents(
		
		);
		cellEditingPlugin.on('edit', me.handleCellEdit, this);
	},
	
	hdlDelClk: function(grid, row, col, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
		// alert ('klik hirarki delete');
        this.fireEvent('deleteclick', grid, row, col, column, e);
    },
    
    renderList: function(value, metaData, task, rowIndex, colIndex, store, view) {
		alert(value);
        var listsStore = Ext.getStore('CatHir'),
            node = value ? listsStore.getNodeById(value) : listsStore.getRootNode();
		
        return node.get('text');
    },
    
    handleCellEdit: function(editor, e) {
		alert("Ganti");
        //this.fireEvent('recordedit', e.record);
    },
});
