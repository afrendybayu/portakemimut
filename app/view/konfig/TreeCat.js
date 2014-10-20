Ext.define('rcm.view.konfig.TreeCat', {
    extend: 'Ext.tree.Panel',
    xtype: 'tCatHir',
	
	requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.column.Action'
    ],
	
    rootVisible: true,
    store: 'CatHir',
	hideHeaders: true,
    //*
	dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
					text : 'Tambah Unit',
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
        }
    ],
	//*/
	listeners: {
        itemclick: function(s,r) {
			rcmSettings.idc = r.data.id;
			this.fireEvent('catclick', r.data.id,rcmSettings.tkf);
        }
    },

	initComponent: function() {
		var me = this;
        me.plugins = [me.cellEditingPlugin = Ext.create('Ext.grid.plugin.CellEditing')];

        me.columns = [{
                xtype: 'treecolumn',
                text: 'Hirarki',
                dataIndex: 'text',
                //width:200,
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
            },{
				text: 'Kode',
				dataIndex: 'tipe',
				width:50,
			},{
				text: 'ID',
                dataIndex: 'id',
                width:50,
            },{
                xtype	: 'actioncolumn',
                text: 'Hapus',
                width	: 24,
				//icon	: 'resources/css/images/delete.png',
                iconCls	: 'x-hidden',
                tooltip	: 'Delete',
                handler	: Ext.bind(me.handleDeleteClick, me)
            }];
		/*
		var me = this;
		
		/*
		
		me.items = [{
			xtype: 'treecolumn',
			dataIndex: 'text'
			// flex: 1,
		//	editor: {
		//		xtype: 'textfield',
		//		selectOnFocus: true,
		//		allowOnlyWhitespace: false
		//	},
		//	renderer: Ext.bind(me.renderName, me)
		}];
		/*
		me.listeners = [{
			itemclick: function(s,r) {
				alert("diclick item");
                //alert(r.data.text);
			}
		}];
		me.callParent();
		//*/
		
        me.callParent(arguments);
		
	},
	
	handleDeleteClick: function(gridView, rowIndex, colIndex, column, e) {
        // Fire a "deleteclick" event with all the same args as this handler
		// alert ('klik hirarki delete');
        this.fireEvent('deleteclick', gridView, rowIndex, colIndex, column, e);
    }
});
