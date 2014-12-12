/* Jono, 6Okt2014 */
Ext.define('rcm.model.LokUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields:	['id', 'nama', 'kode','cat','flag','rhinit','funcloc',
				'parent','tag','sil','ket',
				{name:'urut',type:'int'},
				{name:'idcat',type:'int'}],

    proxy: {
		type: 'ajax',
		api: {
			create	: 'ci/index.php/konfig/rLokUnit/cHirarki',
            read	: 'ci/index.php/konfig/rLokUnit/rHirarki',
            update	: 'ci/index.php/konfig/rLokUnit/uHirarki',
            destroy	: 'ci/index.php/konfig/rLokUnit/dHirarki'
        },
        reader: {
            type: 'json',
            root: 'lokunit',
            messageProperty: 'message'
        }
    }
});
