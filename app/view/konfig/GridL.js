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
		me.store = me.xstore;
		me.columns = {	
			items: [{ 
				xtype:'rownumberer',
				width:35, 
				header : 'No'
			},{ 
				header		: 'Kode',
				dataIndex	: 'kode',
				width:90
			},{ 
				header		: 'Lokasi',
				dataIndex	: 'lok',
				width: 120,
				hidden: me.hide ? true:false
			},{ 
				header		: 'Nama',
				dataIndex	: 'nama',
				flex:1,
				minWidth: 330
			}]
		};
		
		me.callParent(arguments);
	
	}
});
