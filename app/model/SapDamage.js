/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapDamage', {
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
			read: 'php/sapfmea/rDamage.php'
        },
        reader: {
            type: 'json',
            root: 'sapdamage',
            messageProperty: 'message'
        }
    }
});
