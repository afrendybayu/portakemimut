/* AfrendyBayu, 2Des2013 */
Ext.define('rcm.model.Hirarki', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    fields: [
		{ name: 'id', type: 'int' },
        { name: 'text' },
        { name: 'tipe' }
        //{ name: 'unit' },
        //{ name: 'lok' }
		//{ name: 'qtip', mapping: 'text' }
        //{ name: 'expanded' },
        //{ name: 'leaf'},
        // if we are using local storage, we need to persist the index field so the ordering of tree nodes will be preserved
    ]
    
	/*
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/hirarki/read.php'
        },
        reader: {
            type: 'json',
            root: 'hirarki',
            messageProperty: 'message'
        }
    }
    //*/
});

