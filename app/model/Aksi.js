/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.Aksi', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'nama', 'id' ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rAksi'
        },
        reader: {
            type: 'json',
            root: 'aksi',
            messageProperty: 'message'
        }
    }
});
