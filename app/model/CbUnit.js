/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.CbUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id_unit','id_lokasi','unit'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/cbUnit'
        },
        reader: {
            type: 'json',
            root: 'equnit',
            messageProperty: 'message'
        }
    }
});
