Ext.define('rcm.view.nav.Navigation', {
    extend: 'Ext.tree.Panel',
    xtype: 'taskNav',
	
    rootVisible: false,
    store: 'Hirarki',
    /*
    tbar: [{
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
		dataIndex: 'id'
	}],
    listeners: {
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
			dataIndex: 'id',
			flex: 1,
		//	editor: {
		//		xtype: 'textfield',
		//		selectOnFocus: true,
		//		allowOnlyWhitespace: false
		//	},
		//	renderer: Ext.bind(me.renderName, me)
		}];

		me.listeners = [{
			itemclick: function(s,r) {
				alert("diclick item");
                //alert(r.data.text);
			}
		}];
		me.callParent();
	},
	//*/
	//*
	onExpandAllClick: function(){
		console.log("expand Navigasi");
		
        var me = this,
            toolbar = me.down('toolbar');
            
        me.getEl().mask('Expanding tree...');
        toolbar.disable();
                    
        this.expandAll(function() {
            me.getEl().unmask();
            toolbar.enable();
        });
        //*
    },
    
    onCollapseAllClick: function(){
		console.log("collapse Navigasi");
		//*
        var toolbar = this.down('toolbar');
        
        toolbar.disable();
        this.collapseAll(function() {
            toolbar.enable();
        });
        //*
    }
    //*/
});
