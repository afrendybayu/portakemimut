/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.OverHaulIn', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id','tglplan','durasiplan','lokasi','id_unit','unit','id_equip','equip','wo','oh','pekan','bln','thn','ket'],
	
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/sap/rOverHaul/readOH',
			create 	: 'ci/index.php/sap/rOverHaul/createOH'
			// update	: 'ci/index.php/sap/rConMon/updateCMon',
			// destroy : 'ci/index.php/sap/rConMon/removeCMon'
        },
        reader: {
            type: 'json',
            root: 'overhaulin',
            messageProperty: 'message'
        }
    }
});
