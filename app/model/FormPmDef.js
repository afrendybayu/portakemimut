/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.FormPmDef', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','nama','kode','durasi', 'ket' ],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rPmDef',
			create 	: 'ci/index.php/konfig/Conf/cPmDef',
			destroy	: 'ci/index.php/konfig/Conf/dPmDef'
        },
        reader: {
            type: 'json',
            root: 'pmdef',
            messageProperty: 'message'
        }
    }
});
