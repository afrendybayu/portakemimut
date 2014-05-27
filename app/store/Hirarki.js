/* AfrendyBayu 2Des2013 */
Ext.define('rcm.store.Hirarki', {
    extend: 'Ext.data.TreeStore',
    model: 'rcm.model.Hirarki',
    requires: 'rcm.model.Hirarki',
    //autoLoad: true, //--> load read.php
	
	/*
	root: {
        expanded: true,
        id: -1,
        //name: 'All Lists'
    }
    //*/

    proxy: {
		type: 'ajax',
		//url: 'php/hirarki/read.php',
		url: 'ci/index.php/rHirarki',
        reader: {
            type: 'json',
            root: 'hirarki',
            messageProperty: 'message'
        }
    }
});

