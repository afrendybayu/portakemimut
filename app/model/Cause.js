/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.Cause', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'kode','nama', 'id','cat',"ket" ],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rCause'
        },
        reader: {
            type: 'json',
            root: 'cause',
            messageProperty: 'message'
        }
    }
});
