/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.OPart', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'nama', 'id','cat' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rOPart'
        },
        reader: {
            type: 'json',
            root: 'opart',
            messageProperty: 'message'
        }
    }
});
