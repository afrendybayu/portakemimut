/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.Refer', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['id' ,{name : 'nama', type : 'string'},{name : 'kode', type : 'string'}],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rRefer', 
			destroy : 'ci/index.php/konfig/Conf/dRefer',
			create	: 'ci/index.php/konfig/Conf/cRefer',
			update	: 'ci/index.php/konfig/Conf/uRefer'
        },
        reader: {
            type: 'json',
            root: 'refer',
            messageProperty: 'message'
        }
    }
});



