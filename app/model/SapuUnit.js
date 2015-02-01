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
<<<<<<< HEAD
			read: 'ci/index.php/cron/rUnit',
=======
			read: 'ci/cron/rUnit',
>>>>>>> jono
			create : 'ci/index.php/cron/RhSweep/cSapu_Unit'
			//destroy : 'ci/cron/RhSweep/dSapu_Unit'
        },
        reader: {
            type: 'json',
            root: 'unitsapu',
            messageProperty: 'message'
        }
    }
});
