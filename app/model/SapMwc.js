/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.SapMwc', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'mwc' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rHistori/getMwcSap'
        },
        reader: {
            type: 'json',
            root: 'sapmwc',
            messageProperty: 'message'
        }
    }
});
