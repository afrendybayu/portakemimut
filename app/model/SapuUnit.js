/*Jono, Soka-Medco 28Jan 2015 */
Ext.define('rcm.model.SapuUnit', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	
	fields: [ 'id_unit','lokasi','cat','unit','flag','awal','akhir'],
	
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/cron/rUnit',
			create : 'ci/cron/RhSweep/Sapu_Unit'
        },
        reader: {
            type: 'json',
            root: 'unitsapu',
            messageProperty: 'message'
        }
    }
});
