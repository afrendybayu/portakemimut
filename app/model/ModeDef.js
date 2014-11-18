
Ext.define('rcm.model.ModeDef', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','nama','kode', 'ket' ],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rModedef',
			create 	: 'ci/index.php/konfig/Conf/cModedef',
			update 	: 'ci/index.php/konfig/Conf/uModedef',
			destroy	: 'ci/index.php/konfig/Conf/dModedef'
        },
        reader: {
            type: 'json',
            root: 'modedef',
            messageProperty: 'message'
        }
    }
});
