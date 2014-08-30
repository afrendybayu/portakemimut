/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.CbUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'lokasi','unit','unit_kode'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/cbLokasi'
        },
        reader: {
            type: 'json',
            root: 'equnit',
            messageProperty: 'message'
        }
    }
});
