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
            items: ['->',{
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
				rcmSettings.idc = r.data.id;
				this.fireEvent('catclick', r.data.id,rcmSettings.tkf);
			},
			itemmouseenter: function(gridview, record) {
				rec = record;	//.get('id');
			}
		},

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
				editor: {
                    xtype: 'textfield',
                    selectOnFocus: true,
                    allowOnlyWhitespace: false
				}
			},{
				//text: 'ID',
                dataIndex: 'id',
                width:40,
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
	
	hdlDeleteClick: function() {
        // Fire a "deleteclick" event with all the same args as this handler
		//alert ('klik hirarki delete: '+id);
        this.fireEvent('deleteclick', rec);
    }
});
