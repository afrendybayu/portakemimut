/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.ContractInput', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'thn','bln','tipe','nilai' ],
    proxy: {
		type: 'ajax',
		api: {
			//update: 'ci/index.php/sap/uContract',
			create: 'ci/index.php/sap/cContract'
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
});
