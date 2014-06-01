/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapCause', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['nama','param', 'kode',
		{ name:'jml',type:'int' },
		{ name:'persen',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/sapfmea/rCause.php'
        },
        reader: {
            type: 'json',
            root: 'sapcause',
            messageProperty: 'message'
        }
    }
});
