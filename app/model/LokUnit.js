/* Jono, 6Okt2014 */
Ext.define('rcm.model.LokUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields:	['id', 'nama', 'kode','cat'],

    proxy: {
		type: 'ajax',
		api: {
			create	: 'ci/index.php/konfig/rLokUnit/createHirarki',
            read	: 'ci/index.php/konfig/rLokUnit/rHirarki',
            update	: 'ci/index.php/konfig/rLokUnit/updateHirarki'
        },
        reader: {
            type: 'json',
            root: 'lokunit',
            messageProperty: 'message'
        }
    }
});
