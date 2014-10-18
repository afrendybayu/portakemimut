Ext.define('rcm.view.konfig.GridL', {
	extend: 'Ext.grid.Panel',
	xtype: 'tKGridL',	
	xstore:'',


	initComponent: function() {
		var me=this;
		
		me.dockedItems = me.dock ? [{
			dock: 'bottom',
			xtype: 'toolbar',
			items: [{
				text: me.jdlBtn,
				id: me.idBtn,
				iconCls: 'more'
			}]
		}]: [],
		
		me.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: me.dragGroup,
                dropGroup: me.dropGroup
            },
            listeners: {
                drop: function(node, data, dropRec, dropPosition) {
                    var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
					alert("Drag from right to left", 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
        };
		me.store = me.xstore;
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:25, 
				header : 'No'
			},{ 
				header		: 'Nama',
				dataIndex	: 'nama',
				width:120
			},{ 
				header		: 'Kode',
				dataIndex	: 'ket',
				flex:1
			}]
		};
		
		me.callParent(arguments);
	
	}
});
