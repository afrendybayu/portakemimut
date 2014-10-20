/* AfrendyBayu 2Des2013 */
Ext.define('rcm.store.CatHir', {
    extend: 'Ext.data.TreeStore',
    model: 'rcm.model.Hirarki',
    requires: 'rcm.model.Hirarki',
    autoLoad: true, //--> load read.php
	
	//*
	root: {
        expanded: true,
        id: 0,
        text: 'Equipment Category'
    },
    //*/

    proxy: {
		type: 'ajax',
		//url: 'php/hirarki/read.php',
		url: 'ci/index.php/konfig/rCatEquip/rHirarki',
        reader: {
            type: 'json',
            root: 'cateq',
            messageProperty: 'message'
        }
    }
});

