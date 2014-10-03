Ext.define('rcm.view.konfig.TreeHirarki', {
    extend: 'Ext.tree.Panel',
    xtype: 'treeHirarki',
	
    rootVisible: false,
    store: 'Hirarki',
    //*
    bbar: [{
			text: 'Buka',
			scope: this,
			handler: this.onExpandAllClick
		}, {
			text: 'Gulung',
			scope: this,
			handler: this.onCollapseAllClick
	}],
    //*/
    //*
    items: [{
		xtype: 'treecolumn',
		dataIndex: 'text'
	}],
    /*listeners: {
        itemclick: function(s,r) {
			this.fireEvent('hirUAvRe', r.data);
        }
    },
    //*/
    /*
	initComponent: function() {
		var me = this;
		//*
		
		
		
		
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
		
		
	//}
});
