/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.SapOPart', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['nama','param', 'kode','desk',
		{ name:'jml',type:'int' },
		{ name:'persen',type:'float' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rFMEA/getOPart'
        },
        reader: {
            type: 'json',
            root: 'sapopart',
            messageProperty: 'message'
        }
    }
});
