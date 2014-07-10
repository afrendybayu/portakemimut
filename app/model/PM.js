/* Afrendy Bayu, 30Des2013 */
Ext.define('rcm.model.PM', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	fields: ['nama','id'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rPM'
        },
        reader: {
            type: 'json',
            root: 'pm',
            messageProperty: 'message'
        }
    }
});
