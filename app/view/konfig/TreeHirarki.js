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
    ngedit: 0,
	

	initComponent: function() {
		var me = this,
			cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing');
        me.plugins = [cellEditingPlugin];
        me.hideHeaders = me.hideDel?false:true;
		/*
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
                }
            }
        };
        //*/
		me.dockedItems= [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: me.dock ? [{
					//id: me.idTHRef,
					iconCls: 'refTH',
                    tooltip: 'Refresh',
                    text: 'Refresh'
				},'->',{
					//id: 'idTrEqCHir',
					id: me.idEqCH,
					xtype: 'button',
					text: 'Simpan Kategori',
					iconCls: 'savedisk',
					tooltip: 'Simpan Kategori'
				}]:[{
					iconCls: 'refTH',
                    tooltip: 'Refresh',
                    text: 'Refresh'
				},'->',{
					iconCls: 'newHir',
					tooltip: 'Tambah Hirarki'
				},{
					iconCls: 'newUnit',
					//id: 'delete-folder-btn',
					tooltip: 'Tambah Unit'
				},{
					iconCls: 'newEquip',
					//id: 'delete-folder-btn',
					tooltip: 'Tambah Equipment'
			}]
		}];
        me.columns = [{
                xtype: 'treecolumn',
                dataIndex: 'nama',
                text: 'Hirarki Aset',
                flex: 3
                /*,
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
				//*/
			},{
				//xtype: 'treecolumn',
                dataIndex: 'tag',
                text: 'Tag',
                flex: 1
			},{
				hidden  : me.hideCat,
				text: 'Kategori Equipment',
                minWidth : 100,
                flex:1,
                dataIndex: 'idcat',
                editor: {
					xtype: 'treepicker',
					displayField: 'text',
					//rootVisible: false,
					store: Ext.create('rcm.store.CatHir', {storeId: 'CatHir-TreeHirarki' })
					//store: Ext.create('rcm.store.CatHir', { storeId: 'CatHir' })
					//store: Ext.create('rcm.store.CatHir')
					//store: 'CatHir'
					
				},
				renderer: me.renderList
			/*
			},{
				hidden  : me.hideDel,
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
			//*/
            }];
		
        me.callParent(arguments);
		me.addEvents(
		
		);
		//cellEditingPlugin.on('edit', me.handleCellEdit, this);
		cellEditingPlugin.on('beforeedit', me.hdlCellEna, this);
	},
	
	hdlDelClk: function(grid, row, col, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
		// alert ('klik hirarki delete');
        this.fireEvent('deleteclick', grid, row, col, column, e);
    },
    
    hdlCellEna: function(editor,a,eOpts)	{
		//alert(this.ngedit);
		if (this.ngedit)	return true;
		else return false;
	},
    //*
    renderList: function(value, metaData, task, rowIndex, colIndex, store, view) {
		if (value==0)	return "";
        var listsStore = Ext.getStore('CatHir'),
            node = value ? listsStore.getNodeById(value) : listsStore.getRootNode();
		
        return node.get('text');
    }
    
    
    //*/
});
