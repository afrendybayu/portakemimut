/* Afrendy Bayu, 28Jan2015 */
Ext.define('rcm.model.SrKontrak', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','ket',
				{ name: 'nilai', type: 'int' },
				{ name: 'awal', type: 'date' },
				{ name: 'akhir', type: 'date' },
				{ name: 'sisa', type: 'int' },
				{ name: 'pakai', type: 'int' },
				{ name: 'vend', type: 'string' },
				{ name: 'nokont', type: 'string' }],
				
				
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rContract/rsKontrak',
			//update: 'ci/index.php/sap/cContract/usKontrak',
			create: 'ci/index.php/sap/cContract/csKontrak',
			//destroy: 'ci/index.php/sap/cContract/dsKontrak'
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
});
