/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.SapLoc', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','nama','kode' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rHistori/getLocSap'
        },
        reader: {
            type: 'json',
            root: 'saploc',
            messageProperty: 'message'
        }
    }
});
