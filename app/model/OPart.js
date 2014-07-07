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
			read: 'php/opart/read.php?'
        },
        reader: {
            type: 'json',
            root: 'opart',
            messageProperty: 'message'
        }
    }
});
