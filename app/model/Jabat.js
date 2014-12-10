/* Afrendy Bayu, 4Okt2014 */
Ext.define('rcm.model.Jabat', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'nPre','jPre','nRev','jRev','nApr','jApr'],
    proxy: {
		type: 'ajax',
		api: {
			create: 'ci/index.php/sap/rJabat/cNJ',
			read: 'ci/index.php/sap/rJabat/rNJ'
        },
        reader: {
            type: 'json',
            root: 'jabat',
            messageProperty: 'message'
        }
    }
});
