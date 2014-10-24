/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.FormAksi', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','nama', 'ket' ],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rAksi',
			create 	: 'ci/index.php/konfig/Conf/cAksi',
			destroy	: 'ci/index.php/konfig/Conf/dAksi'
        },
        reader: {
            type: 'json',
            root: 'aksi',
            messageProperty: 'message'
        }
    }
});
