/* Jono, 6Okt2014 */
Ext.define('rcm.model.LokUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields:	['id', 'nama', 'kode','cat','flag','rhinit','funcloc',
				'parent','tag','sil',
				{name:'urut',type:'int'}],

    proxy: {
		type: 'ajax',
		api: {
			create	: 'ci/index.php/konfig/rLokUnit/cHirarki',
            read	: 'ci/index.php/konfig/rLokUnit/rHirarki',
            update	: 'ci/index.php/konfig/rLokUnit/uHirarki'
        },
        reader: {
            type: 'json',
            root: 'lokunit',
            messageProperty: 'message'
        }
    }
});
