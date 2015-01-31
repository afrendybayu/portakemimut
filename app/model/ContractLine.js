/* Afrendy Bayu, 1Des2013 */
Ext.define('rcm.model.ContractLine', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],
	/*
	fields: [ 'm','bln',
				{ name:'gc', type:'float' },
				{ name:'gs', type:'float' },
				{ name:'pm',type:'float' }],
	//*/
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rContract/sapGrContract'
        },
        reader: {
            type: 'json',
            root: 'contract',
            messageProperty: 'message'
        }
    }
});
