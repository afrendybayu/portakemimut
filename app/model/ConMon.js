/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.ConMon', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'tahun',
		{ name:'jml',type:'int' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/JConMon'
        },
        reader: {
            type: 'json',
            root: 'conmon',
            messageProperty: 'message'
        }
    }
});
