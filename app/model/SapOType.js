/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.SapOType', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'otype' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rHistori/getOTypeSap'
        },
        reader: {
            type: 'json',
            root: 'sapotype',
            messageProperty: 'message'
        }
    }
});
