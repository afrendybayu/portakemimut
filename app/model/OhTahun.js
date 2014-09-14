/* Afrendy Bayu, 13Sep2014 */
Ext.define('rcm.model.OhTahun', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	//fields: [ 'unit','nama','lok','ket'],
	//*
	fields: [	'unit','nama','lok','ket',
				'b1m1','b1m2','b1m3','b1m4','b2m1','b2m2','b2m3','b2m4','b3m1','b3m2','b3m3','b3m4',
				'b4m1','b4m2','b4m3','b4m4','b5m1','b5m2','b5m3','b5m4','b6m1','b6m2','b6m3','b6m4',
				'b7m1','b7m2','b7m3','b7m4','b7m1','b8m2','b8m3','b8m4','b9m1','b9m2','b9m3','b9m4',
				'b10m1','b10m2','b10m3','b10m4','b11m1','b11m2','b11m3','b11m4','b12m1','b12m2','b12m3','b12m4'],
	//*/
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rOverHaul/ohTahun'
        },
        reader: {
            type: 'json',
            root: 'overhaul',
            messageProperty: 'message'
        }
    }
});
