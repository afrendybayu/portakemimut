/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.ConmonInput', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'thn','bln','tipe','nilai' ],
    proxy: {
		type: 'ajax',
		api: {
			//update: 'ci/index.php/sap/uContract',
			create: 'ci/index.php/sap/rConMon/uCM'
        },
        reader: {
            type: 'json',
            root: 'conmon',
            messageProperty: 'message'
        }
    }
});
