/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapHistori', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['nama','bulan', 'kode',
		{ name:'open',type:'int' },
		{ name:'teco',type:'int' },
		{ name:'persen',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/sap/rHistori.php'
        },
        reader: {
            type: 'json',
            root: 'saphistori',
            messageProperty: 'message'
        }
    }
});
