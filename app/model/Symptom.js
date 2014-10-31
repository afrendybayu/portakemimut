/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.Symptom', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['id',{ name:'nama',type:'string' },{ name:'kode',type:'string' }],
    proxy: {
		type: 'ajax',
		api: {
			read	: 'ci/index.php/konfig/Conf/rSymptom', 
			// destroy : 'ci/index.php/konfig/Conf/dRefer',
			// create	: 'ci/index.php/konfig/Conf/cRefer',
			// update	: 'ci/index.php/konfig/Conf/uRefer'
        },
        reader: {
            type: 'json',
            root: 'symptom',
            messageProperty: 'message'
        }
    }
});
