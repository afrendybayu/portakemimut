Ext.define('rcm.view.konfig.TreeCat', {
    extend: 'Ext.tree.Panel',
    xtype: 'tCatHir',
	
	requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.grid.column.Action'
    ],
	
	rec: '',
    rootVisible: true,
    store: 'CatHir',
	//hideHeaders: true,

	
	//*/
	

	initComponent: function() {
		var me = this;
		//me.plugins = [me.ce = Ext.create('Ext.grid.plugin.CellEditing')];
		
		me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
					id: me.idRh,
					xtype: 'button',
					text: 'Refresh',
					iconCls: 'refresh',
                    tooltip: 'Refresh'
				},{
					xtype: 'button',
					text: 'Expand',
					iconCls: 'expand',
                    tooltip: 'Expand All'
				},'->',{
					id: me.idnC,
                    iconCls: 'new_cat_tree',
                    tooltip: 'Kategori Baru'
                },{
					id: me.iddC,
                    iconCls: 'del_cat_tree',
                    tooltip: 'Hapus Kategori'
                }
            ]
        }];
		me.listeners = {
			itemclick: function(s,r) {
				rcmSettings.idc = r.data.id;	// JANGAN DIHAPUS !!!!
				this.fireEvent('catclick', r.data.id,rcmSettings.tkf);
			},
			itemmouseenter: function(gridview, record) {
				rec = record;	//.get('id');
			}
		};

        me.columns = [{
                xtype: 'treecolumn',
                text: 'Hirarki Kategori',
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
				editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
			/*
			},{
				//text: 'ID',
                dataIndex: 'id',
                width:40
			//*/
			},{
                xtype	: 'actioncolumn',
                //text: 'Hapus',
                width	: 24,
				icon	: 'resources/css/images/edit1.png',
				iconCls	: 'x-hidden',
                tooltip	: 'edit Kategori',
                handler	: Ext.bind(me.hdlEditClick,me)
            },{
                xtype	: 'actioncolumn',
                //text: 'Hapus',
                width	: 24,
				icon	: 'resources/css/images/delete.png',
				iconCls	: 'x-hidden',
                tooltip	: 'Hapus Kategori',
                handler	: Ext.bind(me.hdlDeleteClick,me)
            }];

		
        me.callParent(arguments);
		
	},
	
	//hdlDeleteClick: function(grid, row) {
	hdlDeleteClick: function() {
        // Fire a "deleteclick" event with all the same args as this handler
		//alert ('klik hirarki delete: '+id);
		//var rec = grid.getStore().getAt(row);
        this.fireEvent('deleteclick', rec);
    },
    
    hdlEditClick: function(grid,row,col,column,e)	{
		//var rec = grid.getStore().getAt(row);
		this.fireEvent('editclick', grid,row,col,column,e);
		//console.log("Edit id: "+rec.get('id'));
		//alert ('klik hirCat edit: '+row);
	}
});
