/* AfrendyBayu, 3Nov2014 */
Ext.define('rcm.model.HirDef', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    fields: [
		{ name: 'id', type: 'int' }, 
		'nama', 'parent','children'
	],
	//*
	// cara untuk load semua 
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/konfig/rLokUnit/hirAll'
	},
    //*/
	/*
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/konfig/rLokUnit/hirAll'
        },
        reader: {
            type: 'json',
            root: 'hirarki',
            expanded: true,
            messageProperty: 'message'
        }
    }
    //*/
    /*
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/konfig/rCatEquip/rHirarki'
        },
        reader: {
            type: 'json',
            root: 'cateq',
            messageProperty: 'message'
        }
    }
    //*/
});

