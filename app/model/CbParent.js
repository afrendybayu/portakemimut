/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.CbParent', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id_lokasi','loc'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/cbLokasi'
        },
        reader: {
            type: 'json',
            root: 'location',
            messageProperty: 'message'
        }
    }
});
