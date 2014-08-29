/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.ConMonIn', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'tgl','lokasi','unit','wo','sap','url'],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/ReadCMon'
        },
        reader: {
            type: 'json',
            root: 'condmon',
            messageProperty: 'message'
        }
    }
});
