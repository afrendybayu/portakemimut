/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.SapThn', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'thn' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rHistori/getThnSap'
        },
        reader: {
            type: 'json',
            root: 'sapthn',
            messageProperty: 'message'
        }
    }
});
