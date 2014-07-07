/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.FMode', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'kode','nama', 'id','cat' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/fmode/read.php?'
        },
        reader: {
            type: 'json',
            root: 'mode',
            messageProperty: 'message'
        }
    }
});
