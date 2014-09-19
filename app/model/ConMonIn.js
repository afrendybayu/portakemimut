/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.ConMonIn', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','tgl','lokasi','id_lokasi','unit','id_unit','wo','sap','url','pic','ket','thn'],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/sap/rConMon/ReadCMon',
			create 	: 'ci/index.php/sap/rConMon/createCMon',
			update	: 'ci/index.php/sap/rConMon/updateCMon'
        },
        reader: {
            type: 'json',
            root: 'condmon',
            messageProperty: 'message'
        }
    }
});
