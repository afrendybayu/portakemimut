/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.CMGenset', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['thn', { name:'jml',type:'int' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/compConMon?cat=7'
        },
        reader: {
            type: 'json',
            root: 'gascomp',
            messageProperty: 'message'
        }
    }
});
