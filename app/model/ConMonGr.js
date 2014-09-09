/* Afrendy Bayu, 18Jan2014 */
Ext.define('rcm.model.ConMonGr', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: ['thn', { name:'gc',type:'int' },
					{ name:'gs',type:'int' },
					{ name:'pmp',type:'int' }],
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rConMon/gConMon'
        },
        reader: {
            type: 'json',
            root: 'gcmon',
            messageProperty: 'message'
        }
    }
});
